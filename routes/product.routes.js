const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();
const productController = new ProductController();

router.get('/getall', productController.getAll);
router.post('/add', productController.add);
router.put('/update/:id', productController.update);
router.post('/delete/:id', productController.delete);

module.exports = router;