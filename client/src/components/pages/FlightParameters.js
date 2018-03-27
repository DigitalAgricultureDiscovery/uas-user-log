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

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

const FT_AND_M = [
  {value: 1, name: 'ft', rate: 3.28084},
  {value: 2, name: 'm', rate: 0.3048},
];

class MaximumGroundSpeedRadioButtonGroup extends React.Component {
  render() {
    return (
      <div>
        Maximum ground speed GPS controlled
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
  render() {
    const { handleSubmit, previousPage, currentAGLMaximum, currentAGLMinimum } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Flight Parameters" />
        <CardText>
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}AGLMaximum`}
              fieldLabel="Maximum altitude, AGL"
              type="number"
              step="0.1"
              style={UNIT_STYLE}
            />

            <LogbookTextField
              fieldName={`${PAGE_NAME}AGLMinimum`}
              fieldLabel="Minimum altitude, AGL"
              type="number"
              step="0.1"
            />
          </div>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}AGLUnit`}
            fieldLabel="Unit"
            items={FT_AND_M}
            valueToConvert1={currentAGLMaximum}
            valueToConvert1FieldName={`${PAGE_NAME}AGLMaximum`}
            valueToConvert2={currentAGLMinimum}
            valueToConvert2FieldName={`${PAGE_NAME}AGLMinimum`}
            change={this.props.change}
          />
          <br />
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
    return {
      currentAGLMaximum,
      currentAGLMinimum,
    }
  }
)(myReduxForm);
