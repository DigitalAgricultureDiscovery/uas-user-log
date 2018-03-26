import React from 'react';
import { reset } from 'redux-form';
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
import Mission          from './pages/Mission';          // page 2
import Crop             from './pages/Crop';             // page 3
import General          from './pages/General';          // page 4
import Team             from './pages/Team';             // page 5
import Hardware         from './pages/Hardware';         // page 6
import Battery          from './pages/Battery';          // page 7
import FlightOperation  from './pages/FlightOperation';  // page 8
import DataCollectionResearch from './pages/DataCollectionResearch';   // page 9
import DataCollectionSpray from './pages/DataCollectionSpray';   // page 9
import B4UFLY           from './pages/B4UFLY';           // page 10
import Obstacles        from './pages/Obstacles';        // page 11
import People           from './pages/People';           // page 12
import FlightParameters from './pages/FlightParameters'; // page 13
import Weather          from './pages/Weather';          // page 14
import Payload          from './pages/Payload';          // page 14
import Processed        from './pages/Processed';        // page 15
import Finish           from './pages/Finish';           // page 16

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
    if (nextProps.missionType === 2) {
      if (this.state.completed > 16) {
        this.setState({completed: 16});
      } else {
        this.setState({completed: nextProps.value});
      }
    } else if (nextProps.missionType === 3) {
      if (this.state.completed > 14) {
        this.setState({completed: 14});
      } else {
        this.setState({completed: nextProps.value});
      }
    }
  }

  render() {
    const maxValue = this.props.missionType === 2 ? 16 : 14;
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
      missionType: 2,
      resetStatus: true,
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.clearAndReturn = this.clearAndReturn.bind(this);
    this.stepperChangePage = this.stepperChangePage.bind(this);
    this.updateMissionType = this.updateMissionType.bind(this);
  }

  nextPage() {
    this.setState({pageIndex: this.state.pageIndex + 1});
  };

  previousPage() {
    this.setState({pageIndex: this.state.pageIndex - 1});
  };

  clearAndReturn() {
    this.setState({pageIndex: 0});
    this.props.dispatch(reset('logbook'));
  };

  stepperChangePage(pageIndex) {
    this.setState({pageIndex: pageIndex});
  };

  updateMissionType(index) {
    this.setState({'missionType': index});
  };

  render() {
    // const { onSubmit } = this.props;
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
                  updateMissionType={this.updateMissionType}
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
                this.state.missionType === 2 ?
                  <DataCollectionResearch
                    previousPage={ this.previousPage }
                    onSubmit={ this.nextPage }
                  />
                :
                  <DataCollectionSpray
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
              { this.state.missionType !== 3 && pageIndex === 14 && (
                <Payload
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { this.state.missionType !== 3 && pageIndex === 15 && (
                <Processed
                  previousPage={ this.previousPage }
                  onSubmit={ this.nextPage }
                />
              )}
              { (pageIndex === 16 || (this.state.missionType === 3 && pageIndex === 14)) && (
                <Finish
                  previousPage={ this.previousPage }
                  clearAndReturn={ this.clearAndReturn }
                />
              )}
              <ProgressBar value={pageIndex} missionType={this.state.missionType} />
            </Card>
          </div>
          {(this.state.missionType !== 3 && pageIndex > 0) ? <HorizontalNonLinearStepper pageIndex={pageIndex} changePage={this.stepperChangePage} /> : null}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default LogbookForm;
