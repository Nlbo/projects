const express = require('express');
const router = express.Router();
const controller = require('../controllers/web');
const passport = require('passport');

router.get('/categories', controller.categories);
router.get('/categoryLanguages', controller.categoryLanguages);
router.get('/subcategories', controller.subcategories);
router.get('/subCategoryLanguages', controller.subCategoryLanguages);
router.get('/languages', controller.languages);
router.get('/images', controller.images);
router.get('/removedList', controller.removedList);

router.post('/addCategory', controller.addCategory);
router.post('/addSubCategory', controller.addSubCategory);
router.post('/addLanguage', controller.addLanguage);
router.post('/addImage', controller.addImage);
router.post('/addCategoryLanguage', controller.addCategoryLanguage);
router.post('/addSubCategoryLanguage', controller.addSubCategoryLangauge);
//delete - start
router.post('/deleteLanguage', controller.deleteLanguage);
router.post('/deleteCategory', controller.deleteCategory);
router.post('/deleteSubCategory', controller.deleteSubCategory);
router.post('/deleteImage', controller.deleteImage);
//delete - end
router.put('/changeCategory', controller.changeCategory);
router.put('/changeCategoryLanguages', controller.changeCategoryLanguages);
router.put('/changeSubCategory', controller.changeSubCategory);
router.put('/changeSubCategoryLanguages', controller.changeSubCategoryLanguages);
router.put('/changeImage', controller.changeImage);
router.put('/recoverImage', controller.recoverImage);
router.put('/sortImages', controller.sortImages);
router.put('/sortCategories', controller.sortCategories);
router.put('/sortSubCategories', controller.sortSubCategories);

module.exports = router;