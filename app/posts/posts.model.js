const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    categories: {
      type: [String],
      required: true,
      match: [ /^(development|design|writing|blog)$/, "({VALUE}) is not a valid category (development|design|writing|blog)"]
    },
    imageURL: String,
    source: {
      type: String,
      required: true,
      match: [ /^(facebook|twitter|medium|wordpress|behance)$/, "({VALUE}) is not a valid source (facebook|twitter|medium|wordpress)"]
    },
    link: { type: String, required: true },
    preview: String,
    date: { type: Date, required: true, default: Date.now }
  },
  {
    collection: 'posts'
  }
);

module.exports = mongoose.model('Post', postSchema);
