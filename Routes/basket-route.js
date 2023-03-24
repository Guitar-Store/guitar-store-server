const express = require("express");

const router = express.Router();

// GET get user's basket
router.get("/", () => {});

// POST add product to basket
router.post("/", () => {});

// DELETE remove product from basket
router.delete("/:id", () => {});

// PUT update product quantity in basket
router.put("/:id", () => {});

module.exports = router;