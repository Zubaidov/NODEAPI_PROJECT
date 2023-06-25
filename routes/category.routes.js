const express = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();
const categoryController = new CategoryController();

router.get('/getall', categoryController.getAll);
router.post('/add', categoryController.add);
router.post('/update', categoryController.update);
router.post('/delete', categoryController.delete);


module.exports = router;