const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.STRIPE_SECRET);
router.post('', async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500, // 500 cents
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id, // in the coming request
  });
  req.user.credits += 5;
  const user = await req.user.save();
  res.send(req.user);
})

module.exports = router;
