import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { SelectField, TextField }           from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

// Select input for mission category
class DroneTypeSelect extends React.Component {
  render() {
    return (
      <Field
        name="droneTypeSelect"
        component={SelectField}
        floatingLabelText="Drone type"
      >
        <MenuItem value={1} primaryText="Fixed wing" />
        <MenuItem value={2} primaryText="Multi-rotor" />
        <MenuItem value={3} primaryText="Helicopter" />
      </Field>
    )
  }
}

class DroneMakeText extends React.Component {
  render() {
    return (
      <Field
        name="droneMakeText"
        component={TextField}
        floatingLabelText="Make"
      />
    )
  }
}

class DroneModelText extends React.Component {
  render() {
    return (
      <Field
        name="droneModelText"
        component={TextField}
        floatingLabelText="Model"
      />
    )
  }
}

class DroneRegistrationText extends React.Component {
  render() {
    return (
      <Field
        name="droneRegistrationText"
        component={TextField}
        floatingLabelText="FAA registration #"
      />
    )
  }
}

class RemoteChargeStatusText extends React.Component {
  render() {
    return (
      <div>
        <strong>Remote charge status</strong>
        <br />
        <Field
          name="remoteChargeTargetText"
          component={TextField}
          floatingLabelText="Target (%)"
          type="number"
          step="0.01"
        />&nbsp;
        <Field
          name="remoteChargeMinimumText"
          component={TextField}
          floatingLabelText="Minimum (%)"
          type="number"
          step="0.01"
        />
      </div>
    )
  }
}

class GroundControlChargeStatusText extends React.Component {
  render() {
    return (
      <div>
        <strong>Ground control station battery status</strong>
        <br />
        <Field
          name="groundControlChargeTargetText"
          component={TextField}
          floatingLabelText="Target (%)"
          type="number"
          step="0.01"
        />&nbsp;
        <Field
          name="groundControlChargeMinimumText"
          component={TextField}
          floatingLabelText="Minimum (%)"
          type="number"
          step="0.01"
        />
      </div>
    )
  }
}

class Hardware extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Hardware" />
        <CardText>
          <DroneTypeSelect />
          <br />
          <DroneMakeText />
          <br />
          <DroneModelText />
          <br />
          <DroneRegistrationText />
          <br />
          <br />
          <RemoteChargeStatusText />
          <br />
          <br />
          <GroundControlChargeStatusText />
        </CardText>
        <CardActions>
          <FlatButton
            className="previous"
            label="Prevous"
            onClick={previousPage}
          />
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            primary={true}
          />
        </CardActions>
      </form>
    )
  }
}

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Hardware);
