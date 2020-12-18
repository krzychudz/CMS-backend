const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({status: 'status'});
});


router.get('/api/products', ProductsController.getProducts); // Get all products
router.get('/api/:user_id/products', ProductsController.getUserProducts); // Get all user products
router.get('/api/:user_id/products/"product_id', ProductsController.getUserProduct) // Get particular product

router.post('/api/:user_id/products', ProductsController.createProduct); // Create a new product for a user

router.patch('/api/:user_id/products/:product_id', ProductsController.updateProduct); // Update an existing product for paticular user

router.delete('/api/:user_id/products/:product_id', ProductsController.deleteProduct); // Remove particular product

module.exports = router;