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
          By moving the toggle switch to the right, you agree to submit sensor
          specifications for updating publicly available choices for other
          users of this tool. All submitted information may be reviewed before
          it becomes part of community sensor database. Please note that none
          of your personal information is collected by exercising this option.​
        </div>
      </Paper>
    )
  }
}
