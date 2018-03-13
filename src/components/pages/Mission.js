import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { SelectField }                      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';


// Select input for mission category
class CategorySelect extends React.Component {
  render() {
    return (
      <Field
        name="categorySelect"
        component={SelectField}
        floatingLabelText="Category"
      >
        <MenuItem value={1} primaryText="Planning" />
        <MenuItem value={2} primaryText="Payload" />
        <MenuItem value={3} primaryText="Processed" />
      </Field>
    )
  }
}

// Select input for mission type
class TypeSelect extends React.Component {
  render() {
    return (
      <Field
        name="typeSelect"
        component={SelectField}
        floatingLabelText="Type"
      >
        <MenuItem value={1} primaryText="Teaching/Demonstration" />
        <MenuItem value={2} primaryText="Research" />
        <MenuItem value={3} primaryText="Spray application" />
      </Field>
    )
  }
}

// Mission card
class Mission extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Mission" />
        <CardText>
          <CategorySelect />
          <br />
          <TypeSelect />
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
  validate,
  initialValues: {
    'categorySelect': 1,
    'typeSelect': 1,
    'lifeCycleSelect': 1,
    'droneTypeSelect': 1,
    'remoteChargeTargetText': 100.00,
    'remoteChargeMinimumText': 30.00,
    'groundControlChargeTargetText': 100.00,
    'groundControlChargeMinimumText': 30.00,
    'flightModeSelect': 1,
    'statusSelect': 1,
    'preflightRadioButtonGroup': 'yes',
    'permissionRadioButtonGroup': 'notRequired',
    'peoplePresentRadioButtonGroup': 'no',
    'aglUnitSelect': 0,
    'lookAngleRadioButtonGroup': 'vertical',
    'maximumGroundSpeedRadioButtonGroup': 'no'
  }
})(Mission);
