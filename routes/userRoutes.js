const express = require('express');
const router = express.Router();
const User = require('../models/User');
const moment = require('moment');

router.get('/', async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.render('index', { users, moment });
});


router.get('/add', (req, res) => {
  res.render('add');
});


router.post('/add', async (req, res) => {
  const { name, mobile, dob, gender } = req.body;
  await User.create({ name, mobile, dob, gender });
  res.redirect('/');
});


router.get('/edit/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('edit', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.post('/edit/:id', async (req, res) => {
  const { name, mobile, dob, gender } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, mobile, dob, gender });
  res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
