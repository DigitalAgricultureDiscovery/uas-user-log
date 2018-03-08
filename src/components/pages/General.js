import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import MyLocation              from 'material-ui/svg-icons/maps/my-location';
import FlatButton              from 'material-ui/FlatButton';
import RaisedButton            from 'material-ui/RaisedButton';
import { DatePicker, TextField, TimePicker } from 'redux-form-material-ui';
import validate from './utils/validate';
import locationUtil from './utils/location';

class FlightDatePicker extends React.Component {
  render() {
    return (
      <Field
        name="flightDatePicker"
        component={DatePicker}
        format={null}
        floatingLabelText="Date of flight"
      />
    )
  }
}

class FlightTimeStartPicker extends React.Component {
  render() {
    return (
      <Field
        name="flightTimeStartPicker"
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
        name="flightTimeEndPicker"
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
        this.props.change('latitudeText', coords.latitude);
        this.props.change('longitudeText', coords.longitude);
      })
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      button: {
        margin: 12,
      },
    };
    return (
      <div>
        <Field
          name="latitudeText"
          component={TextField}
          floatingLabelText="Latitude"
        />
        <Field
          name="longitudeText"
          component={TextField}
          floatingLabelText="Longitude"
        />
        <RaisedButton
          onClick={this.handleClick}
          label="My location"
          labelPosition="before"
          backgroundColor="#a4c639"
          icon={<MyLocation />}
          style={styles.button}
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
          <FlightTimeStartPicker />
          <FlightTimeEndPicker />
          <Location change={this.props.change}/>
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
