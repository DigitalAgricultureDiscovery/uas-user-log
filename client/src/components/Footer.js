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
                <TableRowColumn style={{textAlign: "left"}}>
                  <a href="https://purdue.edu" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/Purdue-Sig-White-rgb.png"
                      alt="Purdue logo"
                      style={{width: "auto", maxHeight: 50}} />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{textAlign: "right"}}>
                  <a href="https://saaesd.org/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./images/logos/logo_transparent.png"
                      alt="SAAESD logo"
                      style={{width: "auto", maxHeight: 50}} />
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