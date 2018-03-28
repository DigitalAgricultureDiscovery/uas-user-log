import React from 'react';
import { reduxForm } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText }           from 'material-ui/Card';
import Divider                                        from 'material-ui/Divider';
import IconButton                                     from 'material-ui/IconButton';
import Paper                                          from 'material-ui/Paper';
import RaisedButton                                   from 'material-ui/RaisedButton';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
// material-ui icons
import HelpIcon from 'material-ui/svg-icons/action/help';

import validate from '../helpers/validate';

const PAGE_NAME = 'welcome_';

const styles = {
  button: {
    marginLeft: 12,
    marginRight: 0,
  },
  logLoadButton: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class LoadFormHelpText extends React.Component {
  render() {
    const style = {
      display: 'inline-block',
      padding: 5,
      textAlign: 'left',
    };

    return (
      <Paper
        name={`${PAGE_NAME}LoadFormHelp`}
        style={style}
        zDepth={1}
      >
        <div>
          Use the load button to initialize the form with values from a
          previously completed form. To use this feature:
          <ol>
            <li>Click LOAD FORM, </li>
            <li>select your completed form (e.g. "data.json"), </li>
            <li>and click Next to continue.</li>
          </ol>
        </div>
      </Paper>
    )
  }
}

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onReaderLoad = this.onReaderLoad.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  handleChange(event) {
    // Clear out any previous loaded form data
    this.props.clearAndReturn();
    // Use FileReader API to read contents of client's JSON file
    const reader = new FileReader();
    reader.onload = this.onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  convertFlightDatesAndTimes(obj) {
    if (obj.general_FlightDate) {
      obj.general_FlightDate = new Date(obj.general_FlightDate);
    }
    if (obj.general_Flights && Object.keys(obj.general_Flights).length > 0) {
      obj.general_Flights.forEach((flight, index) => {
        if (obj.general_Flights[index].Start) {
          obj.general_Flights[index].Start = new Date(obj.general_Flights[index].Start);
        }
        if (obj.general_Flights[index].End) {
          obj.general_Flights[index].End = new Date(obj.general_Flights[index].End);
        }
      });
    }
    return obj;
  }

  onReaderLoad(event) {
    // Add loaded JSON file to store
    const obj = this.convertFlightDatesAndTimes(JSON.parse(event.target.result));
    this.props.change('initialValuesFromJSON', obj);
  }

  toggleHelp() {
    this.setState({showHelp: !this.state.showHelp});
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Welcome to UAS User Log" />
        <CardText>
          <p>
            The UAS User Log is a server-based, digital logbook that is
            accessible through any web browser on internet-connected devices.​
            It is an outcome of multistate teams working together to develop a
            common protocol for unmanned aircraft systems (UAS) operation for
            activities such as research/production and spray
            application. It ​relies on simple user interactions to develop a
            record of UAS mission and can also serve to enhance your flight
            and maintenance experience.​
          </p>
          <Divider />
          <p>
            Facilitated by Multistate Research Project - S1069 Research and Extension
            for Unmanned Aircraft Systems (UAS) Applications in U.S.
            Agriculture and Natural Resources
          </p>
          <p>
            Contributors - Dr. Dharmendra Saraswat (Purdue University), Dr. Daniel E. Martin (Dan) (USDA ARS),
            Dr. Lav R. Khot (Washington State University), and Dr. Seth Murray (Texas A&M University)
          </p>
          <p>
            Acknowledgment - FFAR Award # 210316​
          </p>
          <Table style={{marginTop: 15}}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{textAlign: "center"}}>
                  <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/Purdue-Sig-Black-Gold-rgb.png"
                      alt="Purdue logo"
                      style={{width: '100%'}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: "center"}}>
                  <a href="https://saaesd.org/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/logo.png"
                      alt="SAAESD logo"
                      style={{width: '100%'}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                  <a href="http://foundationfar.org" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/FFAR-Logo-60@2x.png"
                      alt="FFAR logo"
                      style={{width: '100%'}} />
                  </a>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            backgroundColor="#FFD100"
          />
          <RaisedButton
            label="Load Form"
            labelPosition="before"
            style={styles.button}
            containerElement="label"
          >
            <input
              type="file"
              accept=".json"
              style={styles.logLoadButton}
              onChange={this.handleChange}
            />
          </RaisedButton>
          <IconButton
            tooltip="Load a previous form"
            onClick={this.toggleHelp}
            style={{verticalAlign: 'middle'}}
          >
            <HelpIcon />
          </IconButton>
          {this.state.showHelp &&
            <div><LoadFormHelpText /></div>
          }
        </CardActions>
      </form>
    );
  }
}

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Welcome);
