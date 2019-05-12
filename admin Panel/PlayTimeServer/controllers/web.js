const SubCategoryLangauge = require('../models/subCategoriesLanguage');
const CategoryLanguage= require('../models/categoriesLanguage');
const Subcategory = require('../models/subcategory');
const Categories = require('../models/category');
const Language = require('../models/language');
const config = require('../configs/config');
const waterfall = require('async-waterfall');
const async = require('async');
const Images = require('../models/images');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
var files;
var ip = config.protocol + '://' + config.ip + ':' + config.port + '/';

// file saving options - start
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toLocaleDateString() + '-' + file.originalname);
        files = file;
        // console.log(file)
    }
});
var fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


var upload = multer({
    fileFilter: fileFilter,
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
}).single('image'); // request image keyName
// file saving options - end


module.exports = {
    categories: async (req,res) => {
        const categories = await Categories.find({});
        res.status(201).json(categories);
    },
    categoryLanguages: async (req,res) => {
        let candidate = await CategoryLanguage.find({});
        res.status(201).json(candidate)
    },
    subCategoryLanguages: async (req,res) => {
        let candidate = await SubCategoryLangauge.find({});
        res.status(201).json(candidate)
    },
    subcategories: async (req,res) => {
        const subcategories = await Subcategory.find({});
        res.status(201).json(subcategories);
    },
    languages: async (req,res) => {
        const languages = await Language.find({});
        res.status(201).json(languages);
    },
    images: async (req,res) => {
        const images = await Images.find({});
        res.status(201).json(images);
    },
    removedList: async (req,res) => {
      const images = await Images.find({removed: true});
        res.status(201).json(images);
    },
    addCategory: async (req,res) => {
        const candidate = await Categories.findOne({category: req.body.category});
        if (candidate) {
            if (candidate.removed) {
                try {
                    async.waterfall([
                        (next) => {
                            Categories.remove({_id: candidate._id});
                            next(null)
                        },
                        (next) => {
                            candidate.removed = false;
                        next(null)
                        },
                        (next) => {
                            new Categories(candidate).save();
                        }
                    ], err => {});
                    res.status(201).json({
                        message: 'Category has recovered ...'
                    })
                }catch (e) {
                    res.status(500).json({
                        message: 'Server error Category not recovered ...'
                    })
                }
            } else {
                res.status(409).json({
                    message: 'Category is already have ...'
                })
            }
        } else {
            let order = 0;
            let allCategories = await Categories.find({});

            await allCategories.forEach(items => {
               if (order <= +items.order) {
                   order = +items.order + 1
               }
            });
            const category = {
                category: req.body.category,
                order: order
            };
            try {
                await new Categories(category).save();
                res.status(201).json({
                    message: 'Category added ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server Error Category not added ...'
                })
            }
        }
    },
    addSubCategory: async (req,res) => {
        const candidate = await Subcategory.findOne({subCategory: req.body.subCategory});
        if (candidate) {
            if (candidate.removed) {
                try {
                    async.waterfall([
                        (next) => {
                            Subcategory.remove({_id: candidate._id});
                        next(null);
                        },
                        (next) => {
                            candidate.removed = false;
                        next(null);
                        },
                        (next) => {
                            new Subcategory(candidate).save();
                        },
                    ], err => {});
                    res.status(201).json({
                        message: 'SubCategory has recovered ...'
                    })
                }catch (e) {
                    res.status(500).json({
                        message: 'Server error SubCategory not recovered ...'
                    })
                }
            } else {
                res.status(409).json({
                    message: 'SubCategory is already have ...'
                })
            }
        } else {
            let order = 0;
            let allCategories = await Subcategory.find({});

            await allCategories.forEach(items => {
                if (order <= +items.order) {
                    order = +items.order + 1
                }
            });
            const subCategory = {
                category: req.body.category,
                subCategory: req.body.subCategory,
                order: order
            };
            try {
                await new Subcategory(subCategory).save();
                res.status(201).json({
                    message: 'SubCategory added ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server Error SubCategory not added ...'
                })
            }
        }
    },
    addLanguage: async (req,res) => {
        const candidate = await Language.findOne({language: req.body.language});
        if (candidate) {
            res.status(409).json({
                message: 'Language is already have ...'
            })
        } else {
            const language = new Language({
                language: req.body.language,
                code: req.body.code
            });
            try {
                await language.save();
                res.status(201).json({
                    message: 'Language added ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server Error Language not added ...'
                })
            }
        }
    },
    addImage: async (req,res) => {
        await upload(req,res,async err => {
            const candidate = await Images.find({category: req.body.category, subCategory: req.body.subCategory});
            let order = 0;
            if (candidate) {
                await candidate.forEach(items => {
                    if (order <= +items.order) {
                        order = +items.order + 1
                    }
                })
            }
            if (err) {
                res.status(400).json({
                    message: 'Bad request'
                })
            } else {
                const image = await new Images({
                    postDate: new Date().toLocaleDateString(),
                    showDate: req.body.showDate,
                    path:ip + new Date().toLocaleDateString() + '-' + files.originalname,
                    thumbnailPath:ip + new Date().toLocaleDateString() + '-Small-' + files.originalname,
                    filename: new Date().toLocaleDateString() + '-' + files.originalname,
                    category:req.body.category,
                    subCategory:req.body.subCategory,
                    order: order
                });
                sharp('uploads/' + image.postDate + '-' + files.originalname)
                    .resize(200)
                    .toFile('uploads/' + image.postDate + '-Small-' + files.originalname);
                try {
                    await image.save();
                    res.status(200).json({
                        message: 'Image has added ...'
                    })
                }catch (e) {
                    res.status(500).json({
                        message: 'Server error Image not added ...'
                    })
                }
            }
        })
    },
    addCategoryLanguage: async (req,res) => {
        let data = req.body;
        let result = [];
        const allCategsLangs = await CategoryLanguage.find({});
        let checker = 0;
        async.waterfall(
            [
                (next) => {
                    data.forEach(items => {
                        let orderCandidate = Categories.findOne({category: items.category});
                        allCategsLangs.forEach(item => {
                            if (orderCandidate) {
                                items.order = orderCandidate.order;
                            }
                            if (item.language.name === items.language.name && item.category === items.category) {
                                ++checker;
                            }
                        });
                        if (checker === 0) {
                            result.push(items);
                        }else {
                            checker = 0;
                        }
                    });
                    next(null);
                },
                (next) => {
                if (result.length > 0) {
                    try {
                        result.forEach(items => {
                            new CategoryLanguage(items).save()
                        });
                        res.status(201).json({
                            message: 'CategoryLanguages has already added ...'
                        })
                    }catch (e) {
                        res.status(500).json({
                            message: 'Server error CategoryLanguage not added ...'
                        })
                    }
                } else {
                    res.status(409).json({
                        message: 'Languages has already have ...'
                    })
                }

                }
            ], err => {})
    },
    addSubCategoryLangauge: async (req,res) => {
        let data = req.body;
        let result = [];
        const allCategsLangs = await SubCategoryLangauge.find({});
        let checker = 0;
        async.waterfall(
            [
                (next) => {
                    data.forEach(items => {
                        let orderCandidate = SubCategoryLangauge.findOne({subCategory: items.subCategory});
                        allCategsLangs.forEach(item => {
                            if (orderCandidate) {
                                items.order = orderCandidate.order;
                            }
                            if (item.language.name === items.language.name && item.subCategory === items.subCategory && items.category === items.category) {
                                ++checker;
                            }
                        });
                        if (checker === 0) {
                            result.push(items);
                        }else {
                            checker = 0;
                        }
                    });
                    next(null);
                },
                (next) => {
                    if (result.length > 0) {
                        try {
                            result.forEach(items => {
                                new SubCategoryLangauge(items).save()
                            });
                            res.status(201).json({
                                message: 'SubCategoryLanguages has already added ...'
                            })
                        }catch (e) {
                            res.status(500).json({
                                message: 'Server error SubCategoryLanguage not added ...'
                            })
                        }
                    } else {
                        res.status(409).json({
                            message: 'Languages has already have ...'
                        })
                    }

                }
            ], err => {})
    },
    deleteImage: async (req,res) => {
        console.log(req.body);
        if (req.body.removed) {
            try {
                await Images.remove({_id: req.body._id});
                res.status(201).json({
                    message: 'Image has removed'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error image not removed ...'
                })
            }
        } else {
            try {
                await Images.remove({_id: req.body._id});
                req.body.removed = true;
                await new Images(req.body).save();
                res.status(201).json({
                    message: 'Image send to removed lists successfully ...'
                })
            } catch (e) {
                res.status(500).json({
                    message: 'Serve error Image not send to removed list ...'
                })
            }
        }
    },
    deleteCategory: async (req,res) => {
        const categs = await Categories.findOne({category: req.body.category});
        const subs = await Subcategory.find({category: req.body.category, removed: false});
        const imgs = await Images.find({category: req.body.category, removed: false});
            try {
                async.waterfall([
                    (next) => {
                            Categories.remove({_id: categs._id});
                            categs.removed = true;
                            new Categories(categs).save();
                        next(null);
                    },
                    (next) => {
                    subs.forEach(items => {
                        Subcategory.remove({_id: items._id});
                        items.removed = true;
                        new Subcategory(items).save()
                    });
                        next(null);
                    },
                    (next) => {
                    imgs.forEach(items => {
                        Images.remove({_id: items._id});
                        items.removed = true;
                        new Images(items).save()
                    });
                    }
                ], err => {});
                res.status(201).json({
                    message: 'Category has removed successfully ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error Category not removed ...'
                })
            }
    },
    deleteSubCategory: async (req,res) => {
        const subs = await Subcategory.findOne({subCategory: req.body.subCategory, category: req.body.category});
        const imgs = await Images.find({category: req.body.category, subCategory: req.body.subCategory, removed: false});

            try {
                async.waterfall([
                    (next) => {
                            Subcategory.remove({_id: subs._id});
                            subs.removed = true;
                            new Subcategory(subs).save();
                            next(null);
                    },
                    (next) => {
                        imgs.forEach(items => {
                            Images.remove({_id: items._id});
                            items.removed = true;
                            new Images(items).save()
                        })
                    }
                ], err => {});
                res.status(201).json({
                    message: 'SubCategory has removed successfully ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error SubCategory not removed ...'
                })
            }
    },
    deleteLanguage: async (req,res) => {
        const candidate = await Language.findOne({language: req.body.language});
        const categ = await CategoryLanguage.find({});
        const categs = categ.filter(item => item.language.name === req.body.code);
        const sub = await SubCategoryLangauge.find({});
        const subs = sub.filter(item => item.language.name === req.body.code);
        if (candidate) {
            try {
                await Language.remove({_id: candidate._id});
                await categs.forEach(async items => {
                    await CategoryLanguage.remove({_id : items._id});
                });
                await subs.forEach(async items => {
                    await SubCategoryLangauge.remove({_id : items._id});
                });
                res.status(201).json({
                    message: 'Language has removed ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error Language has not removed ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'Language not found ...'
            })
        }
    },
    changeCategory: async (req,res) => {
        const candidate = await CategoryLanguage.find({category: req.body.category});
        const categs = await Categories.find({category: req.body.category});
        const subs = await Subcategory.find({category: req.body.category});
        const newCategory = req.body.newCategory;
        const subsLangs = await SubCategoryLangauge.find({category: req.body.category});
        const images = await Images.find({category: req.body.category});
        if (candidate) {
            try {
                async.waterfall([
                    (next) => {
                    categs.forEach(items => {
                        Categories.remove({_id: items._id});
                        items.category = newCategory;
                        new Categories(items).save()
                    });
                        console.log('1');
                        next(null)
                    },
                    (next) => {
                    subs.forEach(items => {
                        Subcategory.remove({_id:items._id});
                        items.category = newCategory;
                        new Subcategory(items).save()
                    });
                        console.log('3');
                        next(null)
                    },
                    (next) => {
                    subsLangs.forEach(items => {
                        SubCategoryLangauge.remove({_id: items._id});
                        items.category = newCategory;
                        new SubCategoryLangauge(items).save()
                    });
                        console.log('4');
                        next(null)
                    },
                    (next) => {
                    images.forEach(items => {
                        Images.remove({_id: items._id});
                        items.category = newCategory;
                        new Images(items).save()
                    });
                        console.log('5')
                    }
                ], err => {
                    console.log(err)
                });

                res.status(201).json({
                    message: 'Category has been updated'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error Category not updated ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'Category not find ...'
            })
        }
    },
    changeSubCategory: async (req,res) => {
        const candidate = await SubCategoryLangauge.find({category: req.body.category, subCategory: req.body.subCategory});
        const subs = await Subcategory.find({category: req.body.category, subCategory: req.body.subCategory});
        const newSubCategory = req.body.newSubCategory;
        const subsLangs = await SubCategoryLangauge.find({category: req.body.category, subCategory: req.body.subCategory});
        const images = await Images.find({category: req.body.category, subCategory: req.body.subCategory});
        if (candidate) {
            try {
                async.waterfall([
                    (next) => {
                        subs.forEach(items => {
                            Subcategory.remove({_id:items._id});
                            items.subCategory = newSubCategory;
                            new Subcategory(items).save()
                        });
                        console.log('3');
                        next(null)
                    },
                    (next) => {
                        subsLangs.forEach(items => {
                            SubCategoryLangauge.remove({_id: items._id});
                            items.subCategory = newSubCategory;
                            new SubCategoryLangauge(items).save()
                        });
                        console.log('4');
                        next(null)
                    },
                    (next) => {
                        images.forEach(items => {
                            Images.remove({_id: items._id});
                            items.subCategory = newSubCategory;
                            new Images(items).save()
                        });
                        console.log('5')
                    }
                ], err => {
                    console.log(err)
                });

                res.status(201).json({
                    message: 'SubCategory has been updated'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error SubCategory not updated ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'SubCategory not find ...'
            })
        }
    },
    changeCategoryLanguages: async (req,res) => {
        try {
            let data = req.body;
            await data.forEach( async items => {
                await CategoryLanguage.remove({_id: items._id});
                await new CategoryLanguage(items).save()
            });
            res.status(201).json({
               message: 'Category Languages has changed ...'
            })
        }catch (e) {
            res.status(500).json({
                message: 'Server error Category Languages not changed ...'
            })
        }

    },
    changeSubCategoryLanguages: async (req,res) => {
        try {
            let data = req.body;
            async.waterfall([
                (next) => {
                data.forEach(items => {
                    SubCategoryLangauge.remove({_id: items._id});
                });
                    next(null)
                },
                (next) => {
                data.forEach(items => {
                    new SubCategoryLangauge(items).save()
                });
                }
            ], err => {});
            await data.forEach( async items => {
                await SubCategoryLangauge.remove({_id: items._id});
                await new SubCategoryLangauge(items).save()
            });
            res.status(201).json({
               message: 'SubCategory Languages has changed ...',
                data: data
            })
        }catch (e) {
            res.status(500).json({
                message: 'Server error SubCategory Languages not changed ...'
            })
        }

    },
    changeImage: async (req,res) => {
        const candidate = await Images.findOne({_id: req.body._id});
        const newImage = req.body;
        if (candidate) {
            try {
                await Images.remove({_id: candidate._id});
                await new Images(newImage).save();
                res.status(201).json({
                    message: 'Image has been updated'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error Image not updated ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'Image not find ...'
            })
        }
    },
    recoverImage: async (req,res) => {
        const candidate = await Images.findOne({_id: req.body._id});
        const newImage = req.body;
        req.body.removed = false;
        const caress = await Categories.find({category: req.body.category});
        const subs = await Subcategory.find({
            category: req.body.category,
            subCategory: req.body.subCategory
        });
        if (candidate) {
            try {
                await Images.remove({_id: candidate._id});
                await new Images(newImage).save();
                async.waterfall([
                   (next) => {
                    caress.forEach(items => {
                       Categories.remove({_id: items._id});
                        items.removed = false;
                        new Categories(items).save()
                    });
                    next(null)
                   },
                    (next) => {
                         subs.forEach( items => {
                             Subcategory.remove({_id: items._id});
                            items.removed = false;
                             new Subcategory(items).save()
                        });
                    },
                ], err => {});
                res.status(201).json({
                    message: 'Image has been recovered'
                })
            } catch (e) {
                res.status(500).json({
                    message: 'Server error Image not recovered ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'Image not find ...'
            })
        }
    },
    sortImages: async (req,res) => {
        const sortedImages = req.body;
        if (sortedImages) {
            try {
                await sortedImages.forEach(async items => {
                   await Images.remove({_id: items._id});
                    await new Images(items).save()
                });
                res.status(201).json({
                    message: 'Images has sorted ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Serever error Images not sorted ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'Sorted images not found ...'
            })
        }
    },
    sortCategories: async (req,res) => {
        const sortedCategories = req.body;
        if (sortedCategories) {
            try {
                await sortedCategories.forEach(async items => {
                    await Categories.remove({_id: items._id});
                    await new Categories(items).save();
                });
                res.status(201).json({
                    message: 'Categories has sorted ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error Categories not sorted ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'Sorted Categories not found ...'
            })
        }
    },
    sortSubCategories: async (req,res) => {
        const sortedSubCategories = req.body;
        if (sortedSubCategories) {
            try {
                await sortedSubCategories.forEach(async items => {
                    await Subcategory.remove({_id: items._id});
                    await new Subcategory(items).save()
                });
                res.status(201).json({
                    message: 'SubCategories has sorted ...'
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Server error SubCategories not sorted ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'Sorted SubCategories not found ...'
            })
        }
    }
};