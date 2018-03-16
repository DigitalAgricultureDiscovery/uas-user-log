import React from 'react';
import PropTypes from 'prop-types';
// material-ui elements
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme                  from 'material-ui/styles/getMuiTheme';
import Card                         from 'material-ui/Card';
import LinearProgress               from 'material-ui/LinearProgress';
// form pages
import Welcome          from './pages/Welcome';          // page 1
import Mission          from './pages/Mission';          // page 2
import Crop             from './pages/Crop';             // page 3
import General          from './pages/General';          // page 4
import Team             from './pages/Team';             // page 5
import Hardware         from './pages/Hardware';         // page 6
import Battery          from './pages/Battery';          // page 7
import FlightOperation  from './pages/FlightOperation';  // page 8
import DataCollection   from './pages/DataCollection';   // page 9
import B4UFLY           from './pages/B4UFLY';           // page 10
import Obstacles        from './pages/Obstacles';        // page 11
import People           from './pages/People';           // page 12
import FlightParameters from './pages/FlightParameters'; // page 13
import Weather          from './pages/Weather';          // page 14
import Finish           from './pages/Finish';           // page 15

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: "#AD1F65",
    pickerHeaderColor: "#4D4038",
    primary1Color: "#C28E0E",
    primary2Color: "#916A0A"
  },
});

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.completed > 15) {
      this.setState({completed: 15});
    } else {
      this.setState({completed: nextProps.value});
    }
  }

  render() {
    return (
      <LinearProgress
        mode="determinate"
        max={15}
        color="#C28E0E"
        value={this.state.completed}
      />
    );
  }
}

class LogbookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  nextPage() {
    this.setState({pageIndex: this.state.pageIndex + 1});
  };

  previousPage() {
    this.setState({pageIndex: this.state.pageIndex - 1});
  };

  render() {
    const { onSubmit } = this.props;
    const { pageIndex } = this.state;
    const contentStyle = { margin: '0 16px' };
    const divStyle = {
      width: '100%',
      maxWidth: 700,
      margin: 'auto'
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={ divStyle }>
          <br />
          <div style={ contentStyle }>
            <Card>
              { pageIndex === 0 && <Welcome onSubmit={this.nextPage} /> }
              { pageIndex === 1 && (
                <Mission
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                />
              )}
              { pageIndex === 2 && (
                <Crop
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 3 && (
                <General
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 4 && (
                <Team
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 5 && (
                <Hardware
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 6 && (
                <Battery
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 7 && (
                <FlightOperation
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 8 && (
                <DataCollection
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 9 && (
                <B4UFLY
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 10 && (
                <Obstacles
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 11 && (
                <People
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 12 && (
                <FlightParameters
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 13 && (
                <Weather
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 14 && (
                <Finish
                  previousPage={ this.previousPage }
                  onSubmit={ onSubmit }
                />
              )}
              <ProgressBar value={pageIndex} />
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

LogbookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default LogbookForm;
