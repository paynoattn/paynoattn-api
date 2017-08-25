const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan'),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser'),
      app = express(),
      env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
      port = env === 'dev' ? 5000 : 80;

app.use(cors());                                                // Add cors headers to responses
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('/', (req, res) => {
  res.json({status: 'up'});
});

const postsRouter = require('./app/posts/posts.router');
app.use('/posts', postsRouter);

const server = app.listen(port, err => {
  if (err) throw err;
  console.log('Server running at http://localhost:' + server.address().port);
});
