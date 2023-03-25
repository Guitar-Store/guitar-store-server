const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    modelNumber: String,
    productCode: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    quantity: Number,
    rating: Number,
    reviewsNum: String,
    inStock: Boolean,
    offer: Number,
    idealFor: String,
    color: String,
    brand: String,
    material: String,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
