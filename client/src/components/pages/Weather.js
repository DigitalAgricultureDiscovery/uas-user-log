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
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

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
          hintText="Lat,Lon (e.g., 40.4258,-86.9081"
          style={UNIT_STYLE}
        />
        <RaisedButton label="Update location" onClick={this.handleClick} />
      </div>
    );
  }
}

class CurrentCard extends React.Component {
  render() {
    const weather = this.props.currentWeather.periods[0];
    const updateTime =
      this.props.currentWeather.updateTime.split('T')[0] +
      this.props.currentWeather.updateTime.split('T')[1].split('+')[0];

    return (
      <Card style={{ backgroundColor: '#E7F4F5' }}>
        <CardHeader
          title={this.props.locationName}
          subtitle={`Last updated: ${updateTime}`}
          avatar={weather.icon}
        />
        <CardText>
          <div
            style={{
              color: '#085C11',
              gridColumn: 1,
              gridRow: 1,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {weather.temperature} &#176;{weather.temperatureUnit}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}
          >
            <div>{weather.detailedForecast} in</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div>
              <strong>Current wind conditions:</strong> {weather.windSpeed}{' '}
              {weather.windDirection}
            </div>
            <div></div>
          </div>
        </CardText>
      </Card>
    );
  }
}

const renderForecastGridTiles = (forecastTileData) => (
  <GridList style={styles.gridList} cols={2} padding={0} cellHeight={215}>
    {forecastTileData.map((tile, i) => (
      <GridTile
        key={i}
        title={tile.title}
        titleStyle={styles.titleStyle}
        titleBackground="none"
        style={styles.gridTile}
      >
        <div style={{ minWidth: 100, textAlign: 'center' }}>
          <span style={{ display: 'block', marginBottom: 5 }}>{tile.temp}</span>
          <span style={{ display: 'block', marginBottom: 5 }}>{tile.wind}</span>
          <img
            src={tile.img}
            alt={tile.detailedForecast}
            title={tile.detailedForecast}
          />
          <br />
          <span style={{ fontSize: 10 }}>{tile.condition}</span>
          <br />
        </div>
      </GridTile>
    ))}
  </GridList>
);

class ForecastTable extends React.Component {
  formatData(forecastData) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let tilesData = [];

    forecastData.forEach(function (day, i) {
      if (day.isDaytime) {
        tilesData.push({
          img: day.icon,
          title:
            days[new Date(day.startTime).getUTCDay()] +
            ' ' +
            (new Date(day.startTime).getUTCMonth() + 1) +
            '/' +
            new Date(day.startTime).getUTCDate().toString(),
          condition: day.shortForecast,
          detailedForecast: day.detailedForecast,
          temp: `${day.temperature} ${day.temperatureUnit}`,
          tempTrend: day.temperatureTrend,
          wind: day.windSpeed + ' ' + day.windDirection,
        });
      }
    });
    return tilesData;
  }

  render() {
    const forecastData = this.formatData(this.props.forecastData);
    return (
      <div style={styles.root}>
        <Subheader>Upcoming weather</Subheader>
        {renderForecastGridTiles(forecastData)}
      </div>
    );
  }
}

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: null,
      forecastData: null,
      error: null,
    };
  }

  callFetchWeatherData = (location) => {
    this.setState({ error: null });
    fetchWeatherData(location)
      .then((data) => {
        this.setState({ currentWeather: data.properties });
        this.setState({ forecastData: data.properties.periods.slice(2) }); // skip today
        this.setState({ locationName: data.location });
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
    if (this.state.currentWeather && this.state.forecastData) {
      return (
        <div>
          <div>
            <CurrentCard
              currentWeather={this.state.currentWeather}
              locationName={this.state.locationName}
            />
            <br />
          </div>
          <div>
            <ForecastTable
              forecastData={this.state.forecastData}
              locationName={this.state.locationName}
            />
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
