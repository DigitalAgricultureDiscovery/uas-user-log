import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { DatePicker, TimePicker } from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText }  from 'material-ui/Card';
import FlatButton                            from 'material-ui/FlatButton';
import IconButton                            from 'material-ui/IconButton';
import RaisedButton                          from 'material-ui/RaisedButton';
// material-ui icons
import ActionFlightTakeoffIcon from 'material-ui/svg-icons/action/flight-takeoff';
import DeleteForeverIcon       from 'material-ui/svg-icons/action/delete-forever';
import MyLocationIcon          from 'material-ui/svg-icons/maps/my-location';
// material-ui colors
import {red500} from 'material-ui/styles/colors';

import validate from '../helpers/validate';
import locationUtil from '../helpers/location';

const PAGE_NAME = 'general_';

class FlightDatePicker extends React.Component {
  render() {
    return (
      <Field
        name={`${PAGE_NAME}FlightDate`}
        component={DatePicker}
        format={null}
        floatingLabelText="Date of flight(s)"
      />
    )
  }
}

class AddFlightButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addNewFlight();
  }

  render() {
    return (
      <RaisedButton
        label="Add flight"
        labelPosition="before"
        backgroundColor="#B46012"
        icon={<ActionFlightTakeoffIcon />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderFlights = ({ fields, change, meta: { touched, error, submitFailed } }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((flight, index) =>
        <li key={index}>
          <strong>Flight #{index + 1}</strong>
          <IconButton
            tooltip="Remove flight"
            onClick={() => fields.remove(index)}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <FlightTimeStartPicker fieldName={`${flight}.Start`} />
          <FlightTimeEndPicker fieldName={`${flight}.End`} />
          <Location
            fieldLatName={`${flight}.Latitude`}
            fieldLonName={`${flight}.Longitude`}
            change={change}
          />
          <br />
        </li>
      )}
    </ul>
    <AddFlightButton addNewFlight={() => fields.push({})} />
    {(touched || submitFailed) && error && <p><span className="error-msg">{error}</span></p>}
  </div>
);

class FlightTimeStartPicker extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TimePicker}
        format={null}
        floatingLabelText="Start of flight time"
      />
    )
  }
}

class FlightTimeEndPicker extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TimePicker}
        format={null}
        floatingLabelText="End of flight time"
      />
    )
  }
}

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    locationUtil.clientLocation()
      .then(coords => {
        this.props.change(this.props.fieldLatName, coords.latitude.toFixed(3));
        this.props.change(this.props.fieldLonName, coords.longitude.toFixed(3));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <LogbookTextField fieldName={this.props.fieldLatName} fieldLabel="Latitude" />
        <LogbookTextField fieldName={this.props.fieldLonName} fieldLabel="Longitude" />
        <RaisedButton
          onClick={this.handleClick}
          label="My location"
          labelPosition="before"
          icon={<MyLocationIcon />}
        />
      </div>
    )
  }
}

class General extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="General" />
        <CardText>
          <FlightDatePicker />
          <FieldArray name={`${PAGE_NAME}Flights`} component={renderFlights} change={this.props.change} />
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
})(General);
