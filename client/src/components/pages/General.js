import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
// material-ui elements
import { CardActions, CardTitle, CardText }  from 'material-ui/Card';
import IconButton                            from 'material-ui/IconButton';
import RaisedButton                          from 'material-ui/RaisedButton';
import Subheader                             from 'material-ui/Subheader';
// material-ui icons
import ActionFlightTakeoffIcon from 'material-ui/svg-icons/action/flight-takeoff';
import DeleteForeverIcon       from 'material-ui/svg-icons/action/delete-forever';
import MyLocationIcon          from 'material-ui/svg-icons/maps/my-location';
// material-ui colors
import {red500} from 'material-ui/styles/colors';
// helpers
import LogbookTextField           from '../helpers/LogbookTextField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate                   from '../helpers/validate';
import locationUtil               from '../helpers/location';

const PAGE_NAME = 'general_';

const STYLES = {
  shortField: {
    marginRight: 10,
    width: 123,
  },
  subheader: {
    paddingLeft: 0,
    marginTop: 15,
  },
};

class FlightDatePicker extends React.Component {
  render() {
    return (
      <Field
        name={`${PAGE_NAME}FlightDate`}
        className={this.props.required ? "required" : null}
        component={TextField}
        type="date"
        floatingLabelText="Date of flight(s)"
        floatingLabelFixed={true}
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
          {index === 0 ? <Subheader style={STYLES.subheader}>Format - HH:MM AM/PM. E.g. 04:30 PM</Subheader> : null}
          <FlightTimeStartPicker fieldName={`${flight}.Start`} required={true} />
          <FlightTimeEndPicker fieldName={`${flight}.End`} required={true} />
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
        className={this.props.required ? "required" : null}
        component={TextField}
        type="time"
        floatingLabelText="Start of flight time"
        floatingLabelFixed={true}
        style={{display: 'block'}}
        defaultValue="16:00"
      />
    )
  }
}

class FlightTimeEndPicker extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        className={this.props.required ? "required" : null}
        component={TextField}
        type="time"
        floatingLabelText="End of flight time"
        floatingLabelFixed={true}
        style={{display: 'block'}}
        defaultValue="17:30"
      />
    )
  }
}

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({error: null});
    locationUtil.clientLocation()
      .then(coords => {
        this.props.change(this.props.fieldLatName, coords.latitude.toFixed(3));
        this.props.change(this.props.fieldLonName, coords.longitude.toFixed(3));
      })
      .catch(err => {
        this.setState({error: err.message});
      });
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={this.props.fieldLatName}
            fieldLabel="Latitude"
            required={true}
            style={STYLES.shortField}
          />
          <LogbookTextField
            fieldName={this.props.fieldLonName}
            fieldLabel="Longitude"
            required={true}
            style={STYLES.shortField}
          />
        </div>
        {this.state.error ? <p><span className="error-msg">Unable to retrieve location.</span></p> : null}
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
  componentDidMount() {
    this.props.trackPage('General');
  }

  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="General" />
        <CardText>
          <FlightDatePicker required={true} />
          <FieldArray name={`${PAGE_NAME}Flights`} component={renderFlights} change={this.props.change} />
        </CardText>
        <CardActions>
          <PrevButton onClick={previousPage} />
          <NextButton />
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
