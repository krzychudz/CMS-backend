const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({status: 'status'});
});


router.get('/api/products', ProductsController.getProducts); // Get all products
router.get('/api/users/:user_id/products', ProductsController.getUserProducts); // Get all user products
router.get('/api/users/:user_id/products/:product_id', ProductsController.getUserProduct) // Get particular product
router.get('/api/find_product?query', ProductsController.findProduct) // Get products that match a given query

router.post('/api/users/:user_id/products', ProductsController.createProduct); // Create a new product for a user

router.patch('/api/users/:user_id/products/:product_id', ProductsController.updateProduct); // Update an existing product for paticular user

router.delete('/api/users/:user_id/products/:product_id', ProductsController.deleteProduct); // Remove particular product

module.exports = router;