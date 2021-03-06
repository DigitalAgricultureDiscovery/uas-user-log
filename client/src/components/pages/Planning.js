import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
// helpers
import LogbookSelectField         from '../helpers/LogbookSelectField';
import LogbookTextField           from '../helpers/LogbookTextField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate                   from '../helpers/validate';
import DefaultInitialValues       from '../helpers/DefaultInitialValues';
// css
import '../../assets/css/fields.css';

const PAGE_NAME = 'planning_';

const PLANNING_TYPES = [
  // {value: 1, name: 'Teaching/Demonstration'},
  {value: 2, name: 'Research/Production'},
  {value: 3, name: 'Spray application'},
  {value: 4, name: 'Other'},
];

// Planning card
class Planning extends React.Component {
  componentDidMount() {
    this.props.trackPage('Planning');
  }

  componentDidUpdate() {
    if (this.props.currentPlanningType) {
      this.props.updatePlanningType(this.props.currentPlanningType);
    }
  }

  render() {
    const { handleSubmit, previousPage, currentPlanningType } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Planning" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Type`}
            fieldLabel="Planning"
            required={true}
            items={PLANNING_TYPES}
          />
          {currentPlanningType === 4 &&
            <LogbookTextField
              fieldName={`${PAGE_NAME}OtherPlanning`}
              fieldLabel="Other planning"
              required={true}
            />
          }
          <p>All fields marked with a red asterisk <span style={{color: 'rgb(244, 67, 54)'}}>*</span> are required.</p>
        </CardText>
        <CardActions>
          <PrevButton onClick={previousPage} />
          <NextButton />
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
