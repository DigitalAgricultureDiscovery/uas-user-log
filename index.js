const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const sslRedirect = require('heroku-ssl-redirect');

const keys = require('./config/keys');
const weatherAPI = require('./helpers/weather');

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  // Redirect to https
  app.use(sslRedirect());

  // Support JSON-encoded bodies
  app.use(express.json());

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, './client/build')));

  // Answer API requests.
  app.get('/api/weather', function (req, res) {
    res.set('Content-Type', 'application/json');
    weatherAPI.getForecast(keys.apixuKey, req.query.location.toString())
      .then(data => res.send(data))
      .catch(err => res.send(err.message));
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
