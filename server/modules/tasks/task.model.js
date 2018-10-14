const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
  },
  createdBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  completed: {
    type: Boolean,
    default: false,
  },
}, {
    timestamps: true
  });

module.exports = mongoose.model('Task', schema, 'tasks');