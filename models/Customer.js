const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    purchases: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        data: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    basket: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
