const express = require('express'),
      cors = require('cors'),
      app = express(),
      env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
      port = env === 'dev' ? 5000 : 80;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello bro');
});

const server = app.listen(port, () => {
  console.log('Server running at http://localhost:' + server.address().port);
});

// app.set('port', (process.env.PORT || 5000));

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });


