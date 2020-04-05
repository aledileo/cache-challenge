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
  lastRead: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Entry', entrySchema)