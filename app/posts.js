const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    required: true,
    match: [ /^(development|design|writing)$/, "({VALUE}) is not a valid category (development|design|writing)"]
  },
  source: {
    type: String,
    required: true,
    match: [ /^(facebook|twitter|medium|wordpress)$/, "({VALUE}) is not a valid source (facebook|twitter|medium|wordpress)"]
  },
  link: { type: String, required: true },
  preview: String,
  date: { type: Date, required: true, default: Date.now }
});

