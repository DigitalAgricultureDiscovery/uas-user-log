import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { Checkbox, RadioButtonGroup }              from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText }        from 'material-ui/Card';
import FlatButton                                  from 'material-ui/FlatButton';
import RadioButton                                 from 'material-ui/RadioButton';
import RaisedButton                                from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'flightParameters_';

const FT_AND_M = [
  {value: 1, name: 'ft', rate: 3.28084},
  {value: 2, name: 'm', rate: 0.3048},
];

class LookAngleRadioButtonGroup extends React.Component {
  render() {
    return (
      <div>
        Look angle <span style={{color: 'rgb(244, 67, 54)'}}>*</span>
        <Field
          name={`${PAGE_NAME}LookAngle`}
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
        Maximum ground speed GPS controlled <span style={{color: 'rgb(244, 67, 54)'}}>*</span>
        <Field
          name={`${PAGE_NAME}MaximumGroundSpeed`}
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
        name={`${PAGE_NAME}ObstacleAvoidance`}
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
        name={`${PAGE_NAME}ReturnHome`}
        component={Checkbox}
        label="Return to Home enabled"
      />
    )
  }
}

class FlightParameters extends React.Component {
  componentDidMount() {
    this.props.trackPage('Flight Parameters');
  }

  render() {
    const { handleSubmit, previousPage, currentAGLMaximum, currentAGLMinimum, currentPlanningType } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Flight Parameters" />
        <CardText>
          <LogbookTextField
            fieldName={`${PAGE_NAME}AGLMaximum`}
            fieldLabel="Max altitude, AGL"
            required={true}
            type="number"
            step="0.1"
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}AGLMinimum`}
            fieldLabel="Min altitude, AGL"
            type="number"
            step="0.1"
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}AGLUnit`}
            fieldLabel="Altitude Unit"
            items={FT_AND_M}
            valueToConvert1={currentAGLMaximum}
            valueToConvert1FieldName={`${PAGE_NAME}AGLMaximum`}
            valueToConvert2={currentAGLMinimum}
            valueToConvert2FieldName={`${PAGE_NAME}AGLMinimum`}
            step="0.1"
            change={this.props.change}
          />
          <br />
          {currentPlanningType === 2 ? <LookAngleRadioButtonGroup /> : null}
          <br />
          <MaximumGroundSpeedRadioButtonGroup />
          <br />
          <ObstacleAvoidanceCheckbox />
          <ReturnHomeCheckbox />
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
})(FlightParameters);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentAGLMaximum = selector(state, PAGE_NAME + 'AGLMaximum');
    const currentAGLMinimum = selector(state, PAGE_NAME + 'AGLMinimum');
    const currentPlanningType = selector(state, 'planning_Type');
    return {
      currentAGLMaximum,
      currentAGLMinimum,
      currentPlanningType,
    }
  }
)(myReduxForm);
