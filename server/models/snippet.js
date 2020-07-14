const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['request', 'receive'],
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    default: 'Unknown',
  },
  language: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  date_requested: {
    type: Date,
    required: true,
    default: Date.now,
  },
  date_submitted: {
    type: Date,
    required: true,
    default: Date.now,
  },
  date_accepted: {
    type: Date,
    required: true,
  },
});

const Snippet = mongoose.model('Snippet', snippetSchema);
module.exports = Snippet;
