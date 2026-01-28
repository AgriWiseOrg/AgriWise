const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'farmer'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);