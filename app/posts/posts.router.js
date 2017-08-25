const mongoose = require('mongoose'),
      JSONStream = require('JSONStream'),
      express = require('express'),
      authenticated = require('../utilities/authenticated'),
      mongoUtils = require('../utilities/mongo-utilities'),
      paginate = require('../utilities/paginate'),
      Post = require('./posts.model');

const router = express.Router();

mongoose.connect(mongoUtils.getDBAddress());

router.get('/', (req, res) => {
  const perPage = paginate.buildPerPageParams(req.query['perPage']),
    page = paginate.buildPageParams(req.query['page']);
  Post.find().limit(perPage).skip(perPage * page).sort({ date: -1 })
    .cursor()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'));
}).get('/:category', (req, res) => {
  const perPage = paginate.buildPerPageParams(req.query['perPage']),
    page = paginate.buildPageParams(req.query['page']);
  Post.find({ categories: req.params.category }).limit(perPage).skip(perPage * page).sort({ date: -1 })
    .cursor()
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
      res.json(JSON.stringify({ Error: err }));
    });
  }
});

module.exports = router;
