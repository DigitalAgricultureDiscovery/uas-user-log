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
          <div style={{display: 'flex'}}>
            <RaisedButton
              backgroundColor="#BAA892"
              href="/disclaimer"
              label="Disclaimer"
              style={{display: 'inline-block', margin: 5}}
            />
            <address>
              <RaisedButton
                backgroundColor="#C28E0E"
                href="mailto:uasuserlog@gmail.com?Subject=User%20feedback"
                target="_top"
                label="Feedback"
                style={{display: 'inline-block', margin: 5}}
                icon={<EmailIcon />}
              />
            </address>
          </div>
        )}
        style={{backgroundColor: "#000000"}}
      />
    )
  }
}

export default Header;
