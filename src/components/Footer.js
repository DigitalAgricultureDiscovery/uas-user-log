import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div style={{backgroundColor: "#BAA892", marginTop: 25, padding: 25, textAlign: "center"}}>
          <span style={{marginRight: "80%"}}>
            <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
              <img
                src="./images/logos/Purdue-Sig-White-rgb.png"
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
        </div>
      </footer>
    )
  }
}

export default Footer;
