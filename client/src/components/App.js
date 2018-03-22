import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header';
import Footer from './Footer';
import LogbookForm from './LogbookForm';

class App extends React.Component {
  render() {
    return (
      <div className="container">
          <div className="site-content">
            <MuiThemeProvider>
              <Header />
            </MuiThemeProvider>
            <LogbookForm dispatch={this.props.dispatch} />
          </div>
          <MuiThemeProvider>
            <Footer />
          </MuiThemeProvider>
      </div>
    )
  }
}

export default App;
