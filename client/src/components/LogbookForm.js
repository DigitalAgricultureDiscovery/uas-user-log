import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { ServiceWorkerStatuses } from '../actions';
import { ServiceWorkerRegistered, ServiceWorkerUpdated, ServiceWorkerError } from './helpers/ServiceWorkerNotifications';
// material-ui elements
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme                  from 'material-ui/styles/getMuiTheme';
import Card                         from 'material-ui/Card';
import LinearProgress               from 'material-ui/LinearProgress';
import {
  Step,
  Stepper,
  StepButton,
}                                   from 'material-ui/Stepper';
// form pages
import Welcome          from './pages/Welcome';          // page 1
import Planning         from './pages/Planning';         // page 2
import Crop             from './pages/Crop';             // page 3
import General          from './pages/General';          // page 4
import Team             from './pages/Team';             // page 5
import Hardware         from './pages/Hardware';         // page 6
import Battery          from './pages/Battery';          // page 7
import FlightOperation  from './pages/FlightOperation';  // page 8
import DataCollectionResearch from './pages/DataCollectionResearch';   // page 9
import DataCollectionSpray from './pages/DataCollectionSpray';         // page 10
import B4UFLY           from './pages/B4UFLY';           // page 11
import Obstacles        from './pages/Obstacles';        // page 12
import People           from './pages/People';           // page 13
import FlightParameters from './pages/FlightParameters'; // page 14
import Weather          from './pages/Weather';          // page 15
import Payload          from './pages/Payload';          // page 16
import Processed        from './pages/Processed';        // page 17
import Finish           from './pages/Finish';           // page 18

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
    if (nextProps.planningType === 2) {
      if (this.state.completed > 16) {
        this.setState({completed: 16});
      } else {
        this.setState({completed: nextProps.value});
      }
    } else if (nextProps.planningType === 3) {
      if (this.state.completed > 14) {
        this.setState({completed: 14});
      } else {
        this.setState({completed: nextProps.value});
      }
    }
  }

  render() {
    const maxValue = this.props.planningType === 2 ? 16 : 14;
    return (
      <LinearProgress
        mode="determinate"
        max={maxValue}
        color="#C28E0E"
        value={this.state.completed}
      />
    );
  }
}

class HorizontalNonLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
    }
    this.updateStepIndex = this.updateStepIndex.bind(this);
  }

  updateStepIndex(newIndex) {
    this.setState({stepIndex: newIndex});
    if (newIndex === 0) {
      this.props.changePage(1);
    } else if (newIndex === 1) {
      this.props.changePage(14);
    } else {
      this.props.changePage(15);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageIndex < 14) {
      this.setState({stepIndex: 0});
    } else if (nextProps.pageIndex < 15) {
      this.setState({stepIndex: 1});
    } else {
      this.setState({stepIndex: 2});
    }
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.updateStepIndex(0)}>
              Planning
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.updateStepIndex(1)}>
              Payload
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.updateStepIndex(2)}>
              Processed
            </StepButton>
          </Step>
        </Stepper>
      </div>
    )
  }
}

class LogbookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      planningType: 2,
      resetStatus: true,
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.clearAndReturn = this.clearAndReturn.bind(this);
    this.stepperChangePage = this.stepperChangePage.bind(this);
    this.updatePlanningType = this.updatePlanningType.bind(this);
  }

  nextPage() {
    window.scrollTo(0, 0);
    this.setState({pageIndex: this.state.pageIndex + 1});
  };

  previousPage() {
    window.scrollTo(0, 0);
    this.setState({pageIndex: this.state.pageIndex - 1});
  };

  clearAndReturn() {
    this.setState({pageIndex: 0});
    this.props.dispatch(reset('logbook'));
  };

  stepperChangePage(pageIndex) {
    this.setState({pageIndex: pageIndex});
  };

  updatePlanningType(index) {
    this.setState({'planningType': index});
  };

  render() {
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
              { pageIndex === 0 && (
                <Welcome
                  onSubmit={this.nextPage}
                  clearAndReturn={this.clearAndReturn}
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 1 && (
                <Planning
                  updatePlanningType={this.updatePlanningType}
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 2 && (
                <Crop
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 3 && (
                <General
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 4 && (
                <Team
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 5 && (
                <Hardware
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 6 && (
                <Battery
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 7 && (
                <FlightOperation
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 8 && (
                this.state.planningType === 2 ?
                  <DataCollectionResearch
                    previousPage={ this.previousPage }
                    onSubmit={ this.nextPage }
                    trackPage={this.props.trackPage}
                  />
                :
                  <DataCollectionSpray
                    previousPage={ this.previousPage }
                    onSubmit={ this.nextPage }
                    trackPage={this.props.trackPage}
                  />
              )}
              { pageIndex === 9 && (
                <B4UFLY
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 10 && (
                <Obstacles
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 11 && (
                <People
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 12 && (
                <FlightParameters
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { pageIndex === 13 && (
                <Weather
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { this.state.planningType !== 3 && pageIndex === 14 && (
                <Payload
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { this.state.planningType !== 3 && pageIndex === 15 && (
                <Processed
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                  trackPage={this.props.trackPage}
                />
              )}
              { (pageIndex === 16 || (this.state.planningType === 3 && pageIndex === 14)) && (
                <Finish
                  previousPage={ this.previousPage }
                  clearAndReturn={ this.clearAndReturn }
                  trackPage={this.props.trackPage}
                />
              )}
              <ProgressBar value={pageIndex} planningType={this.state.planningType} />
            </Card>
          </div>
          {(this.state.planningType !== 3 && pageIndex > 0) ? <HorizontalNonLinearStepper pageIndex={pageIndex} changePage={this.stepperChangePage} /> : null}
          {(this.props.store.serviceWorkerStatus === ServiceWorkerStatuses.REGISTERED ? <ServiceWorkerRegistered /> : null)}
          {(this.props.store.serviceWorkerStatus === ServiceWorkerStatuses.UPDATED ? <ServiceWorkerUpdated /> : null)}
          {(this.props.store.serviceWorkerStatus === ServiceWorkerStatuses.ERROR ? <ServiceWorkerError /> : null)}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  store => ({ store }),
)(LogbookForm);
