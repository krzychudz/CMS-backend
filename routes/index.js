const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const tokenMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({status: 'status'});
});


router.get('/api/products', ProductsController.getProducts); // Get all products
router.get('/api/users/products', tokenMiddleware.verifyToken ,ProductsController.getUserProducts); // Get all user products
router.get('/api/users/products/:product_id', tokenMiddleware.verifyToken ,ProductsController.getUserProduct) // Get particular product
router.get('/api/find_product?query', tokenMiddleware.verifyToken ,ProductsController.findProduct) // Get products that match a given query

router.post('/api/users/products', tokenMiddleware.verifyToken ,ProductsController.createProduct); // Create a new product for a user

router.patch('/api/users/products/:product_id', tokenMiddleware.verifyToken ,ProductsController.updateProduct); // Update an existing product for paticular user

router.delete('/api/users/products/:product_id', tokenMiddleware.verifyToken ,ProductsController.deleteProduct); // Remove particular product

module.exports = router;