import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'mission_';

const TYPE_ITEMS = [
  // {value: 1, name: 'Teaching/Demonstration'},
  {value: 2, name: 'Research/Production'},
  {value: 3, name: 'Spray application'},
];

// Select input for mission type
class TypeSelect extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.props.updateMissionType(nextProps.currentMissionType);
  }

  menuItems(items) {
    return items.map((item) => (
      <MenuItem
        key={item.value}
        value={item.value}
        primaryText={item.name}
        disabled={item.value === 1 ? true : false}
      />
    ))
  }

  render() {
    return (
      <Field
        name={`${PAGE_NAME}Type`}
        component={SelectField}
        floatingLabelText="Mission type"
      >
        {this.menuItems(TYPE_ITEMS)}
      </Field>
    )
  }
}

// Mission card
class Mission extends React.Component {
  render() {
    const { handleSubmit, previousPage, missionType } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Planning" />
        <CardText>
          <TypeSelect
            currentMissionType={missionType}
            updateMissionType={this.props.updateMissionType}
          />
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
})(Mission);

const selector = formValueSelector('logbook');
export default connect(
  state => ({
    initialValues: selector(state, 'initialValuesFromJSON') ? selector(state, 'initialValuesFromJSON') : {
      'mission_Type': 2,

      'crop_LifeCycle': 1,

      'hardware_Type': 1,
      'hardware_RemoteChargeTarget': 100.00,
      'hardware_RemoteChargeMinimum': 30.00,
      'hardware_GroundControlChargeTarget': 100.00,
      'hardware_GroundControlChargeMinimum': 30.00,

      'flightOperation_Mode': 1,

      'dataCollection_ChemicalType': 1,
      'dataCollection_ApplicationRateUnit': 1,
      'dataCollection_PressureUnit': 1,
      'dataCollection_SwathDistanceUnit': 1,
      'dataCollection_SwathAreaUnit': 1,
      'dataCollection_ApplicationType': 1,

      'b4ufly_Status': 1,
      'b4ufly_Preflight': 'yes',
      'b4ufly_Permission': 'notRequired',

      'flightParameters_AGLMaximum': 400,
      'flightParameters_AGLUnit': 1,
      'flightParameters_LookAngle': 'vertical',
      'flightParameters_MaximumGroundSpeed': 'no',

      'people_PeoplePresent': 'no',

      'processed_NIIRS': 1,
    },
    missionType: selector(state, 'mission_Type'),
  })
)(myReduxForm);
