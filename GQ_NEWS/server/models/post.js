const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    content: {
      type: String,
      required: true,
      maxlength: 100000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLIC'],
      default: 'DRAFT',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Post = new mongoose.model('Post', postSchema);

module.exports = { Post };

