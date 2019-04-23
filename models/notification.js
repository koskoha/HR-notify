const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  notified: { type: Boolean, default: true },
  info: String,
  infoDate: { type: Date, default: Date.now },
  _employee: { type: Schema.Types.ObjectId, ref: 'employee' },
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('notification', UserSchema);
