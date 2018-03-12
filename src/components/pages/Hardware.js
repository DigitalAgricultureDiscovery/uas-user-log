import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { SelectField, TextField }           from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class DroneTypeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
  }

  render() {
    return (
      <Field
        name="selectDroneType"
        component={SelectField}
        floatingLabelText="Drone type"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Fixed wing" />
        <MenuItem value={2} primaryText="Multiple rotor" />
      </Field>
    )
  }
}

class DroneRegistrationText extends React.Component {
  render() {
    return (
      <Field
        name="droneRegistrationText"
        component={TextField}
        floatingLabelText="Drone registration # (required for work or business)"
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
        floatingLabelText="Drone model"
      />
    )
  }
}

class BatteryStatusText extends React.Component {
  render() {
    return (
      <Field
        name="batteryStatusText"
        component={TextField}
        floatingLabelText="Battery status"
      />
    )
  }
}

class GroundControlText extends React.Component {
  render() {
    return (
      <Field
        name="groundControlText"
        component={TextField}
        floatingLabelText="Ground control stations battery status"
      />
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
