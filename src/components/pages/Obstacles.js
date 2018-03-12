import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { SelectField }                      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class ObstaclesSelect extends React.Component {
  render() {
    return (
      <Field
        name="obstaclesSelect"
        component={SelectField}
        floatingLabelText="Select one or more"
        multiple={true}
      >
        <MenuItem value={1} primaryText="Power/Telephone lines" />
        <MenuItem value={2} primaryText="Power/Telephone poles" />
        <MenuItem value={3} primaryText="Wood or metal towers" />
        <MenuItem value={4} primaryText="Guy-wires" />
        <MenuItem value={5} primaryText="Buildings" />
        <MenuItem value={6} primaryText="Trees" />
        <MenuItem value={7} primaryText="Signs/Signboards" />
        <MenuItem value={8} primaryText="Other" />
      </Field>
    )
  }
}

class Obstacles extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Obstacles Present" />
        <CardText>
          <ObstaclesSelect />
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
  validate
})(Obstacles);
