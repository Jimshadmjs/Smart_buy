const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  isDeleted: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('Category', categorySchema);
