import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { RadioButtonGroup, SelectField }    from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RadioButton                          from 'material-ui/RadioButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'b4ufly_';

const STATUSES = [
  {value: 1, name: 'Proceed with caution'},
  {value: 2, name: 'Flying in controlled airspace (Class B/C/D/E)'},
  {value: 3, name: 'Other'},
];

const OPTIONS = [
  {value: 1, name: 'Checked NOTAMS'},
  {value: 2, name: 'Checked flight restrictions'},
  {value: 3, name: 'Checked local restrictions'},
  {value: 4, name: 'Checked upcoming restrictions'},
  {value: 5, name: 'Checked national parks'},
];

class OptionsSelect extends React.Component {
  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return OPTIONS[values[0] - 1].name;
      default:
        return `${values.length} options selected`;
    }
  }

  menuItems(options) {
    return options.map((option) => (
      <MenuItem
        key={option.value}
        insetChildren={true}
        value={option.value}
        checked={this.props.selectedOptions.indexOf(option.value) > -1}
        primaryText={option.name}
      />
    ));
  }

  render() {
    return (
      <Field
        name={`${PAGE_NAME}Options`}
        className="required"
        component={SelectField}
        floatingLabelText="Select one or more options"
        multiple={true}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(OPTIONS)}
      </Field>
    )
  }
}

class PreflightRadioButtonGroup extends React.Component {
  render() {
    return (
        <Field
          name={`${PAGE_NAME}Preflight`}
          className="required"
          component={RadioButtonGroup}
        >
          <RadioButton value="no" label="No" />
          <RadioButton value="yes" label="Yes" />
        </Field>
    )
  }
}

class PermissionRadioButtonGroup extends React.Component {
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
        {this.props.currentPermission === 'permitted' ?
          <LogbookTextField fieldName={`${PAGE_NAME}PermittedBy`} fieldLabel="Permission contact" required={true} />
          : null}
      </div>
    )
  }
}

class B4UFLY extends React.Component {
  componentDidMount() {
    this.props.trackPage('B4UFLY');
  }

  render() {
    const { handleSubmit, previousPage, currentStatus, noResponse, selectedOptions, currentPermission } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="B4UFLY Status" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Status`}
            fieldLabel="Status"
            required={true}
            items={STATUSES}
          />
          {currentStatus === 2 &&
            <div>
              <LogbookTextField fieldName={`${PAGE_NAME}AirportOperatorContact`} fieldLabel="Airport operator contact" required={true} />
              <LogbookTextField fieldName={`${PAGE_NAME}ControlTowerContact`} fieldLabel="Control tower contact" required={true} />
              <LogbookTextField fieldName={`${PAGE_NAME}PriorAuthorization`} fieldLabel="Prior authorization" required={true} />
            </div>
          }
          {currentStatus === 3 &&
            <div>
              <LogbookTextField fieldName={`${PAGE_NAME}AirportOperatorContact`} fieldLabel="Airport operator contact" />
              <LogbookTextField fieldName={`${PAGE_NAME}ControlTowerContact`} fieldLabel="Control tower contact" />
              <LogbookTextField fieldName={`${PAGE_NAME}PriorAuthorization`} fieldLabel="Prior authorization" />
            </div>
          }
          <OptionsSelect selectedOptions={selectedOptions} />
          <LogbookTextField fieldName={`${PAGE_NAME}CowORCoa`} fieldLabel="COW or COA #" />
          <br />
          Completed pre-flight checklist  <span style={{color: 'rgb(244, 67, 54)'}}>*</span>
          <PreflightRadioButtonGroup />
          {noResponse &&
            <div>
              <br />
              Reason  <span style={{color: 'rgb(244, 67, 54)'}}>*</span>
              <PermissionRadioButtonGroup currentPermission={currentPermission} />
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
    const selectedOptions = selector(state, PAGE_NAME + 'Options') ? selector(state, PAGE_NAME + 'Options') : [];
    const currentPermission = selector(state, PAGE_NAME + 'Permission');
    return {
      currentStatus,
      noResponse,
      selectedOptions,
      currentPermission,
    }
  }
)(myReduxForm);
