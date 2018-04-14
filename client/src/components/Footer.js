import React from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import ffarLogo from '../assets/images/logos/FFAR-Logo-60@2x.png'
import purdueLogo from '../assets/images/logos/Purdue-Sig-White-rgb.png';
import saaesdLogo from '../assets/images/logos/saaesd-logo-transparent.png';

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
                      src={purdueLogo}
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
              <a href="https://datastudio.google.com/embed/reporting/162Ji8O9c2rjtNEqN8_O8ohSHj7Yy7JDh/page/1M" target="_blank" rel="noopener noreferrer" style={{color: '#FFFFFF', textDecoration: 'none'}}>Site Statistics</a>&nbsp;<span style={{color: "#FFFFFF"}}>|</span>&nbsp;
              <a href="/disclaimer" style={{color: '#FFFFFF', textDecoration: 'none'}}>Site Disclaimer</a>
            </span>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer;
