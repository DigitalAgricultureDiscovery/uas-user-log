import React from 'react';
import ReactGA from 'react-ga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header';
import Footer from './Footer';
import LogbookForm from './LogbookForm';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Add Google Analytics
    ReactGA.initialize('UA-78284792-5');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

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
