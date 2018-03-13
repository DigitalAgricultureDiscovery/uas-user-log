import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { Checkbox, RadioButtonGroup, SelectField, TextField } from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText }        from 'material-ui/Card';
import FlatButton                                  from 'material-ui/FlatButton';
import MenuItem                                    from 'material-ui/MenuItem';
import RadioButton                                 from 'material-ui/RadioButton';
import RaisedButton                                from 'material-ui/RaisedButton';

import validate from './utils/validate';

class MaximumAGLText extends React.Component {
  render() {
    return (
      <Field
        name="maximumAGLText"
        component={TextField}
        floatingLabelText="Maximum altitude, AGL"
        type="number"
        step="0.1"
      />
    )
  }
}

class MinimumAGLText extends React.Component {
  render() {
    return (
      <Field
        name="minimumAGLText"
        component={TextField}
        floatingLabelText="Minimum altitude, AGL"
        type="number"
        step="0.1"
      />
    )
  }
}

class AGLUnitSelect extends React.Component {
  render() {
    return (
      <Field
        name="aglUnitSelect"
        component={SelectField}
        floatingLabelText="Unit"
      >
        <MenuItem value={0} primaryText="ft" />
        <MenuItem value={1} primaryText="m" />
      </Field>
    )
  }
}

class LookAngleRadioButtonGroup extends React.Component {
  render() {
    return (
      <div>
        Look angle
        <Field
          name="lookAngleRadioButtonGroup"
          component={RadioButtonGroup}
        >
          <RadioButton value="vertical" label="Vertical" />
          <RadioButton value="oblique" label="Oblique" />
        </Field>
      </div>
    )
  }
}

class MaximumGroundSpeedRadioButtonGroup extends React.Component {
  render() {
    return (
      <div>
        Maximum ground speed GPS controlled
        <Field
          name="maximumGroundSpeedRadioButtonGroup"
          component={RadioButtonGroup}
        >
          <RadioButton value="no" label="No" />
          <RadioButton value="yes" label="Yes" />
        </Field>
      </div>
    )
  }
}

class ObstacleAvoidanceCheckbox extends React.Component {
  render() {
    return (
      <Field
        name="obstacleAvoidanceCheckbox"
        component={Checkbox}
        label="Obstacle avoidance enabled"
      />
    )
  }
}

class ReturnHomeCheckbox extends React.Component {
  render() {
    return (
      <Field
        name="returnHomeCheckbox"
        component={Checkbox}
        label="Return to Home enabled"
      />
    )
  }
}

class FlightParameters extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Flight Parameters" />
        <CardText>
          <MaximumAGLText />
          &nbsp;
          <MinimumAGLText />
          <br />
          <AGLUnitSelect />
          <br /><br />
          <LookAngleRadioButtonGroup />
          <br />
          <MaximumGroundSpeedRadioButtonGroup />
          <br />
          <ObstacleAvoidanceCheckbox />
          <ReturnHomeCheckbox />
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
})(FlightParameters);
