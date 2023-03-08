const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
  },

  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
