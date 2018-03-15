import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText }           from 'material-ui/Card';
import FlatButton                                     from 'material-ui/FlatButton';
import RaisedButton                                   from 'material-ui/RaisedButton';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import validate from '../helpers/validate';

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
        this.setState({forecastData: forecastData.forecast.forecastday});
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  render() {
    const forecastData = this.state.forecastData;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <Table>
        <TableBody displayRowCheckbox={false} style={{fontSize: 10}}>
          <TableRow>
            {forecastData.map((row, i) =>
              <TableRowColumn key={i}>
                {days[new Date(row.date).getUTCDay()] + ' ' + (new Date(row.date).getMonth() + 1).toString() + '/' + new Date(row.date).getDate().toString()}
              </TableRowColumn>
            )}
          </TableRow>
          <TableRow>
            {forecastData.map((row, i) =>
              <TableRowColumn key={i} style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>
                <div>
                  <span><img src={row.day.condition.icon} alt={row.day.condition.text + ' logo'} /></span>
                </div>
                <p>
                  <span>Temp. {row.day.avgtemp_f} F</span><br />
                  <span>Hum. {row.day.avgtemp_f}%</span><br />
                  <span>Vis. {row.day.avgvis_miles} mi</span>
                </p>
                <p>
                  <span>{row.day.condition.text}</span>
                </p>
              </TableRowColumn>
            )}
          </TableRow>
        </TableBody>
      </Table>
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
