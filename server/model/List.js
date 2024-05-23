const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  version: {
    type: Number,
    default: 1,
  },
  concurrentViewing: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

const List = mongoose.model('List', listSchema);

module.exports = List;
