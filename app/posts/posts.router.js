const mongoose = require('mongoose'),
      JSONStream = require('JSONStream'),
      express = require('express'),
      authenticated = require('../utilities/authenticated'),
      mongoUtils = require('../utilities/mongo-utilities'),
      paginate = require('../utilities/paginate'),
      Post = require('./posts.model');

const router = express.Router();

mongoose.connect(mongoUtils.getDBAddress());

function buildGet(get, queryParams) {
  const perPage = paginate.buildPerPageParams(queryParams['perPage']),
        page = paginate.buildPageParams(queryParams['page']);
  return get.limit(perPage).skip(perPage * page).sort({ date: -1 }).cursor();
}

router.get('/', (req, res) => {
  buildGet(Post.find(), req.query)
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'));
}).get('/:category', (req, res) => {
  buildGet(Post.find({ categories: req.params.category }), req.query)
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'));
}).post('/', (req, res) => {
  if ( authenticated(req.body) ) {
    req.body['post']['date'] = new Date(req.body['post']['date']);
    Post.create(req.body['post']).then(post => {
      res.json(post);
    }).catch(err => {
      res.status(500);
      res.json({ error: err });
    })
  } else {
    res.status(403);
    res.json({ error: 'Not authorized to post.' });
  }
}).delete('/:id', (req, res) => { 
  if ( authenticated(req.body) ) {
    Post.remove({ _id: req.params['id'] }).exec(() => {
      res.status(200);
      res.json('Post succesfull deleted');
    }).catch(err => {
      res.status(500);
      res.json({ Error: err });
    });
  }
});

module.exports = router;
