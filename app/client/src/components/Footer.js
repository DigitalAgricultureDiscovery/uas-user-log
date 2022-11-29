import React from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import ffarLogo from '../assets/images/logos/FFAR-Logo-60@2x.png'
import purdueLogo512 from '../assets/images/logos/Purdue-Sig-White-rgb-512.png';
import purdueLogo256 from '../assets/images/logos/Purdue-Sig-White-rgb-256.png';
import saaesdLogo from '../assets/images/logos/saaesd-logo-transparent.png';
import '../assets/css/footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer">
          <Table style={{backgroundColor: "inherit"}}>
            <TableBody displayRowCheckbox={false}>
              <TableRow displayBorder={false}>
                <TableRowColumn style={{textAlign: 'left'}}>
                  <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
                    <img
                      src={purdueLogo256}
                      srcSet={purdueLogo256 + ' 256w, ' + purdueLogo512 + ' 512w'}
                      alt="Purdue logo"
                      style={{width: '100%', maxWidth: '125px'}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                  <a href="https://saaesd.org/" target="_blank" rel="noopener noreferrer">
                    <img
                      src={saaesdLogo}
                      alt="SAAESD logo"
                      style={{width: '100%', maxWidth: '125px'}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'right'}}>
                  <a href="http://foundationfar.org" target="_blank" rel="noopener noreferrer">
                    <img
                      src={ffarLogo}
                      alt="FFAR logo"
                      style={{width: '100%', maxWidth: '125px'}} />
                  </a>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <p>
            <span style={{textAlign: 'center', fontSize: 12}}>
              <a href="/disclaimer" style={{color: '#FFFFFF', textDecoration: 'none'}}>Site Disclaimer</a>
            </span>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer;
