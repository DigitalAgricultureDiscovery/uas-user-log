import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import LogbookTextField from '../helpers/LogbookTextField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate from '../helpers/validate';

const PAGE_NAME = 'weather_';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  gridTile: {
    // border: '1px solid rgba(0, 0, 0, 0.54)',
  },
  titleStyle: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
};

const UNIT_STYLE = {
  display: 'inline-block',
  marginRight: 15,
};

class NoFlightWarningText extends React.Component {
  render() {
    return (
      <p>
        Unable to automatically populate forecast. Please add a flight before
        proceeding with this page or enter a location below.
      </p>
    );
  }
}

async function fetchWeatherData(location) {
  const response = await fetch('/api/weather?location=' + location);
  const data = await response.json();
  return data;
}

class UpdateLocation extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.currentLocation) {
      this.props.updateLocation(this.props.currentLocation);
    }
  }

  handleClick(event) {
    if (this.props.currentLocation) {
      this.props.updateLocation(this.props.currentLocation);
    }
  }

  render() {
    return (
      <div>
        <LogbookTextField
          fieldName={`${PAGE_NAME}Location`}
          fieldLabel="Location"
          hintText="Lat,Lon; US zip; UK postcode, etc."
          style={UNIT_STYLE}
        />
        <RaisedButton label="Update location" onClick={this.handleClick} />
      </div>
    );
  }
}

class CurrentCard extends React.Component {
  render() {
    const weather = this.props.currentWeather;
    return (
      <Card style={{ backgroundColor: '#E7F4F5' }}>
        <CardHeader
          title={`${weather.location.name}, ${weather.location.region}`}
          subtitle={weather.current.observation_time}
          avatar={weather.current.weather_icons[0]}
        />
        <CardText>
          <p>
            <div
              style={{
                color: '#085C11',
                gridColumn: 1,
                gridRow: 1,
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {weather.current.temperature}&#176; F
            </div>
            <div
              style={{
                color: '#849E2A',
                gridColumn: 1,
                gridRow: 2,
                fontSize: 14,
                fontWeight: 550,
              }}
            >
              <em>Feels like {weather.current.feelslike}&#176; F</em>
            </div>
          </p>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Wind:</strong>
              </div>
              <div>
                {weather.current.wind_speed} mph {weather.current.wind_dir}{' '}
                {weather.current.wind_degree}&#176;
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Precipitation:</strong>
              </div>
              <div>{weather.current.precip} in</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Cloud cover:</strong>
              </div>
              <div>{weather.current.cloudcover}%</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Visibility:</strong>
              </div>
              <div>{weather.current.visibility} miles</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Humidity:</strong>
              </div>
              <div>{weather.current.humidity}%</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Pressure:</strong>
              </div>
              <div>{weather.current.pressure} mb</div>
            </div>
          </p>
        </CardText>
      </Card>
    );
  }
}

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: null,
      error: null,
    };
  }

  callFetchWeatherData = (location) => {
    this.setState({ error: null });
    fetchWeatherData(location)
      .then((data) => {
        this.setState({ currentWeather: data });
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  componentDidMount() {
    if (this.props.location) {
      this.callFetchWeatherData(this.props.location);
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.location) {
      this.callFetchWeatherData(nextProps.location);
    }
  }

  render() {
    if (this.state.currentWeather) {
      return (
        <div>
          <div>
            <CurrentCard currentWeather={this.state.currentWeather} />
            <br />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.error ? (
            <p>
              <span className="error-msg">Unable to retrieve forecast.</span>
            </p>
          ) : null}
        </div>
      );
    }
  }
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      isSpray: '',
      forecast: {},
    };
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentWillMount() {
    if (this.props.currentFlights !== undefined) {
      this.setState({
        location:
          this.props.currentFlights[0]['Latitude'].toString() +
          ',' +
          this.props.currentFlights[0]['Longitude'].toString(),
      });
    }
  }

  componentDidMount() {
    this.props.trackPage('Weather');
  }

  updateLocation(location) {
    this.setState({ location: location });
  }

  render() {
    const {
      handleSubmit,
      previousPage,
      currentFlights,
      currentLocation,
      isSpray,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Weather" />
        <CardText>
          {currentFlights === undefined && this.state.location === '' ? (
            <NoFlightWarningText />
          ) : null}
          <br />
          <UpdateLocation
            updateLocation={this.updateLocation}
            currentLocation={currentLocation}
          />
          <br />
          <WeatherDisplay location={this.state.location} isSpray={isSpray} />
          <LogbookTextField fieldName={`${PAGE_NAME}Note`} fieldLabel="Note" />
        </CardText>
        <CardActions>
          <PrevButton onClick={previousPage} />
          <NextButton />
        </CardActions>
      </form>
    );
  }
}

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Weather);

const selector = formValueSelector('logbook');
export default connect((state) => {
  const currentFlights = selector(state, 'general_Flights');
  const currentLocation = selector(state, 'weather_Location');
  const isSpray = selector(state, 'planning_Type') === 3 ? true : false;
  return {
    currentFlights,
    currentLocation,
    isSpray,
  };
})(myReduxForm);
