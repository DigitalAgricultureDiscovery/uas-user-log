import React from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
  render() {
    return (
      <AppBar
        title="UASlog"
        iconElementLeft={
          <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
            <img
              src="./images/logos/Purdue-Sig-White-Gold-rgb.png"
              alt="Purdue logo"
              style={{marginTop: 13, width: 75}} />
          </a>
        }
        iconElementRight={
          <a href="https://saaesd.org/" target="_blank" rel="noopener noreferrer">
            <img
              src="./images/logos/logo_logbook.jpeg"
              alt="SAAESD logo"
              style={{height: 45}} />
          </a>
        }
        style={{backgroundColor: "#000000"}}
      />
    )
  }
}

export default Header;
