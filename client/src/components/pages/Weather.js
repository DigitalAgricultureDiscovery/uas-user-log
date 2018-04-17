import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
}                             from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton           from 'material-ui/RaisedButton';
import Subheader              from 'material-ui/Subheader';

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
}

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

class NoFlightWarningText extends React.Component {
  render() {
    return (
      <p>
        Unable to automatically populate forecast. Please add a flight
        before proceeding with this page or enter a location below.
      </p>
    )
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
        <RaisedButton
          label="Update forecast"
          onClick={this.handleClick}
        />
      </div>
    )
  }
}

class CurrentCard extends React.Component {
  render() {
    const currentData = this.props.currentData;
    const todaysForecast = this.props.forecastData;
    return (
      <Card style={{backgroundColor: '#E7F4F5'}}>
        <CardHeader
          title={this.props.locationName}
          subtitle={<div><span style={{color: "red"}}>{todaysForecast.maxtemp_f}&#176;</span> | <span style={{color: "blue"}}>{todaysForecast.mintemp_f}&#176;</span> F</div>}
          avatar={currentData.condition.icon}
        />
        <CardMedia style={{textAlign: 'center'}}>
          <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10, gridAutoRows: "minmax(25px, auto)"}}>
            <h2>
              <div style={{color: "#085C11", gridColumn: 1, gridRow: 1}}>Current {currentData.temp_f}&#176; F</div>
              <div style={{color: "#849E2A", gridColumn: 1, gridRow: 2}}>Feels like {currentData.feelslike_f}&#176; F</div>
            </h2>
            <h4>
              <div style={{gridColumn: 2, gridRow: "1/2", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 10, gridAutoRows: "minmax(25px, auto)", textAlign: "left"}}>
                <div style={{gridColumn: 1, gridRow: 1}}>Wind:</div>
                <div style={{gridColumn: "2/4", gridRow: 1}}>{currentData.wind_dir} {currentData.wind_degree}&#176; {currentData.wind_mph} mph</div>
                <div style={{gridColumn: 1, gridRow: 2}}>Cloud:</div>
                <div style={{gridColumn: 2, gridRow: 2}}>{currentData.cloud}%</div>
                <div style={{gridColumn: 3, gridRow: 2}}>Visibility:</div>
                <div style={{gridColumn: 4, gridRow: 2}}>{currentData.vis_miles} miles</div>
                <div style={{gridColumn: 1, gridRow: 3}}>Humidity:</div>
                <div style={{gridColumn: 2, gridRow: 3}}>{currentData.humidity}%</div>
                <div style={{gridColumn: 3, gridRow: 3}}>Pressure:</div>
                <div style={{gridColumn: 4, gridRow: 3}}>{currentData.pressure_in} in</div>
              </div>
            </h4>
          </div>
        </CardMedia>
      </Card>
    )
  }
}

const renderForecastGridTiles = (forecastTileData) => (
  <GridList style={styles.gridList} cols={2} padding={0}>
    {forecastTileData.map((tile, i) => (
      <GridTile
        key={i}
        title={tile.title}
        titleStyle={styles.titleStyle}
        titleBackground="none"
        style={styles.gridTile}
      >
        <div style={{minWidth: 100, textAlign: "center"}}>
          <span style={{color: "red"}}>{tile.htemp}&#176;</span> | <span style={{color: "blue"}}>{tile.ltemp}&#176;</span> F<br />
          <img src={tile.img} alt={tile.condition} /><br />
          <span style={{fontSize: 10}}>{tile.condition}</span>
        </div>
      </GridTile>
    ))}
  </GridList>
)

class ForecastTable extends React.Component {
  formatData(forecastData) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let tilesData = [];
    const skipFirstDay = this.props.isSpray;
    forecastData.forEach(function(row, i) {
      if (skipFirstDay) {
        if (i > 0) {
          tilesData.push({
            img: row.day.condition.icon,
            title: days[new Date(row.date).getUTCDay()] + ' ' + (new Date(row.date).getUTCMonth() + 1).toString() + '/' + new Date(row.date).getUTCDate().toString(),
            condition: row.day.condition.text,
            htemp: row.day.maxtemp_f,
            ltemp: row.day.mintemp_f,
            humid: row.day.avghumidity,
            vis: row.day.avgvis_miles,
            wind: row.day.maxwind_mph,
          });
        }
      } else {
        tilesData.push({
          img: row.day.condition.icon,
          title: days[new Date(row.date).getUTCDay()] + ' ' + (new Date(row.date).getUTCMonth() + 1).toString() + '/' + new Date(row.date).getUTCDate().toString(),
          condition: row.day.condition.text,
          htemp: row.day.maxtemp_f,
          ltemp: row.day.mintemp_f,
          humid: row.day.avghumidity,
          vis: row.day.avgvis_miles,
          wind: row.day.maxwind_mph,
        });
      }
    });
    return tilesData;
  }

  render() {
    const forecastData = this.formatData(this.props.forecastData);
    return (
      <div style={styles.root}>
        <Subheader>7-Day forecast</Subheader>
        {renderForecastGridTiles(forecastData)}
      </div>
    )
  }
}

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: [],
      forecastData: [],
      locationName: '',
      error: null,
    }
  }

  callFetchWeatherData = (location) => {
    this.setState({error: null});
    fetchWeatherData(location)
      .then(weatherData => {
        this.setState({currentData: weatherData.current});
        this.setState({forecastData: weatherData.forecast.forecastday});
        this.setState({locationName: weatherData.location.name + ', ' + weatherData.location.region})
      })
      .catch(err => {
        this.setState({error: err.message});
      });
  }

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
    if (this.state.currentData && this.state.forecastData.length > 0) {
      return (
        <div>
          {this.props.isSpray &&
            <div>
              <CurrentCard
                currentData={this.state.currentData}
                forecastData={this.state.forecastData[0].day}
                locationName={this.state.locationName}
              />
              <br />
            </div>
          }
          <div>
            <ForecastTable
              forecastData={this.state.forecastData}
              locationName={this.state.locationName}
              isSpray={this.props.isSpray}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {this.state.error ? <p><span className="error-msg">Unable to retrieve forecast.</span></p> : null}
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
    }
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentWillMount() {
    if (this.props.currentFlights !== undefined) {
      this.setState({
        location: this.props.currentFlights[0]['Latitude'].toString() + ',' + this.props.currentFlights[0]['Longitude'].toString()
      });
    }
  }

  componentDidMount() {
    this.props.trackPage('Weather');
  }

  updateLocation(location) {
    this.setState({location: location});
  }

  render() {
    const { handleSubmit, previousPage, currentFlights, currentLocation, isSpray } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Weather" />
        <CardText>
          {currentFlights === undefined && this.state.location === '' ? <NoFlightWarningText /> : null}
          <br />
          <UpdateLocation updateLocation={this.updateLocation} currentLocation={currentLocation} />
          <br />
          <WeatherDisplay location={this.state.location} isSpray={isSpray} />
          <LogbookTextField fieldName={`${PAGE_NAME}Note`} fieldLabel="Note" />
        </CardText>
        <CardActions>
          <PrevButton onClick={previousPage} />
          <NextButton />
        </CardActions>
      </form>
    )
  }
}

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Weather);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentFlights = selector(state, 'general_Flights');
    const currentLocation = selector(state, 'weather_Location');
    const isSpray = (selector(state, 'planning_Type') === 3 ? true : false);
    return {
      currentFlights,
      currentLocation,
      isSpray,
    }
  }
)(myReduxForm);
