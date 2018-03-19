import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { SelectField }                      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

// Select input for mission type
class TypeSelect extends React.Component {
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
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Planning" />
        <CardText>
          <TypeSelect />
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

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Mission)
