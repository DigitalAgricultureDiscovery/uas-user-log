import React from 'react';
import AppBar from 'material-ui/AppBar';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import RaisedButton from 'material-ui/RaisedButton';

class Header extends React.Component {
  render() {
    return (
      <AppBar
        title="UAS User Log"
        iconElementLeft={(<div/>)}
        iconElementRight={(
          <address>
            <RaisedButton
              href="mailto:uasuserlog@gmail.com?Subject=User%20feedback"
              target="_top"
              label="Feedback"
              style={{margin: 5}}
              icon={<EmailIcon />}
            />
          </address>
        )}
        style={{backgroundColor: "#000000"}}
      />
    )
  }
}

export default Header;
