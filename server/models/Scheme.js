const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "Govt Loan", "Subsidy"
  interest: { type: String, required: true },
  tag: { type: String }, // e.g., "Most Popular"
  color: { type: String, default: "indigo" }, // matches your frontend CSS
  description: { type: String },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Tracks which admin added it
}, { timestamps: true });

module.exports = mongoose.model('Scheme', SchemeSchema);