import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Disclaimer from './Disclaimer';
import Header from './Header';
import Footer from './Footer';
import LogbookForm from './LogbookForm';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    accent1Color: "#AD1F65",
    pickerHeaderColor: "#4D4038",
    primary1Color: "#C28E0E",
    primary2Color: "#916A0A"
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.trackPage = this.trackPage.bind(this);
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  }

  trackPage(pageName) {
    ReactGA.pageview(pageName);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="site-content">
            <MuiThemeProvider muiTheme={muiTheme}>
              <Header />
            </MuiThemeProvider>
            <Route exact path="/" render={()=><LogbookForm dispatch={this.props.dispatch} trackPage={this.trackPage} muiTheme={muiTheme} />} />
            <MuiThemeProvider muiTheme={muiTheme}>
              <Route exact path="/disclaimer" render={()=><Disclaimer trackPage={this.trackPage} />} />
            </MuiThemeProvider>
          </div>
          <MuiThemeProvider muiTheme={muiTheme}>
            <Footer />
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect()(App);
