const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const sslRedirect = require('heroku-ssl-redirect');
const nodemailer = require('nodemailer');
const compression = require('compression');

const keys = require('./config/keys');
const weatherAPI = require('./helpers/weather');
const prepEmails = require('./helpers/prepEmails');

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();
  // Redirect to https
  app.use(sslRedirect());

  // Compression middleware
  app.use(compression());

  // Configure transporter
  const auth = {
    type: 'OAuth2',
    user: keys.smtpUser,
    clientId: keys.smtpClientId,
    clientSecret: keys.smtpClientSecret,
    refreshToken: keys.smtpRefreshToken,
  };

  const transporter = nodemailer.createTransport({
    host: keys.smtpHost,
    port: keys.smtpPort,
    secure: true,
    auth: auth,
  });

  // Support JSON-encoded bodies
  app.use(express.json());

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, './client/build')));

  // Answer API requests.
  app.get('/api/weather', function (req, res) {
    res.set('Content-Type', 'application/json');
    weatherAPI
      .getForecast(keys.weatherstackKey, req.query.location.toString())
      .then((data) => res.send(data))
      .catch((err) => res.send(err.message));
  });

  function sendMail(sensorHTML) {
    const mailOptions = {
      from: `"UAS User Log Admin" ${keys.smtpUser}`,
      to: keys.smtpRecipients,
      subject: 'UAS User Log - Add sensor request',
      html: sensorHTML,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }

  app.post('/api/save', function (req, res) {
    if (req.body.sensors) {
      const sensors = req.body.sensors;
      sensors.forEach((sensor, index) => {
        if (sensor.sensorType === 1) {
          sendMail(prepEmails.prepRGBEmail(sensor));
        } else if (sensor.sensorType === 2) {
          sendMail(prepEmails.prepMultiEmail(sensor));
        } else if (sensor.sensorType === 3) {
          sendMail(prepEmails.prepHyperEmail(sensor));
        } else if (sensor.sensorType === 4) {
          sendMail(prepEmails.prepLidarEmail(sensor));
        } else if (sensor.sensorType === 5) {
          sendMail(prepEmails.prepThermalEmail(sensor));
        } else {
          sendMail('<p>Unable to determine sensor type</p>');
        }
      });
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify({ status: 1 }));
    } else {
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify({ status: 0 }));
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
