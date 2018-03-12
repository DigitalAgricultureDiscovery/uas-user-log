import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { SelectField, TextField }                      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class AirportOperatorContactText extends React.Component {
  render() {
    return (
      <Field
        name="AirportOperatorContactText"
        component={TextField}
        floatingLabelText="Airport operator contact"
      />
    )
  }
}

class ControlTowerContactText extends React.Component {
  render() {
    return (
      <Field
        name="ControlTowerContactText"
        component={TextField}
        floatingLabelText="Control tower contact"
      />
    )
  }
}

class StatusSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      showContactForm: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
    if (value === 2) {
      this.props.toggleContactFormOn();
    } else {
      this.props.toggleContactFormOff();
    }
  }

  render() {
    return (
      <Field
        name="statusSelect"
        component={SelectField}
        floatingLabelText="Status"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Proceed with caution" />
        <MenuItem value={2} primaryText="You are within 5 miles of an airport" />
      </Field>
    )
  }
}

class B4UFLY extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactForm: false,
    }
    this.toggleContactFormOn = this.toggleContactFormOn.bind(this);
    this.toggleContactFormOff = this.toggleContactFormOff.bind(this);
  }

  toggleContactFormOn() {
    this.setState({showContactForm: true})
  }

  toggleContactFormOff() {
    this.setState({showContactForm: false})
  }

  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="B4UFLY Status" />
        <CardText>
          <StatusSelect toggleContactFormOn={this.toggleContactFormOn} toggleContactFormOff={this.toggleContactFormOff}/>
          {this.state.showContactForm &&
            <div>
            <AirportOperatorContactText />
            <ControlTowerContactText />
            </div>
          }
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
})(B4UFLY);
