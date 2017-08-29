const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const categories = [
  'development', 'design', 'writing', 'blog'
];

const sources = [
  'facebook', 'twitter', 'medium', 'wordpress', 'behance'
];

function categoryValidator(arr) {
  if (!Array.isArray(arr)) return false;
  return arr.every((val) => {
    return categories.indexOf(val) > -1;
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
      validate: [
        categoryValidator,
        '{VALUE} is not valid category'
      ]
    },
    imageURL: {
      type: String
    },
    source: {
      type: String,
      required: true,
      enum: sources
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

module.exports = {
  categories: categories, 
  Post: mongoose.model('Post', postSchema),
  sources: sources
};
