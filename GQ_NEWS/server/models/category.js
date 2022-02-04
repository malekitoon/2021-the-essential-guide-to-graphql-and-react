const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    maxlength: 250,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Category = new mongoose.model('Category', categorySchema);

module.exports = { Category };