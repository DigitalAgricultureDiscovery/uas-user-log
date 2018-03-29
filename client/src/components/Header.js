import React from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
  render() {
    return (
      <AppBar
        title="UAS User Log"
        iconElementLeft={(<div/>)}
        style={{backgroundColor: "#000000"}}
      />
    )
  }
}

export default Header;
