import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { SelectField }                      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class FlightModeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
  }

  render() {
    return (
      <Field
        name="flightModeSelect"
        component={SelectField}
        floatingLabelText="Flight mode"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Autonomous" />
        <MenuItem value={2} primaryText="Manual" />
      </Field>
    )
  }
}

class FlightOperation extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Flight Operation" />
        <CardText>
          <FlightModeSelect />
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
})(FlightOperation);