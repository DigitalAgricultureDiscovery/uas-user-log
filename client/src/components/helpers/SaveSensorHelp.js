import React from 'react';
import Paper from 'material-ui/Paper';

export default class SaveSensorHelpText extends React.Component {
  render() {
    const style = {
      display: 'inline-block',
      padding: 5,
      textAlign: 'left',
    };

    return (
      <Paper
        name={`${this.props.sensorName}.SaveSensorFormHelp`}
        style={style}
        zDepth={1}
      >
        <div>
          By toggling the switch to yes, you agree to provide information
          related to make and model of sUAS platform and sensor specifications
          for updating publicly available choices for other users of uasuserlog
          app. All new information will be reviewed before it is made available
          to the user community. Please note that none of your personal
          information is collected by exercising this option.
        </div>
      </Paper>
    )
  }
}
