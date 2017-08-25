const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      app = express(),
      env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
      port = env === 'dev' ? 5000 : 80;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.json({status: 'up'});
});

const postsRouter = require('./app/posts/posts');
app.use('/posts', postsRouter);

const server = app.listen(port, () => {
  console.log('Server running at http://localhost:' + server.address().port);
});



