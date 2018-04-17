import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { RadioButtonGroup }      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import RadioButton                          from 'material-ui/RadioButton';
// helpers
import LogbookTextField from '../helpers/LogbookTextField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate from '../helpers/validate';

const PAGE_NAME = 'people_';

const STYLES = {
  longField: {
    top: 25,
  },
};

class PeoplePresentRadioButtonGroup extends React.Component {
  render() {
    return (
      <div>
        Select one <span style={{color: 'rgb(244, 67, 54)'}}>*</span>
        <Field
          name={`${PAGE_NAME}PeoplePresent`}
          component={RadioButtonGroup}
        >
          <RadioButton value="no" label="No" />
          <RadioButton value="yes" label="Yes, but did not fly over them, or" />
          <RadioButton value="faaCOA" label="have FAA COA approval or approval as per local law, to fly over people" />
        </Field>
      </div>
    )
  }
}

class People extends React.Component {
  componentDidMount() {
    this.props.trackPage('People');
  }

  render() {
    const { handleSubmit, previousPage, hasFAA } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="People Present" />
        <CardText>
          <PeoplePresentRadioButtonGroup />
          {hasFAA === "faaCOA" ?
            <LogbookTextField
              fieldName={`${PAGE_NAME}COA`}
              fieldLabel="Enter FAA COA# or other approval# as per local law"
              floatingLabelShrinkStyle={STYLES.longField}
            /> : null
          }
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
  validate,
})(People);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const hasFAA = selector(state, PAGE_NAME + 'PeoplePresent');
    return {
      hasFAA
    }
  }
)(myReduxForm);
