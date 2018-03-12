import React from 'react';
import { reduxForm } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

class Welcome extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Welcome" />
        <CardText>
          <p>Welcome to Simple Logbook. Choose below if you
          will be creating a new log or loading a previously saved
          one.</p>
        </CardText>
        <CardActions>
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            primary={true}
          />
        </CardActions>
      </form>
    );
  }
}

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Welcome)
