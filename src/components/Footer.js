import React from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

class Footer extends React.Component {
  render() {
    return (
      <div style={{backgroundColor: "#000000", marginTop: 25}}>
        <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
          <img
            src="./images/logos/Purdue-Sig-Black-Gold-rgb.png"
            alt="Purdue logo"
            style={{height: 45}} />
        </a>
        <a href="https://saaesd.org/" target="_blank" rel="noopener noreferrer">
          <img
            src="./images/logos/logo_logbook.jpeg"
            alt="SAAESD logo"
            style={{height: 45}} />
        </a>
      </div>
    )
  }
}

export default Footer;
