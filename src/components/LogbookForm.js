import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';
import { Card }        from 'material-ui/Card';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import Welcome         from './pages/Welcome';          // page 1
import Mission         from './pages/Mission';          // page 2
import Crop            from './pages/Crop';             // page 3
import General         from './pages/General';          // page 4
import Team            from './pages/Team';             // page 5
import Hardware        from './pages/Hardware';         // page 6
import Battery         from './pages/Battery'           // page 7
import FlightOperation from './pages/FlightOperation'   // page 8
import DataCollection  from './pages/DataCollection'    // page 9
import Finish          from './pages/Finish';           // page 10

class LogbookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
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
      <MuiThemeProvider>
        <div style={ divStyle }>
          {/* <Stepper activeStep={ pageIndex - 1 }>
            <Step>
              <StepLabel>Welcome</StepLabel>
            </Step>
            <Step>
              <StepLabel>Mission</StepLabel>
            </Step>
            <Step>
              <StepLabel>Crop</StepLabel>
            </Step>
            <Step>
              <StepLabel>General</StepLabel>
            </Step>
            <Step>
              <StepLabel>Team</StepLabel>
            </Step>
            <Step>
              <StepLabel>Hardware</StepLabel>
            </Step>
            <Step>
              <StepLabel>Battery</StepLabel>
            </Step>
            <Step>
              <StepLabel>Flight Operation</StepLabel>
            </Step>
            <Step>
              <StepLabel>Finish</StepLabel>
            </Step>
          </Stepper> */}
          <br />
          <div style={ contentStyle }>
            <Card>
              { pageIndex === 1 && <Welcome onSubmit={this.nextPage} /> }
              { pageIndex === 2 && (
                <Mission
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                />
              )}
              { pageIndex === 3 && (
                <Crop
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 4 && (
                <General
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 5 && (
                <Team
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 6 && (
                <Hardware
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 7 && (
                <Battery
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 8 && (
                <FlightOperation
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 9 && (
                <DataCollection
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { pageIndex === 10 && (
                <Finish
                  previousPage={ this.previousPage }
                  onSubmit={ onSubmit }
                />
              )}
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
