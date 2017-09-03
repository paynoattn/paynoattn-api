const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan'),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      mongoUtils = require('./utilities/mongo-utilities'),
      app = express(),
      envf = require('../env'),
      env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
      upTimeDate = new Date().toISOString();

app.use(cors());                                                // Add cors headers to responses
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(methodOverride());

mongoose.Promise = global.Promise;
mongoose.connect(mongoUtils.getDBAddress());

app.get('/', (req, res) => {
  res.json({
    status: 'up',
    upTime: upTimeDate
  });
});

const postsRouter = require('./posts/posts.router');
app.use('/posts', postsRouter);

const server = app.listen(envf.appPort, err => {
  if (err) throw err;
  console.log('Server running at http://localhost:' + server.address().port);
});

module.exports = server;
