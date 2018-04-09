const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const sslRedirect = require('heroku-ssl-redirect');
const nodemailer = require('nodemailer');

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

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: keys.gmailUser,
      pass: keys.gmailPass,
    }
  });

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

  function prepRGBEmail(sensor) {
    let sizeUnit = sensor.RGBSizeUnit === 1 ? 'in' : 'mm';
    let weightUnit = sensor.RGBWeight === 1 ? 'oz' : 'g';
    let sensorHTML = '';
    sensorHTML += '<p>A user has requested to save the following <strong>RGB</strong> sensor:</p>';
    sensorHTML += '<table>';
    sensorHTML += '<tr><th style="text-align: left">Attribute</th><th style="text-align: left">Value</th></tr>';
    sensorHTML += `<tr><td>Make</td><td>${sensor.RGBMake}</td></tr>`;
    sensorHTML += `<tr><td>Model</td><td>${sensor.RGBModel}</td></tr>`;
    sensorHTML += `<tr><td>Width</td><td>${sensor.RGBWidth} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Height</td><td>${sensor.RGBHeight} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Lens type</td><td>${sensor.RGBLensType}</td></tr>`;
    sensorHTML += `<tr><td>Weight</td><td>${sensor.RGBWeight} ${weightUnit}</td></tr>`;
    sensorHTML += `<tr><td>Pixel count</td><td>${sensor.RGBPixelCount}</td></tr>`;
    sensorHTML += `<tr><td>Pixel pitch (microns)</td><td>${sensor.RGBPixelPitch}</td></tr>`;
    sensorHTML += '</table>';
    return sensorHTML;
  }

  function sendMail(sensor) {
    const mailOptions = {
      from: '"UAS User Log Admin" <uasuserlog@gmail.com>',
      to: 'uasuserlog@gmail.com',
      subject: 'UAS User Log - Add sensor request',
      html: prepRGBEmail(sensor),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }

  app.post('/api/save', function (req, res) {
    console.log('/api/save');
    const sensor = req.body;
    console.log(sensor);
    sendMail(sensor);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({status: 'pass'}));
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
