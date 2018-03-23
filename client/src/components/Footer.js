import React from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer">
          <Table style={{backgroundColor: "inherit"}}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{textAlign: 'left'}}>
                  <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/Purdue-Sig-White-rgb.png"
                      alt="Purdue logo"
                      style={{width: '100%', maxWidth: '125px'}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                  <a href="https://saaesd.org/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/logo_transparent.png"
                      alt="SAAESD logo"
                      style={{width: '100%', maxWidth: '125px'}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'right'}}>
                  <a href="http://foundationfar.org" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/FFAR-Logo-60@2x.png"
                      alt="FFAR logo"
                      style={{width: '100%', maxWidth: '125px'}} />
                  </a>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </footer>
    )
  }
}

export default Footer;
