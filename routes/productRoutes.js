const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getDeals,
  addProduct,
  searchProducts,
  deleteProduct,
} = require('../controllers/productController');



// GET all products
router.get('/', getAllProducts);

// DELETE product
router.delete('/:id', deleteProduct);

// ADD product to basket
router.post('/', addProduct);

// GET product deals
router.get('/deals', getDeals);

// Search products
router.get('/search', searchProducts);

module.exports = router;
