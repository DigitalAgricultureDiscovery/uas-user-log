import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { TextField }           from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class DroneTypeText extends React.Component {
  render() {
    return (
      <Field
        name="droneTypeText"
        component={TextField}
        floatingLabelText="Drone type"
      />
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
          step="0.001"
        />&nbsp;
        <Field
          name="remoteChargeMinimumText"
          component={TextField}
          floatingLabelText="Minimum (%)"
          type="number"
          step="0.001"
        />
      </div>
    )
  }
}

class GroundControlChargeStatusText extends React.Component {
  render() {
    return (
      <div>
        <strong>Ground control stations battery status</strong>
        <br />
        <Field
          name="groundControlChargeTargetText"
          component={TextField}
          floatingLabelText="Target (%)"
          type="number"
          step="0.001"
        />&nbsp;
        <Field
          name="groundControlChargeMinimumText"
          component={TextField}
          floatingLabelText="Minimum (%)"
          type="number"
          step="0.001"
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
          <DroneTypeText />
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
