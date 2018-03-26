import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { Checkbox, RadioButtonGroup }       from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RadioButton                          from 'material-ui/RadioButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'b4ufly_';

const STATUSES = [
  {value: 1, name: "Proceed with caution"},
  {value: 2, name: "You are within 5 miles of an airport"},
];

class NOTAMSCheckbox extends React.Component {
  render() {
    const { touched, error, submitFailed } = this.props;
    return (
      <div>
        {(touched || submitFailed) && error && <p><span className="error-msg">{error}</span></p>}
        <Field
          name={`${PAGE_NAME}NOTAMS`}
          component={Checkbox}
          label="Checked NOTAMS"
        />
      </div>
    )
  }
}

class FlightRestrictionsCheckbox extends React.Component {
  render() {
    return (
      <Field
        name={`${PAGE_NAME}FlightRestrictions`}
        component={Checkbox}
        label="Checked flight restrictions"
      />
    )
  }
}

class LocalRestrictionsCheckbox extends React.Component {
  render() {
    return (
      <Field
        name={`${PAGE_NAME}LocalRestrictions`}
        component={Checkbox}
        label="Checked local restrictions"
      />
    )
  }
}

class UpcomingRestrictionsCheckbox extends React.Component {
  render() {
    return (
      <Field
        name={`${PAGE_NAME}UpcomingRestrictions`}
        component={Checkbox}
        label="Checked upcoming restrictions"
      />
    )
  }
}

class NationalParksCheckbox extends React.Component {
  render() {
    return (
      <Field
        name={`${PAGE_NAME}NationalParks`}
        component={Checkbox}
        label="Checked national parks"
      />
    )
  }
}

class B4UFLYCheckboxGroup extends React.Component {
  render() {
    return (
      <div>
        Select one or more options
        <NOTAMSCheckbox />
        <FlightRestrictionsCheckbox />
        <LocalRestrictionsCheckbox />
        <UpcomingRestrictionsCheckbox />
        <NationalParksCheckbox />
      </div>
    )
  }
}

class PreflightRadioButtonGroup extends React.Component {
  render() {
    return (
        <Field
          name={`${PAGE_NAME}Preflight`}
          component={RadioButtonGroup}
        >
          <RadioButton value="no" label="No" />
          <RadioButton value="yes" label="Yes" />
        </Field>
    )
  }
}

class PermissionRadioButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPermissionText: false,
    }
    this.toggleShowPermissionText = this.toggleShowPermissionText.bind(this);
  }

  toggleShowPermissionText(event, value) {
    this.setState({'showPermissionText': !this.state.showPermissionText});
  }

  render() {
    return (
      <div>
        <Field
          name={`${PAGE_NAME}Permission`}
          component={RadioButtonGroup}
          onChange={this.toggleShowPermissionText}
        >
          <RadioButton value="notRequired" label="Not required" />
          <RadioButton value="permitted" label="Permitted by" />
        </Field>
        {this.state.showPermissionText ?
          <LogbookTextField fieldName={`${PAGE_NAME}PermittedBy`} fieldLabel="Enter permission contact" />
          : null}
      </div>
    )
  }
}

class B4UFLY extends React.Component {
  render() {
    const { handleSubmit, previousPage, currentStatus, noResponse } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="B4UFLY Status" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Status`}
            fieldLabel="Status"
            items={STATUSES}
          />
          {currentStatus > 1 &&
            <div>
              <LogbookTextField fieldName={`${PAGE_NAME}AirportOperatorContact`} fieldLabel="Airport operator contact" />
              <LogbookTextField fieldName={`${PAGE_NAME}ControlTowerContact`} fieldLabel="Control tower contact" />
            </div>
          }
          <B4UFLYCheckboxGroup />
          <LogbookTextField fieldName={`${PAGE_NAME}FAACert`} fieldLabel="FAA COW or COA used #" />
          Completed pre-flight checklist
          <PreflightRadioButtonGroup />
          {noResponse &&
            <div>
              Reason
              <PermissionRadioButtonGroup />
            </div>
          }
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
})(B4UFLY);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentStatus = selector(state, PAGE_NAME + 'Status');
    const noResponse = selector(state, PAGE_NAME + 'Preflight') === 'no' ? true : false;
    return {
      currentStatus,
      noResponse
    }
  }
)(myReduxForm);
