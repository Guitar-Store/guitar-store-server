const express = require("express");
const Product = require("../Models/product-model");

const router = express.Router();

// GET all products
router.get("/", () => {});

// GET product deals
router.get("/deals", () => {});




module.exports = router;