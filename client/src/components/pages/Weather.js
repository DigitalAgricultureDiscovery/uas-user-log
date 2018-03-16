import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { TextField }                                  from 'redux-form-material-ui';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
}                                                     from 'material-ui/Card';
import { GridList, GridTile }                         from 'material-ui/GridList';
import FlatButton                                     from 'material-ui/FlatButton';
import RaisedButton                                   from 'material-ui/RaisedButton';
import Subheader                                      from 'material-ui/Subheader';

import validate from '../helpers/validate';

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
  const response = await fetch('/api?location=' + location);
  const data = await response.json();
  return data;
}

class UpdateLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    this.props.updateLocation(this.state.value);
  }

  render() {
    return (
      <div>
        <TextField
          name="locationText"
          hintText="Lat,Lon; US zip; UK postcode, etc."
          floatingLabelText="Enter location"
          onChange={this.handleChange}
          value={this.state.value}
          style={{marginRight: 15}}
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
    console.log('todaysForecast', todaysForecast);
    return (
      <Card>
        <CardHeader
          title={this.props.locationName}
          subtitle="Current Weather"
          avatar={currentData.condition.icon}
        />
        <CardMedia style={{textAlign: "center"}}>
          <h1 style={{color: "#085C11"}}>Current temp: {currentData.temp_f}&#176; F</h1>
          <h2 style={{color: "#849E2A"}}>Feels like: {currentData.feelslike_f}&#176; F</h2>
        </CardMedia>
        <CardTitle
          title={currentData.condition.text}
          subtitle={<div><span style={{color: "red"}}>{todaysForecast.maxtemp_f}&#176;</span> | <span style={{color: "blue"}}>{todaysForecast.mintemp_f}&#176;</span> F</div>}
        />
        <CardText>

        </CardText>
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
    forecastData.forEach(function(row, i) {
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
    });
    return tilesData;
  }

  render() {
    const forecastData = this.formatData(this.props.forecastData);
    return (
      <div style={styles.root}>
        <Subheader>Upcoming forecast</Subheader>
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
    }
  }

  callFetchWeatherData = (location) => {
    fetchWeatherData(location)
      .then(weatherData => {
        this.setState({currentData: weatherData.current});
        this.setState({forecastData: weatherData.forecast.forecastday});
        this.setState({locationName: weatherData.location.name + ', ' + weatherData.location.region})
      })
      .catch(error => {
        console.log(error.message);
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
            />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

class NoteText extends React.Component {
  render() {
    return (
      <Field
        name="noteText"
        component={TextField}
        floatingLabelText="Note"
      />
    )
  }
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      'isSpray': '',
    }
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentWillMount() {
    if (this.props.currentFlights !== undefined) {
      this.setState({
        location: this.props.currentFlights[0].flightLatLocation.toString() + ',' + this.props.currentFlights[0].flightLonLocation.toString()
      });
    }
  }

  updateLocation(location) {
    this.setState({location: location});
  }

  render() {
    const { handleSubmit, previousPage, currentFlights, isSpray } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Weather" />
        <CardText>
          {currentFlights === undefined && this.state.location === '' ? <NoFlightWarningText /> : null}
          <br />
          <UpdateLocation updateLocation={this.updateLocation} />
          <br />
          <WeatherDisplay location={this.state.location} isSpray={isSpray} />
          <br />
          <NoteText />
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

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Weather);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentFlights = selector(state, 'flights');
    const isSpray = (selector(state, 'typeSelect') === 3 ? true : false);
    return {
      currentFlights,
      isSpray,
    }
  }
)(myReduxForm);
