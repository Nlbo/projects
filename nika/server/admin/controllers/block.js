const Block = require('../models/block');
const errors = require('../_help/error_handler');
const fs = require('fs');
const sharp = require('sharp');

module.exports = {
    getBlock: async (req,res) => {
        try {
            let block = await Block.find({});
            res.status(201).json(block)
        } catch (e) {
            errors.notFound(res, errors);
        }
    },
    addBlock: async (req,res) => {
        console.log(req.body);
        if (req.body.type) {
            switch (req.body.type) {
                case 'blog': {
                    let block = {
                        size: req.body.size,
                        type: req.body.type,
                        blog: {
                            post: JSON.parse(req.body.post)
                        }
                    };
                    try {
                        await new Block(block).save();
                        res.status(201).json({
                            msg: "Block has created successfully"
                        })
                    } catch (e) {
                        errors.invalidData(res, errors);
                    }
                }break;
                case 'project': {
                    let portfolio = {
                        size: req.body.size,
                        type: req.body.type,
                        project: {
                            post: JSON.parse(req.body.portfolio)
                        }
                    };
                    try {
                        await new Block(portfolio).save();
                        res.status(201).json({
                            msg: "Project has created successfully"
                        })
                    } catch (e) {
                        errors.invalidData(res, errors);
                    }
                }break;
                case 'video': {
                            let block = {
                                size: req.body.size,
                                type: req.body.type,
                                video: {
                                    url: req.files ? req.files[0].filename : req.body.url
                                }
                            };
                            try {
                                await new Block(block).save();
                                res.status(201).json({
                                    msg: "Block has created successfully"
                                })
                            } catch (e) {
                                if(req.files) {
                                    fs.unlinkSync(`./admin/_uploads/block/${req.files[0].filename}`);
                                }
                                errors.invalidData(res, errors);
                    }
                }break;
                case 'image': {
                        let block = {
                            size: req.body.size,
                            type: req.body.type,
                            image: {
                                url: req.body.url,
                                img: req.files[0].filename,
                                size: req.body.imagesize,
                                load: req.body.load,
                                hovertext: req.body.hovertext,
                                bgcolor: req.body.bgcolor
                            }
                        };
                        try {
                            await new Block(block).save();
                            res.status(201).json({
                                msg: "Block has created successfully"
                            })
                        } catch (e) {
                            fs.unlinkSync(`./admin/_uploads/block/${req.files[0].filename}`);
                            errors.invalidData(res, errors);
                        }
                }break;
                case 'gif': {
                    console.log(req.body)
                    let block = {
                        size: req.body.size,
                        type: req.body.type,
                        gif: {
                            url: req.body.url,
                            gif: req.files
                            .filter(item => item.filename.split('.')[item.filename.split('.').length - 1] === 'gif')[0].filename,
                            music: req.files
                            .filter(item => item.filename.split('.')[item.filename.split('.').length - 1] !== 'gif')[0].filename,
                            size: req.body.imagesize,
                            hovertext: req.body.hovertext,
                            load: req.body.load,
                            bgcolor: req.body.bgcolor
                        }
                    };
                    try {
                        await new Block(block).save();
                        res.status(201).json({
                            msg: "Block has created successfully"
                        })
                    } catch (e) {
                        fs.unlinkSync(`./admin/_uploads/block/${req.files[0].filename}`);
                        errors.invalidData(res, errors);
                    }
                }break;
                case 'imagetext': {
                        let block = {
                            size: req.body.size,
                            type: req.body.type,
                            imagetext: {
                                url: req.body.url,
                                img: req.files[0].filename,
                                subtitle: req.body.subtitle,
                                description: req.body.description,
                                title: req.body.title
                            }
                        };
                        try {
                            await new Block(block).save();
                            res.status(201).json({
                                msg: "Block has created successfully"
                            })
                        } catch (e) {
                            fs.unlinkSync(`./admin/_uploads/block/${req.files[0].filename}`);
                            errors.invalidData(res, errors);
                        }
                }break;
            }
        } else {
            errors.invalidData(res,errors);
        }
    },
    changeBlock: async (req,res) => {
        let blockId = req.query.id + '';
        let candidate = await Block.findOne({_id: blockId});
        if (candidate) {
            switch (candidate.type) {
                case 'blog': {
                    let block = {
                        size: req.body.size,
                        type: req.body.type,
                        blog: {
                            post: JSON.parse(req.body.post)
                        }
                    };
                    console.log(block);
                    console.log(candidate);
                    try{
                        await Block.findByIdAndUpdate(
                            {_id: blockId},
                            {$set: block},
                            {new: true});
                        res.status(201).json(block)
                    } catch (e) {
                        errors.conflictError(res, errors)
                    }
                }break;
                case 'project': {
                    let block = {
                        size: req.body.size,
                        type: req.body.type,
                        project: {
                            post: JSON.parse(req.body.portfolio)
                        }
                    };
                    try{
                        await Block.findByIdAndUpdate(
                            {_id: blockId},
                            {$set: block},
                            {new: true});
                        res.status(201).json(block)
                    } catch (e) {
                        errors.conflictError(res, errors)
                    }
                }break;
                case 'video': {
                            let block = {
                                size: req.body.size,
                                type: req.body.type,
                                video: {
                                    url: req.files.length > 0 ? req.files[0].filename : req.body.url
                                }
                            };
                            try{
                                await Block.findByIdAndUpdate(
                                    {_id: candidate._id},
                                    {$set: block},
                                    {new: true});
                                if(req.files[0]) {
                                    fs.unlinkSync(`./admin/_uploads/block/${candidate.video.url}`);
                                }
                                res.status(201).json(block)
                            } catch (e) {
                                errors.conflictError(res, errors)
                            }
                }break;
                case 'image': {
                            let block = {
                                size: req.body.size,
                                type: req.body.type,
                                image: {
                                    img: req.files.length > 0 ? req.files[0].filename : req.body.img,
                                    size: req.body.imagesize,
                                    bgcolor: req.body.bgcolor,
                                    load: req.body.load,
                                    hovertext: req.body.hovertext,
                                    url: req.body.url
                                }
                            };
                            try{
                                await Block.findByIdAndUpdate(
                                    {_id: candidate._id},
                                    {$set: block},
                                    {new: true});
                                if(req.files.length > 0) {
                                    fs.unlinkSync(`./admin/_uploads/block/${candidate.image.img}`);
                                }
                                res.status(201).json(block)
                            } catch (e) {
                                errors.conflictError(res, errors)
                    }
                }break;
                case 'gif': {
                    console.log('#########################');
                    console.log(req.body);
                    console.log('#########################');

                    let block = {
                        size: req.body.size,
                        type: req.body.type,
                        gif: {
                            url: req.body.url,
                            size: req.body.imagesize,
                            hovertext: req.body.hovertext,
                            load: req.body.load,
                            bgcolor: req.body.bgcolor
                        }
                    };

                    if(req.files && req.files.filter(item => item.filename.split('.')[item.filename.split('.').length - 1] === 'gif').length > 0) {
                        fs.unlinkSync(`./admin/_uploads/block/${candidate.gif.gif}`);
                        block.gif = req.files.filter(item => item.filename.split('.')[item.filename.split('.').length - 1] === 'gif')[0].filename
                    } else {
                        block.gif.gif = req.body.gif
                    }
                    if(req.files && req.files.filter(item => item.filename.split('.')[item.filename.split('.').length - 1] !== 'gif').length > 0) {
                        fs.unlinkSync(`./admin/_uploads/block/${candidate.gif.music}`);
                        block.music = req.files.filter(item => item.filename.split('.')[item.filename.split('.').length - 1] !== 'gif')[0].filename
                    } else {
                        block.gif.music = req.body.music
                    }
                    try{
                        await Block.findByIdAndUpdate(
                            {_id: candidate._id},
                            {$set: block},
                            {new: true});
                        res.status(201).json(block)
                    } catch (e) {
                        errors.conflictError(res, errors)
                    }
                }break;
                case 'imagetext': {

                            let block = {
                                size: req.body.size,
                                type: req.body.type,
                                imagetext: {
                                    url: req.body.url,
                                    img: req.files.length > 0 ? req.files[0].filename : req.body.img,
                                    subtitle: req.body.subtitle,
                                    description: req.body.description,
                                    title: req.body.title
                                }
                            };
                            try{
                                await Block.findByIdAndUpdate(
                                    {_id: candidate._id},
                                    {$set: block},
                                    {new: true});
                                if(req.files.length > 0) {
                                    fs.unlinkSync(`./admin/_uploads/block/${candidate.imagetext.img}`);
                                }
                                res.status(201).json(block)
                            } catch (e) {
                                errors.conflictError(res, errors)
                    }
                }break;
            }
        }  else {
            errors.notFound(res, errors)
        }
    },
    deleteBlock: async (req,res) => {
        let block = req.query.id + '';
        let candidate = await Block.findOne({_id: block});
        if (candidate) {
            console.log(candidate);
            try {
                await Block.remove({_id: block});
                switch (candidate.type) {
                    case 'video': {
                        console.log(candidate);
                        if (candidate.video.url.indexOf('http') < 0) {
                            fs.unlinkSync(`./admin/_uploads/block/${candidate.video.url}`);
                        }
                    }break;
                    case 'image': {
                        fs.unlinkSync(`./admin/_uploads/block/${candidate.image.img}`);
                    }break;
                    case 'gif': {
                        console.log(candidate);
                        fs.unlinkSync(`./admin/_uploads/block/${candidate.gif.gif}`);
                        fs.unlinkSync(`./admin/_uploads/block/${candidate.gif.music}`);
                    }break;
                    case 'imagetext': {
                        fs.unlinkSync(`./admin/_uploads/block/${candidate.imagetext.img}`);
                    }break;
                }
                res.status(201).json({
                    msg: 'Block has removed successfully'
                })
            } catch (e) {
                errors.invalidData(res, errors);
            }
        } else {
            errors.notFound(res, errors)
        }
    }
};
