const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  images: [String], // Array to store multiple image URLs
  category: String,
  stock: Number,
  isDeleted: { type: Boolean, default: false }, // For soft deleting products
},{timestamps:true});

module.exports = mongoose.model('Product', productSchema);
