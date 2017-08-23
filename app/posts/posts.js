const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      JSONStream = require('JSONStream'),
      express = require('express'),
      utils = require('../utilities/mongo-utilities');

const router = express.Router({
  mergeParams: true
});

mongoose.connect(utils.getDBAddress());

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

const Post = mongoose.model('Post', postSchema);

router.get('/', (req, res) => {
  Post.find().limit(10).sort({ date: 1 })
    .cursor()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'));
});

module.exports = router;
