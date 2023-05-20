const { default: mongoose } = require('mongoose');
const User = require('../models/User');

// GET user's basket
const getBasket = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: `No user with id: ${userId}` });
  }
  try {
    const user = await User.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.basket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// POST add product to basket

// DELETE product from basket

// PUT update product quantity in basket

module.exports = {
  getBasket,
};
