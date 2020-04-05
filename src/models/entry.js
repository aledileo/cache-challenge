const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true
  },
  ttl: {
    type: Number,
    default: 300
  }
});

module.exports = mongoose.model('Entry', entrySchema)