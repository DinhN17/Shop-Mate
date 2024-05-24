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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // members: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  // }],
  
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      boughtBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
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