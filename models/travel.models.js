const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  total_travellers: {
    type: Number,
    required: true,
  },
  budget_per_person: {
    type: Number,
    required: true,
  },
});

const Travel = mongoose.model("Travel", travelSchema);

module.exports = { Travel };
