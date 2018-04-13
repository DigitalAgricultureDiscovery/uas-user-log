import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Disclaimer from './Disclaimer';
import Header from './Header';
import Footer from './Footer';
import LogbookForm from './LogbookForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.trackPage = this.trackPage.bind(this);
    ReactGA.initialize('UA-78284792-5');
    // console.log(this.props.swStatus);
  }
  
  trackPage(pageName) {
    ReactGA.pageview(pageName);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="site-content">
            <MuiThemeProvider>
              <Header />
            </MuiThemeProvider>
            <Route exact path="/" render={()=><LogbookForm dispatch={this.props.dispatch} trackPage={this.trackPage} />} />
            <MuiThemeProvider>
              <Route exact path="/disclaimer" render={()=><Disclaimer trackPage={this.trackPage} />} />
            </MuiThemeProvider>
          </div>
          <MuiThemeProvider>
            <Footer />
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect()(App);
