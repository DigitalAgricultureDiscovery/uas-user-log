import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText }           from 'material-ui/Card';
import { GridList, GridTile }                         from 'material-ui/GridList';
import FlatButton                                     from 'material-ui/FlatButton';
import RaisedButton                                   from 'material-ui/RaisedButton';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

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
  titleStyle: {
    color: '#FFFFFF',
  },
}

class NoFlightWarningText extends React.Component {
  render() {
    return (
      <p>
        Unable to automatically populate forecast. Please add a flight
        before proceeding with this page.
      </p>
    )
  }
}

async function fetchForecast(location) {
  const response = await fetch('/api?location=' + location);
  const data = await response.json();
  return data;
}

class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: [],
    }
  }

  componentDidMount() {
    fetchForecast(this.props.currentFlights[0].flightLatLocation.toString() + ',' + this.props.currentFlights[0].flightLonLocation.toString())
      .then(forecastData => {
        console.log(forecastData);
        this.setState({forecastData: forecastData.forecast.forecastday});
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  createForecastTiles(forecastData) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let tilesData = [];
    forecastData.map((row, i) => {
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
    const forecastData = this.state.forecastData;
    const tilesData = this.createForecastTiles(forecastData);

    return (
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2.2}>
          {tilesData.map((tile, i) => (
            <GridTile
              key={i}
              title={tile.title}
              titleStyle={styles.titleStyle}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
              <div style={{minWidth: 100}}>
                <span style={{color: "red"}}>{tile.htemp}</span> | <span style={{color: "blue"}}>{tile.ltemp}&#8457;</span><br />
                <img src={tile.img} alt={tile.condition} /><br />
                <span>{tile.condition}</span>
                <br />
                <span>{tile.wind}mph</span>
              </div>
            </GridTile>
          ))}
        </GridList>
      </div>
    )
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
  render() {
    const { handleSubmit, previousPage, currentFlights } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Weather" />
        <CardText>
          <APIXUWidget />
          {currentFlights ? <WeatherTable currentFlights={currentFlights} /> : <NoFlightWarningText />}
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
