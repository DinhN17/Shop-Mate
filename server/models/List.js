const { Schema, model } = require('mongoose');

const listSchema = new Schema({
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
    type: String,
    trim: true,
  },
  members: [
    {
      type: String,
      trim: true,
    },
  ],
  
  items: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      addedBy: {
        type: String,
        trim: true,
      },
      boughtBy: {
        type: String,
        trim: true,
      },
    },
  ],
  version: {
    type: Number,
    default: 1,
  },
  // concurrentViewing: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // }],
}, {
  timestamps: true,
});

const List = model('List', listSchema);

module.exports = List;