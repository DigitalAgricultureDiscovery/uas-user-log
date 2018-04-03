import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';
import DefaultInitialValues from '../helpers/DefaultInitialValues';

const PAGE_NAME = 'planning_';

const PLANNING_TYPES = [
  // {value: 1, name: 'Teaching/Demonstration'},
  {value: 2, name: 'Research/Production'},
  {value: 3, name: 'Spray application'},
];

// Planning card
class Planning extends React.Component {
  componentDidUpdate() {
    if (this.props.currentPlanningType) {
      this.props.updateMissionType(this.props.currentPlanningType);
    }
  }

  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Planning and Purpose" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Type`}
            fieldLabel="Planning"
            required={true}
            items={PLANNING_TYPES}
          />
          <p>All fields marked with a red asterisk <span style={{color: 'rgb(244, 67, 54)'}}>*</span> are required.</p>
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
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(Planning);

const selector = formValueSelector('logbook');
export default connect(
  state => ({
    initialValues: selector(state, 'initialValuesFromJSON') ? selector(state, 'initialValuesFromJSON') : DefaultInitialValues,
    currentPlanningType: selector(state, 'planning_Type'),
  })
)(myReduxForm);
