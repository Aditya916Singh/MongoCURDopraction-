const express = require('express');
const router = express.Router();
const User = require('../models/User');
const moment = require('moment');
const multer = require('multer');
const path = require('path');


// GET: Show all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render('index', { users, moment });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

// GET: Show add user form
router.get('/add', (req, res) => {
  res.render('add', { user: null }); // Ensure 'user' is always defined
});

// POST: Handle add user form
router.post('/add', async (req, res) => {
  const { name, mobile, dob, gender } = req.body;

  // Regex for validations
  const mobileRegex = /^\d{10}$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  const today = new Date();
  const selectedDate = new Date(dob);
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  // Validations
  if (!nameRegex.test(name)) {
    return res.status(400).send("Name must contain only letters and spaces.");
  }

  if (!mobileRegex.test(mobile)) {
    return res.status(400).send("Invalid mobile number. It must be exactly 10 digits.");
  }

  if (selectedDate.getTime() > today.getTime()) {
    return res.status(400).send("Date of birth cannot be in the future.");
  }

  try {
    await User.create({ name, mobile, dob, gender });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

// GET: Show edit user form
router.get('/edit/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.render('edit', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST: Handle edit user form
router.post('/edit/:id', async (req, res) => {
  const { name, mobile, dob, gender } = req.body;

  // Regex for validations
  const mobileRegex = /^\d{10}$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  const today = new Date();
  const selectedDate = new Date(dob);
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  // Validations
  if (!nameRegex.test(name)) {
    return res.status(400).send("Name must contain only letters and spaces.");
  }

  if (!mobileRegex.test(mobile)) {
    return res.status(400).send("Invalid mobile number. It must be exactly 10 digits.");
  }

  if (selectedDate.getTime() > today.getTime()) {
    return res.status(400).send("Date of birth cannot be in the future.");
  }

  try {
    await User.findByIdAndUpdate(req.params.id, { name, mobile, dob, gender });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

// POST: Delete user
router.post('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = router;
