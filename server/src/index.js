const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const path = require('path');
const winston = require('./config/winston');

const prepEmails = require('./helpers/prepEmails');
const weatherAPI = require('./helpers/weather');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;

const app = express();

// Compression middleware
app.use(compression());

// Log using morgan and winston
app.use(morgan('combined', { stream: winston.stream }));

// Configure transporter
const auth = {
  type: 'OAuth2',
  user: process.env.SMTP_USER,
  clientId: process.env.SMTP_CLIENT_ID,
  clientSecret: process.env.SMTP_CLIENT_SECRET,
  refreshToken: process.env.SMTP_REFRESH_TOKEN,
  accessToken: process.env.SMTP_ACCESS_TOKEN,
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: auth,
});

// Support JSON-encoded bodies
app.use(express.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Answer API requests.
app.get('/api/weather', function (req, res) {
  res.set('Content-Type', 'application/json');
  weatherAPI
    .getForecast(req.query.location.toString())
    .then((data) => res.send(data))
    .catch((err) => res.send(err.message));
});

function sendMail(sensorHTML) {
  const mailOptions = {
    from: `"UAS User Log Admin" ${process.env.SMTP_USER}`,
    to: process.env.SMTP_RECIPIENTS,
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
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // include winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res.status(err.status || 500);
  if (!err.redirect) {
    res.send(err.clientMessage ? err.clientMessage : { error: err.message });
  } else {
    res.redirect('/');
  }
});

app.listen(PORT, function () {
  console.error(
    `Node cluster worker ${process.pid}: listening on port ${PORT}`
  );
});
