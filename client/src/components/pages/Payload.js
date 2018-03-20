import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { SelectField, TextField }           from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

class PayloadTextField extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText={this.props.fieldLabel}
      />
    )
  }
}

class PayloadSelectField extends React.Component {
  menuItems(items) {
    return items.map((item) => (
      <MenuItem
        key={item.value}
        value={item.value}
        primaryText={item.name}
      />
    ))
  }
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={SelectField}
        floatingLabelText={this.props.fieldLabel}
      >
        {this.menuItems(this.props.items)}
      </Field>
    )
  }
}

class RGBForm extends React.Component {
  render() {
    return (
      <div>Test</div>
    )
  }
}

class Payload extends React.Component {
  renderSensorForms(sensors) {
    sensors.forEach(function(sensor, index) {
      console.log('sensor: ', sensor);
      if (sensor.sensorType === 1) {
        // rgb
        return (
          <RGBForm
            sensor={sensor}
          />
        );
      } else if (sensor.sensorType === 2) {
        // multispectral
      } else if (sensor.sensorType === 3) {
        // hyperspectral
      } else if (sensor.sensorType === 4) {
        // lidar
      } else if (sensor.sensorType === 5) {
        // thermal
      }
    })
  }
  render() {
    const { handleSubmit, previousPage, sensors } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Payload Metadata" />
        <CardText>
          {sensors ? this.renderSensorForms(sensors) : null}
          {!sensors ? <span>Please <strong>add at least one sensor</strong> during the Planning phase.</span> : null}
        </CardText>
        <CardActions>
          <FlatButton
            className="previous"
            label="Previous"
            onClick={previousPage}
            backgroundColor="#BAA892"
          />
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            backgroundColor="#FFD100"
          />
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
})(Payload);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const sensors = selector(state, 'sensors');

    return {
      sensors,
    }
  }
)(myReduxForm);
