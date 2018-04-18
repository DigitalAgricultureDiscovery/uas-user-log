import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton                         from 'material-ui/RaisedButton';
// helpers
import { saveAs } from 'file-saver';
import { ClearButton, PrevButton } from '../helpers/LogbookButtons';
import validate from '../helpers/validate';

const IOSHelp = () => (
  <p>
    iOS users, if you need help saving a copy of your form, please refer to&nbsp;
    <a href="https://support.apple.com/en-us/HT206481" target="_blank" rel="noopener noreferrer">
    these instructions.</a>
  </p>
);

const ShareSensorError = () => (
  <p className="error-msg">
    Unable to share sensors at this time.
  </p>
);

async function saveSensor(sensor) {
  const response = await fetch('/api/save', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sensor),
  });
  const data = await response.json();
  return data;
}

class Finish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareSensorError: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkIOS = this.checkIOS.bind(this);
  }

  componentDidMount() {
    this.props.trackPage('Finish');
  }

  getTimestampFilename() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const timestamp = year + '-' + month + '-' + day + '_' + hour + minute + second;
    return 'uasuserlog_' + timestamp + '.json';
  }

  checkIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  handleClick(event) {
    // Check for saved sensors and send to server
    if (this.props.formValues.payload_Sensors && this.props.formValues.payload_Sensors.length > 0) {
      this.props.formValues.payload_Sensors.forEach((sensor, index) => {
        if (sensor.RGBSave || sensor.MultiSave || sensor.HyperSave || sensor.LidarSave || sensor.ThermalSave) {
          // Append sensor type
          sensor.sensorType = this.props.formValues.dataCollection_Sensors[index].Type;
          // Send to server
          saveSensor(sensor)
            .then(data => {
              // console.log(data);
            })
            .catch(err => {
              this.setState({shareSensorError: true});
            });
        }
      });
    }
    // Save form data in json file
    const blob = new Blob([JSON.stringify(this.props.formValues)], {type: 'application/json;charset=utf-8'});
    saveAs(blob, this.getTimestampFilename());
  }

  render() {
    const { handleSubmit, pristine, previousPage, submitting, clearAndReturn } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <CardTitle title="Finish" />
        <CardText>
          <p>
            Click Save Copy to download a copy of the form you have just completed.
            You will be able to re-load your form selections using the downloaded file
            on the Welcome page. Editing this file may prevent the site from properly
            loading the file. Your forms are never saved or read on a remote server.
          </p>
          <p>
            Click the Clear button to erase your current form selections and return
            to the beginning of the form.
          </p>
          {this.state.shareSensorError ? <ShareSensorError /> : null}
          {this.checkIOS() ? <IOSHelp /> : null}
        </CardText>
        <CardActions>
          <PrevButton onClick={previousPage} />
          <RaisedButton
            className="saveCopy"
            label="Save Copy"
            backgroundColor="#FF9B1A"
            disabled={pristine || submitting}
            onClick={this.handleClick}
          />
          <ClearButton clearAndReturn={clearAndReturn} />
        </CardActions>
      </form>
    )
  }
}

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Finish);

export default connect(
  state => ({
    formValues: getFormValues('logbook')(state),
  })
)(myReduxForm);
