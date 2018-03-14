import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { Checkbox, RadioButtonGroup, SelectField, TextField } from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RadioButton                          from 'material-ui/RadioButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class AirportOperatorContactText extends React.Component {
  render() {
    return (
      <Field
        name="AirportOperatorContactText"
        component={TextField}
        floatingLabelText="Airport operator contact"
      />
    )
  }
}

class ControlTowerContactText extends React.Component {
  render() {
    return (
      <Field
        name="ControlTowerContactText"
        component={TextField}
        floatingLabelText="Control tower contact"
      />
    )
  }
}

class StatusSelect extends React.Component {
  render() {
    return (
      <Field
        name="statusSelect"
        component={SelectField}
        floatingLabelText="Status"
      >
        <MenuItem value={1} primaryText="Proceed with caution" />
        <MenuItem value={2} primaryText="You are within 5 miles of an airport" />
      </Field>
    )
  }
}

class NOTAMSCheckbox extends React.Component {
  render() {
    return (
      <Field
        name="notamsCheckbox"
        component={Checkbox}
        label="Checked NOTAMS"
      />
    )
  }
}

class FlightRestrictionsCheckbox extends React.Component {
  render() {
    return (
      <Field
        name="flightRestrictionsCheckbox"
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
        name="localRestrictionsCheckbox"
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
        name="upcomingRestrictionsCheckbox"
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
        name="nationalParksCheckbox"
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

class FAACertText extends React.Component {
  render() {
    return (
      <Field
        name="faaCertText"
        component={TextField}
        floatingLabelText="FAA COW or COA used #"
      />
    )
  }
}

class PreflightRadioButtonGroup extends React.Component {
  render() {
    return (
        <Field
          name="preflightRadioButtonGroup"
          component={RadioButtonGroup}
        >
          <RadioButton value="no" label="No" />
          <RadioButton value="yes" label="Yes" />
        </Field>
    )
  }
}

class PermittedByText extends React.Component {
  render() {
    return (
      <Field
        name="permittedByText"
        component={TextField}
        floatingLabelText="Enter permission contact"
      />
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
          name="permissionRadioButtonGroup"
          component={RadioButtonGroup}
          onChange={this.toggleShowPermissionText}
        >
          <RadioButton value="notRequired" label="Not required" />
          <RadioButton value="permitted" label="Permitted by" />
        </Field>
        {this.state.showPermissionText ? <PermittedByText /> : null}
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
          <StatusSelect />
          {currentStatus > 1 &&
            <div>
              <AirportOperatorContactText />
              <br />
              <ControlTowerContactText />
            </div>
          }
          <br /><br />
          <B4UFLYCheckboxGroup />
          <FAACertText />
          <br /><br />
          Completed pre-flight checklist
          <PreflightRadioButtonGroup />
          {noResponse &&
            <div>
              <br />
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

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(B4UFLY);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentStatus = selector(state, 'statusSelect');
    const noResponse = selector(state, 'preflightRadioButtonGroup') === 'no' ? true : false;
    return {
      currentStatus,
      noResponse
    }
  }
)(myReduxForm);
