import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Disclaimer from './Disclaimer';
import Header from './Header';
import Footer from './Footer';
import LogbookForm from './LogbookForm';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="site-content">
            <MuiThemeProvider>
              <Header />
            </MuiThemeProvider>
            <Route exact path="/" component={LogbookForm} dispatch={this.props.dispatch} />
            <MuiThemeProvider>
              <Route exact path="/disclaimer" component={Disclaimer} />
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

export default App;
