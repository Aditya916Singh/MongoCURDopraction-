const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date },          // <-- Add this line
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
