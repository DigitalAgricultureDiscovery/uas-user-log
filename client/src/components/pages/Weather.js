import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText }           from 'material-ui/Card';
import { GridList, GridTile }                         from 'material-ui/GridList';
import FlatButton                                     from 'material-ui/FlatButton';
import RaisedButton                                   from 'material-ui/RaisedButton';
import Subheader                                      from 'material-ui/Subheader';
import TextField                                      from 'material-ui/TextField';

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

async function fetchForecast(location) {
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

class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: [],
      locationName: '',
    }
    this.callFetchForecast = this.callFetchForecast.bind(this);
  }

  callFetchForecast = (location) => {
    fetchForecast(location)
      .then(forecastData => {
        this.setState({forecastData: forecastData.forecast.forecastday});
        this.setState({locationName: forecastData.location.name + ', ' + forecastData.location.region})
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  componentDidMount() {
    if (this.props.location) {
      this.callFetchForecast(this.props.location);
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.location) {
      this.callFetchForecast(nextProps.location);
    }
  }

  createForecastTiles(forecastData) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let tilesData = [];
    forecastData.forEach(function(row, i) {
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
    });
    return tilesData;
  }

  render() {
    if (this.state.forecastData) {
      const tilesData = this.createForecastTiles(this.state.forecastData);

      return (
        <div style={styles.root}>
          {tilesData.length > 0 ? <Subheader>{this.state.locationName}</Subheader> : null}
          <GridList style={styles.gridList} cols={2} padding={0}>
            {tilesData.map((tile, i) => (
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
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

class APIXUWidget extends React.Component {
  render() {
    return (
      <div>
        <div id="apixu-weather-widget-3"></div>
        <script type='text/javascript' src='https://www.apixu.com/weather/widget.ashx?loc=2571073&wid=3&tu=2&div=apixu-weather-widget-3' async></script>
      </div>
    )
  }
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
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
    const { handleSubmit, previousPage, currentFlights } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Weather" />
        <CardText>
          {currentFlights === undefined && this.state.location === '' ? <NoFlightWarningText /> : null}
          <br />
          <UpdateLocation updateLocation={this.updateLocation} />
          <APIXUWidget />
          <br />
          <WeatherTable location={this.state.location} />
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
    return {
      currentFlights
    }
  }
)(myReduxForm);
