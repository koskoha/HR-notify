const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const ContractSchema = new Schema({
  name: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('contract', ContractSchema);
