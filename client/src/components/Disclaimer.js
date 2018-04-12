import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: "#AD1F65",
    pickerHeaderColor: "#4D4038",
    primary1Color: "#C28E0E",
    primary2Color: "#916A0A"
  },
});

export default class Disclaimer extends React.Component {
  componentDidMount() {
    this.props.trackPage('Disclaimer');
  }

  render() {
    const contentStyle = { margin: '0 16px' };
    const divStyle = {
      width: '100%',
      maxWidth: 700,
      margin: 'auto'
    };
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={ divStyle }>
          <br />
          <div style={ contentStyle }>
            <Card>
              <CardTitle title="Disclaimer" />
              <CardText>
                <p>
                  Your use of this tool is appreciated. Your right to privacy and data
                  security is our primary concern. We want you to feel comfortable
                  visiting this website. 
                </p>
                <p>
                  Purdue University shall have no liability for the accuracy of data
                  and cannot be held liable for any third-party claims or losses of
                  any damages due to use of this tool.
                </p>
                <p>
                  This tool uses Google Analytics, an analytical service provided by
                  Google Inc., to gather and help analyze information on how users use
                  this website. This will help us to improve your experience when
                  visiting this website.
                </p>
                <p>
                  Examples of the information that we may collect are the various
                  pages that you visited and the date and time that a page was viewed.
                  We will not gather any personally identifiable data.
                </p>
              </CardText>
              <CardActions style={{textAlign: 'center'}}>
                <RaisedButton
                  href="/"
                  className="next"
                  label="Return"
                  type="submit"
                  backgroundColor="#FFD100"
                />
              </CardActions>
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
