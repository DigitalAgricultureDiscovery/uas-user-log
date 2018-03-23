import React from 'react';
import { reduxForm } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText }           from 'material-ui/Card';
import Divider                                        from 'material-ui/Divider';
import RaisedButton                                   from 'material-ui/RaisedButton';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import validate from '../helpers/validate';

const styles = {
  button: {
    margin: 12,
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

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onReaderLoad = this.onReaderLoad.bind(this);
  }

  handleChange(event) {
    // Use FileReader API to read contents of client's JSON file
    const reader = new FileReader();
    reader.onload = this.onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  onReaderLoad(event) {
    // Add loaded JSON file to store
    const obj = JSON.parse(event.target.result);
    this.props.change('initialValuesFromJSON', obj);
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
            Contributors - Dr. Dharmendra Saraswat (Purdue University), Dr. Daniel Martin (USDA ARS),
            Dr. Luv Khot (Washington State University), and Dr. Seth Murray (Texas A&M University)
          </p>
          <Table style={{marginTop: 15}}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{textAlign: "center"}}>
                  <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/Purdue-Sig-Black-Gold-rgb.png"
                      alt="Purdue logo"
                      style={{width: "auto", maxHeight: 50}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: "center"}}>
                  <a href="https://saaesd.org/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/logo.png"
                      alt="SAAESD logo"
                      style={{width: "auto", maxHeight: 50}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                  <a href="http://foundationfar.org" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/FFAR-Logo-60@2x.png"
                      alt="FFAR logo"
                      style={{width: 'auto', maxHeight: 50}} />
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
