const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const sslRedirect = require('heroku-ssl-redirect');
const nodemailer = require('nodemailer');
const compression = require('compression');
// const mongoose = require('mongoose');

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

  // Compression middleware
  app.use(compression());

  // Connect with database
  // mongoose.connect(keys.mongoURI);

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
    const sizeUnit = sensor.RGBSizeUnit === 1 ? 'in' : 'mm';
    const weightUnit = sensor.RGBWeightUnit === 1 ? 'oz' : 'g';
    let sensorHTML = '';
    sensorHTML += '<p>A user has requested to save the following <strong>RGB</strong> sensor:</p>';
    sensorHTML += '<table>';
    sensorHTML += '<tr><th style="text-align: left">Attribute</th><th style="text-align: left">Value</th></tr>';
    sensorHTML += `<tr><td>Make</td><td>${sensor.RGBMake}</td></tr>`;
    sensorHTML += `<tr><td>Model</td><td>${sensor.RGBModel}</td></tr>`;
    sensorHTML += `<tr><td>Width</td><td>${sensor.RGBWidth} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Height</td><td>${sensor.RGBHeight} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Depth</td><td>${sensor.RGBDepth} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Weight</td><td>${sensor.RGBWeight} ${weightUnit}</td></tr>`;
    sensorHTML += `<tr><td>Lens type</td><td>${sensor.RGBLensType}</td></tr>`;
    sensorHTML += `<tr><td>Pixel count</td><td>${sensor.RGBPixelCount}</td></tr>`;
    sensorHTML += `<tr><td>Pixel pitch (microns)</td><td>${sensor.RGBPixelPitch}</td></tr>`;
    sensorHTML += '</table>';
    return sensorHTML;
  }

  function prepMultiEmail(sensor) {
    const sizeUnit = sensor.MultiSizeUnit === 1 ? 'in' : 'mm';
    const weightUnit = sensor.MultiWeightUnit === 1 ? 'oz' : 'g';
    const gsdUnit = sensor.MultiGSD === 1 ? 'in' : 'mm';
    let sensorHTML = '';
    sensorHTML += '<p>A user has requested to save the following <strong>Multispectral</strong> sensor:</p>';
    sensorHTML += '<table>';
    sensorHTML += '<tr><th style="text-align: left">Attribute</th><th style="text-align: left">Value</th></tr>';
    sensorHTML += `<tr><td>Make</td><td>${sensor.MultiMake}</td></tr>`;
    sensorHTML += `<tr><td>Model</td><td>${sensor.MultiModel}</td></tr>`;
    sensorHTML += `<tr><td>Width</td><td>${sensor.MultiWidth} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Height</td><td>${sensor.MultiHeight} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Depth</td><td>${sensor.MultiDepth} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Weight</td><td>${sensor.MultiWeight} ${weightUnit}</td></tr>`;
    sensorHTML += `<tr><td>Spectral bands</td><td>${sensor.MultiBands}</td></tr>`;
    sensorHTML += `<tr><td>GSD</td><td>${sensor.MultiGSD} ${gsdUnit}</td></tr>`;
    sensorHTML += `<tr><td>Horizontal FOV</td><td>${sensor.MultiHFOV}</td></tr>`;
    sensorHTML += `<tr><td>Pixel size</td><td>${sensor.MultiPixelSize}</td></tr>`;
    sensorHTML += `<tr><td>Pixel depth</td><td>${sensor.MultiPixelDepth}</td></tr>`;
    sensorHTML += `<tr><td>Frame rate (Hz)</td><td>${sensor.MultiFrameRate}</td></tr>`;
    sensorHTML += `<tr><td>Image format</td><td>${sensor.MultiImageFormat}</td></tr>`;
    sensorHTML += `<tr><td>Video format</td><td>${sensor.MultiVideoFormat}</td></tr>`;
    sensorHTML += `<tr><td>Electronic shutter</td><td>${sensor.MultiElectronicShutter}</td></tr>`;
    sensorHTML += `<tr><td>Gain</td><td>${sensor.MultiGain}</td></tr>`;
    sensorHTML += `<tr><td>Voltage</td><td>${sensor.MultiVoltage}</td></tr>`;
    sensorHTML += `<tr><td>Power</td><td>${sensor.MultiPower}</td></tr>`;
    sensorHTML += '</table>';
    return sensorHTML;
  }

  function prepHyperEmail(sensor) {
    let sizeUnit = sensor.HyperSizeUnit === 1 ? 'in' : 'mm';
    let weightUnit = sensor.HyperWeightUnit === 1 ? 'oz' : 'g';
    let sensorHTML = '';
    sensorHTML += '<p>A user has requested to save the following <strong>Hyperspectral</strong> sensor:</p>';
    sensorHTML += '<table>';
    sensorHTML += '<tr><th style="text-align: left">Attribute</th><th style="text-align: left">Value</th></tr>';
    sensorHTML += `<tr><td>Make</td><td>${sensor.HyperMake}</td></tr>`;
    sensorHTML += `<tr><td>Model</td><td>${sensor.HyperModel}</td></tr>`;
    sensorHTML += `<tr><td>Weight</td><td>${sensor.HyperWeight} ${weightUnit}</td></tr>`;
    sensorHTML += `<tr><td>Spatial bands</td><td>${sensor.HyperSpatialBands}</td></tr>`;
    sensorHTML += `<tr><td>Spectral bands</td><td>${sensor.HyperSpectralBands}</td></tr>`;
    sensorHTML += `<tr><td>Spectral range</td><td>${sensor.HyperSpectralRange}</td></tr>`;
    sensorHTML += `<tr><td>Operation mode</td><td>${sensor.HyperOperationMode}</td></tr>`;
    sensorHTML += `<tr><td>Frame rate (Hz)</td><td>${sensor.HyperFrameRate}</td></tr>`;
    sensorHTML += `<tr><td>Dispersion</td><td>${sensor.HyperDispersion}</td></tr>`;
    sensorHTML += `<tr><td>FWHM</td><td>${sensor.HyperFWHM}</td></tr>`;
    sensorHTML += `<tr><td>Lens</td><td>${sensor.HyperLens}</td></tr>`;
    sensorHTML += `<tr><td>Storage</td><td>${sensor.HyperStorage}</td></tr>`;
    sensorHTML += `<tr><td>Interface</td><td>${sensor.HyperInterface}</td></tr>`;
    sensorHTML += `<tr><td>Size</td><td>${sensor.HyperSize} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Weight (minus lens)</td><td>${sensor.HyperWeightMinusLens} ${weightUnit}</td></tr>`;
    sensorHTML += '</table>';
    return sensorHTML;
  }

  function prepLidarEmail(sensor) {
    const weightUnit = sensor.LidarWeightUnit === 1 ? 'lb' : 'kg';
    const minRangeUnit = sensor.LidarMinRangeUnit === 1 ? 'ft' : 'm';
    const maxRangeUnit = sensor.LidarMaxRangeUnit === 1 ? 'ft' : 'm';
    const distRangeUnit = sensor.LidarDistResolutionUnit === 1 ? 'in' : 'cm';
    let sensorHTML = '';
    sensorHTML += '<p>A user has requested to save the following <strong>LiDAR</strong> sensor:</p>';
    sensorHTML += '<table>';
    sensorHTML += '<tr><th style="text-align: left">Attribute</th><th style="text-align: left">Value</th></tr>';
    sensorHTML += `<tr><td>Make</td><td>${sensor.LidarMake}</td></tr>`;
    sensorHTML += `<tr><td>Model</td><td>${sensor.LidarModel}</td></tr>`;
    sensorHTML += `<tr><td>Weight</td><td>${sensor.LidarWeight} ${weightUnit}</td></tr>`;
    sensorHTML += `<tr><td>Horizontal FOV</td><td>${sensor.LidarHorizontalFOV}</td></tr>`;
    sensorHTML += `<tr><td>Vertical FOV</td><td>${sensor.LidarVerticalFOV}</td></tr>`;
    sensorHTML += `<tr><td>Min. range</td><td>${sensor.LidarMinRange} ${minRangeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Max. range</td><td>${sensor.LidarMaxRange} ${maxRangeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Distance resolution</td><td>${sensor.LidarDistResolution} ${distRangeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Scan rate (Hz)</td><td>${sensor.LidarScanRate}</td></tr>`;
    sensorHTML += `<tr><td>Angular resolution (Hz)</td><td>${sensor.LidarAngularResolution}</td></tr>`;
    sensorHTML += `<tr><td>Voltage</td><td>${sensor.LidarVoltage}</td></tr>`;
    sensorHTML += `<tr><td>Power</td><td>${sensor.LidarPower}</td></tr>`;
    sensorHTML += '</table>';
    return sensorHTML;
  }

  function prepThermalEmail(sensor) {
    const sizeUnit = sensor.ThermalDimensionsUnit === 1 ? 'in' : 'mm';
    let sensorHTML = '';
    sensorHTML += '<p>A user has requested to save the following <strong>Thermal</strong> sensor:</p>';
    sensorHTML += '<table>';
    sensorHTML += '<tr><th style="text-align: left">Attribute</th><th style="text-align: left">Value</th></tr>';
    sensorHTML += `<tr><td>Make</td><td>${sensor.ThermalMake}</td></tr>`;
    sensorHTML += `<tr><td>Model</td><td>${sensor.ThermalModel}</td></tr>`;
    sensorHTML += `<tr><td>Width</td><td>${sensor.ThermalWidth} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Height</td><td>${sensor.ThermalHeight} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Depth</td><td>${sensor.ThermalDepth} ${sizeUnit}</td></tr>`;
    sensorHTML += `<tr><td>Spectral band</td><td>${sensor.ThermalSpectralBand}</td></tr>`;
    sensorHTML += `<tr><td>Frame rate</td><td>${sensor.ThermalFrameRate}</td></tr>`;
    sensorHTML += `<tr><td>Imager</td><td>${sensor.ThermalImager}</td></tr>`;
    sensorHTML += `<tr><td>Measurement accuracy</td><td>${sensor.ThermalMeasurementAcc}</td></tr>`;
    sensorHTML += `<tr><td>Lens</td><td>${sensor.ThermalLens}</td></tr>`;
    sensorHTML += `<tr><td>FOV</td><td>${sensor.ThermalFOV}</td></tr>`;
    sensorHTML += `<tr><td>Voltage</td><td>${sensor.ThermalVoltage}</td></tr>`;
    sensorHTML += `<tr><td>Power</td><td>${sensor.ThermalPower}</td></tr>`;
    sensorHTML += '</table>';
    return sensorHTML;
  }

  function sendMail(sensorHTML) {
    const mailOptions = {
      from: '"UAS User Log Admin" <uasuserlog@gmail.com>',
      to: 'uasuserlog@gmail.com',
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
    const sensor = req.body;
    if (sensor.sensorType === 1) {
      sendMail(prepRGBEmail(sensor));
    } else if (sensor.sensorType === 2) {
      sendMail(prepMultiEmail(sensor));
    } else if (sensor.sensorType === 3) {
      sendMail(prepHyperEmail(sensor));
    } else if (sensor.sensorType === 4) {
      sendMail(prepLidarEmail(sensor));
    } else if (sensor.sensorType === 5) {
      sendMail(prepThermalEmail(sensor));
    } else {
      sendMail('<p>Unable to determine sensor type</p>');
    }
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
