const express = require('express'),
      cors = require('cors'),
      app = express(),
      env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
      port = env === 'dev' ? 5000 : 80;

app.use(cors());

app.get('/', (req, res) => {
  res.json({status: 'up'});
});

const postsRouter = require('./app/posts');
app.use('/posts', postsRouter);

const server = app.listen(port, () => {
  console.log('Server running at http://localhost:' + server.address().port);
});



