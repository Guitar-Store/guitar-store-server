const { default: mongoose } = require('mongoose');
const Customer = require('../models/Customer');

// GET customer's basket
const getBasket = async (req, res) => {
  const { customerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res
      .status(404)
      .json({ message: `No customer with id: ${customerId}` });
  }
  try {
    const customer = await Customer.findOne({ customerId: customerId });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer.basket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update customer's basket
const updateBasket = async (req, res) => {
  const { customerId, productId, quantity } = req.body;
  const customerExist = await Customer.findOne({ customerId: customerId });
  if (customerExist) {
    const productExist = customerExist.basket.find(
      (product) => product.productId === productId
    );
    if (productExist) {
      const productIndex = customerExist.basket.findIndex(
        (product) => product.productId === productId
      );
      customerExist.basket[productIndex].quantity = quantity;
      await customerExist.save();
      res.status(200).json(customerExist.basket);
    } else {
      customerExist.basket.push({ productId, quantity });
      await customerExist.save();
      res.status(200).json(customerExist.basket);
    }
  }
};
// DELETE product from customer's basket
const deleteFromBasket = async (req, res) => {
  const { customerId, productId } = req.body;
  const customerExist = await Customer.findOne({ customerId: customerId });
  if (customerExist) {
    const productExist = customerExist.basket.find(
      (product) => product.productId === productId
    );
    if (productExist) {
      const productIndex = customerExist.basket.findIndex(
        (product) => product.productId === productId
      );
      customerExist.basket.splice(productIndex, 1);
      await customerExist.save();
      res.status(200).json(customerExist.basket);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
};

module.exports = {
  getBasket,
  updateBasket,
  deleteFromBasket,
};
