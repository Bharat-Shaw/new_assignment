// topUpRoutes.js
const express = require('express');
const { UserModel } = require('../models/User');
const topupRouter = express.Router();


topupRouter.post('/topup', async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { amount } = req.body;
    user.balance += parseFloat(amount);
    await user.save();
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = {topupRouter};
