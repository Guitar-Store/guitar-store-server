const express = require('express');
const router = express.Router();
const {
  getBasket,
  updateBasket,
  deleteFromBasket,
} = require('../controllers/customerController');

// GET customer's basket
router.get('/', getBasket);

// Update customer's basket
router.post('/', updateBasket);

// DELETE product from basket
router.delete('/', deleteFromBasket);

module.exports = router;
