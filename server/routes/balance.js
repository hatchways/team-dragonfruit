const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const User = require('../models/user');

router.get('/balance', auth, (req, res) => {
  const user = req.user;
  res.status(200).send(user);
});

router.post('/topup', auth, async (req, res) => {
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

module.exports = router;
