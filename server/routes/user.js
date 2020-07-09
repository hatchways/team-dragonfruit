const express = require('express');

const User = require('../models/user');
const auth = require('../middleware/auth');

const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

/////// User sign up route handler ///////
router.post('/api/users/signup', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// User login route handler ///////
router.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// User log out route handler ///////
router.post('/api/users/logout', auth, async (req, res) => {
  res.clearCookie('accessToken');
  res.send('logged out successfully.');
});

/////// User profile route handler ///////
router.get('/api/users/me', auth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

// get balance
router.get('/api/users/balance', auth, (req, res) => {
  const user = req.user;
  res.status(200).send(user);
});

// add credit to top-up
router.post('/api/users/topup', auth, async (req, res) => {
  const { credit } = req.body;

  try {
    const user = req.user;

    user.balance += credit;

    await user.save();
    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Stripe processing to accept payment
router.post('/api/users/charge', async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'CAD',
      description: 'Topup Payment',
      payment_method: id,
      confirm: true,
    });

    return res.status(200).json({
      confirm: 'Successful transaction',
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// credit check for code review
router.get('/api/users/review', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.balance <= 0) {
      return res
        .status(400)
        .json({ msg: 'You do not have enough credit for code review' });
    } else {
      user.balance -= 1;
      await user.save();
      res.status(200).send(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
