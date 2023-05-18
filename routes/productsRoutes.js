const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// GET product deals
router.get("/deals", () => {});

// ADD product to basket
router.post("/", async (req, res) => {
  const { modelName, modelNumber, productCode, price, description, image, category, quantity, rating, reviewsNum, inStock, offer, idealFor, color, brand, material, type } = req.body;
  try {
    const product = await Product.create({modelName, modelNumber, productCode, price, description, image, category, quantity, rating, reviewsNum, inStock, offer, idealFor, color, brand, material, type})
  res.status(200).json(product);
} catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
