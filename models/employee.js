const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  ssn: String,
  anniversaryDate: {
    type: Date,
    required: true,
  },
  hiringDate: {
    type: Date,
    required: true,
  },
  contractName: {
    type: String,
    required: true,
  },
  vacationAmtPerYear: {
    type: Number,
    required: true,
  },
  proratedVacationAmt: {
    type: Number,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  added: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Active',
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('employee', UserSchema);
