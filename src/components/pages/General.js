import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
// material-ui elements
import { DatePicker, TextField, TimePicker } from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText }  from 'material-ui/Card';
import Divider                               from 'material-ui/Divider';
import FlatButton                            from 'material-ui/FlatButton';
import IconButton                            from 'material-ui/IconButton';
import RaisedButton                          from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
}                                            from 'material-ui/Table';
// material-ui icons
import ActionFlightTakeoffIcon from 'material-ui/svg-icons/action/flight-takeoff';
import DeleteForeverIcon       from 'material-ui/svg-icons/action/delete-forever';
import MyLocationIcon          from 'material-ui/svg-icons/maps/my-location';
import SaveIcon                from 'material-ui/svg-icons/content/save';
// material-ui colors
import {red500, lightGreen500} from 'material-ui/styles/colors';

import validate from './utils/validate';
import locationUtil from './utils/location';

class FlightDatePicker extends React.Component {
  render() {
    return (
      <Field
        name="flightDatePicker"
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
        label="Add Flight"
        labelPosition="before"
        backgroundColor={lightGreen500}
        icon={<ActionFlightTakeoffIcon />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderFlights = ({ fields, change }) => (
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
          <FlightTimeStartPicker fieldName={`${flight}.flightTimeStart`} />
          <FlightTimeEndPicker fieldName={`${flight}.flightTimeEnd`} />
          <Location
            fieldLatName={`${flight}.flightLatLocation`}
            fieldLonName={`${flight}.flightLonLocation`}
            change={change}
          />
          <br />
        </li>
      )}
    </ul>
    <AddFlightButton addNewFlight={() => fields.push({})} />
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
        this.props.change(this.props.fieldLatName, coords.latitude);
        this.props.change(this.props.fieldLonName, coords.longitude);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Field
          name={this.props.fieldLatName}
          component={TextField}
          floatingLabelText="Latitude"
        />
        <br />
        <Field
          name={this.props.fieldLonName}
          component={TextField}
          floatingLabelText="Longitude"
        />
        <br />
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

class FlightTable extends React.Component {
  render() {
    const flightData = [
      {id: 1, start: '9:00', end: '9:35', location: '45, 82'},
      {id: 2, start: '1:30', end: '2:15', location: '45, 83'},
      {id: 3, start: '3:00', end: '3:45', location: '44, 83'},
    ];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Start time</TableHeaderColumn>
            <TableHeaderColumn>End time</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flightData.map((row, i) =>
            <TableRow key={row.id}>
              <TableRowColumn>{row.start}</TableRowColumn>
              <TableRowColumn>{row.end}</TableRowColumn>
              <TableRowColumn>{row.location}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
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
          <FieldArray name="flights" component={renderFlights} change={this.props.change} />
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
})(General);
