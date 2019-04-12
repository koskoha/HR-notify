const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  anniversaryDate: {
    type: Date,
  },
  hiredDate: {
    type: Date,
    default: Date.now,
  },
  added: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('employee', UserSchema);
