import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { RadioButtonGroup }      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RadioButton                          from 'material-ui/RadioButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'people_';

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
          <RadioButton value="faaCOA" label="have FAA COA approved to fly over people" />
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
          {hasFAA === "faaCOA" ? <LogbookTextField fieldName={`${PAGE_NAME}FAACOA`} fieldLabel="Please enter FAA COA #" /> : null}
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
