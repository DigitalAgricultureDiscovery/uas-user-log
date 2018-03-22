import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { SelectField }                      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

// Select input for mission type
class TypeSelect extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.props.updateMissionType(nextProps.currentMissionType);
  }

  render() {
    return (
      <Field
        name="typeSelect"
        component={SelectField}
        floatingLabelText="Mission type"
      >
        <MenuItem value={1} primaryText="Teaching/Demonstration" disabled={true} />
        <MenuItem value={2} primaryText="Research" />
        <MenuItem value={3} primaryText="Spray application" />
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
      'categorySelect': 1,
      'typeSelect': 2,
      'lifeCycleSelect': 1,
      'droneTypeSelect': 1,
      'remoteChargeTargetText': 100.00,
      'remoteChargeMinimumText': 30.00,
      'groundControlChargeTargetText': 100.00,
      'groundControlChargeMinimumText': 30.00,
      'flightModeSelect': 1,
      'statusSelect': 1,
      'chemicalTypeSelect': 1,
      'appRateUnitSelect': 1,
      'pressureUnitSelect': 1,
      'swathDistanceUnitSelect': 1,
      'swathAreaUnitSelect': 1,
      'applicationTypeSelect': 1,
      'preflightRadioButtonGroup': 'yes',
      'permissionRadioButtonGroup': 'notRequired',
      'peoplePresentRadioButtonGroup': 'no',
      'maximumAGLText': 400,
      'aglUnitSelect': 1,
      'lookAngleRadioButtonGroup': 'vertical',
      'maximumGroundSpeedRadioButtonGroup': 'no',
      'niirsSensorSelect': 1,
    },
    missionType: selector(state, 'typeSelect'),
  })
)(myReduxForm);
