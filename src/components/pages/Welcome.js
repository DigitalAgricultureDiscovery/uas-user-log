import React from 'react';
import { reduxForm } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import Divider                              from 'material-ui/Divider';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class Welcome extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Welcome to UASlog" />
        <CardText>
          <p>
            The UASlog is an outcome of multistate teams working together
            to develop a common protocol for unmanned aircraft systems (UAS)
            operation for activities such as teaching/demonstration, research
            and spray application. It relies on simple user interactions to
            develop a record of your UAS missions and can serve to enhance
            your flight and maintenance experience.
          </p>
          <Divider />
          <p>
            Released by Multistate Research Project - S1069 Research and Extension
            for Unmanned Aircraft Systems (UAS) Applications in U.S.
            Agriculture and Natural Resources
          </p>
          <p>
            Contributors - Dr. Dharmendra Saraswat (Purdue University), Dr. Daniel Martin (USDA ARS),
            Dr. Luv Khot (Washington State University), and Dr. Seth Murray (Texas A&M University)
          </p>
          <Divider />
          <p style={{textAlign: "center"}}>
            <span style={{marginRight: "50%"}}>
              <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
                <img
                  src="./images/logos/Purdue-Sig-Black-Gold-rgb.png"
                  alt="Purdue logo"
                  style={{height: 45}} />
              </a>
            </span>
            <span>
              <a href="https://saaesd.org/" target="_blank" rel="noopener noreferrer">
                <img
                  src="./images/logos/logo_logbook.jpeg"
                  alt="SAAESD logo"
                  style={{height: 45}} />
              </a>
            </span>
          </p>
        </CardText>
        <CardActions>
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            primary={true}
          />
        </CardActions>
      </form>
    );
  }
}

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Welcome)
