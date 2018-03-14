import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { RadioButtonGroup, TextField }      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RadioButton                          from 'material-ui/RadioButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class PeoplePresentRadioButtonGroup extends React.Component {
  render() {
    return (
      <div>
        Select one
        <Field
          name="peoplePresentRadioButtonGroup"
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

class FAACOAText extends React.Component {
  render() {
    return (
      <Field
        name="faaCOA"
        component={TextField}
        floatingLabelText="Please enter FAA COA #"
      />
    )
  }
}

class People extends React.Component {
  render() {
    const { handleSubmit, previousPage, hasFAA } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="People Present" />
        <CardText>
          <PeoplePresentRadioButtonGroup />
          {hasFAA === "faaCOA" ? <FAACOAText /> : null}
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
})(People);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const hasFAA = selector(state, 'peoplePresentRadioButtonGroup');
    return {
      hasFAA
    }
  }
)(myReduxForm);
