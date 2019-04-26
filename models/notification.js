const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  done: { type: Boolean, default: false },
  _employee: { type: Schema.Types.ObjectId, ref: 'employee' },
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('notification', UserSchema);
