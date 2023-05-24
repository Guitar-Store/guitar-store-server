const { default: mongoose } = require('mongoose');
const Product = require('../models/Product');

// GET all products (without deals)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ offer: { $eq: null } }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET product deals
const getDeals = async (req, res) => {
  try {
    const deals = await Product.find({ offer: { $gt: 0 } });
    res.status(200).json(deals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD product to database
const addProduct = async (req, res) => {
  const {
    modelName,
    modelNumber,
    productCode,
    price,
    description,
    image,
    category,
    quantity,
    rating,
    reviewsNum,
    inStock,
    offer,
    idealFor,
    color,
    brand,
    material,
    type,
  } = req.body;
  try {
    const product = await Product.create({
      modelName,
      modelNumber,
      productCode,
      price,
      description,
      image,
      category,
      quantity,
      rating,
      reviewsNum,
      inStock,
      offer,
      idealFor,
      color,
      brand,
      material,
      type,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE product from database
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No product with id: ${id}`);
  }

  try {
    const product = await Product.findByIdAndDelete({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search products
const searchProducts = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { modelName: { $regex: searchQuery, $options: 'i' } },
        { brand: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },
        { type: { $regex: searchQuery, $options: 'i' } },
        { idealFor: { $regex: searchQuery, $options: 'i' } },
        { color: { $regex: searchQuery, $options: 'i' } },
        { material: { $regex: searchQuery, $options: 'i' } },
      ],
    });

    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getDeals,
  addProduct,
  searchProducts,
  deleteProduct,
};
