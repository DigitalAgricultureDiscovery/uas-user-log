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
                  Your use of this tool is appreciated. Your right to privacy
                  and data security is our primary concern. We want you to feel
                  comfortable visiting this website.
                </p>
                <p>
                  Purdue University shall have no liability for the accuracy of
                  data and cannot be held liable for any third-party claims or
                  losses of any damages due to use of this tool.
                </p>
                <p>
                  The contributors reserve the right to revise the design and
                  layout of this tool without notice.
                </p>
                <p>
                  Sensor data voluntarily shared with UAS User Logs will only
                  be used for improving the sensor presets made available to
                  users. No identifiable information is collected when a user
                  shares sensor metadata with the site.
                </p>
                <p>
                  This tool uses Google Analytics, an analytical service
                  provided by Google Inc., to gather and help analyze
                  information on how users use this website. This will help us
                  to improve your experience when visiting this website. Please
                  refer to Google Analytics’ privacy policy at the following
                  link: <a href="https://support.google.com/analytics/answer/6004245?hl=en" target="_blank" rel="noopener noreferrer">
                  Safeguarding your data</a>.
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
