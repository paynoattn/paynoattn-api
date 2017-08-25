const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

function categoryValidator(arr) {
  if (!Array.isArray(arr)) return false;
  return arr.every((val) => {
    return /^(development|design|writing|blog)$/.test(val);
  });
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      validate: categoryValidator
    },
    imageURL: {
      type: String
    },
    source: {
      type: String,
      required: true,
      match: [ /^(facebook|twitter|medium|wordpress|behance)$/, "({VALUE}) is not a valid source (facebook|twitter|medium|wordpress)"]
    },
    link: {
      type: String,
      required: true
    },
    preview: {
      type: String
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    collection: 'posts'
  }
);

module.exports = mongoose.model('Post', postSchema);
