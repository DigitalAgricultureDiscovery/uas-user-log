import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header';
// import Footer from './Footer';
import LogbookForm from './LogbookForm';

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      resolve();
    }, 500)
  });

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <MuiThemeProvider>
              <Header />
            </MuiThemeProvider>
            <LogbookForm onSubmit={ showResults } />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
