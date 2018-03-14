import React from 'react';
import { reduxForm } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

const Finish = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <CardTitle title="Finish" />
      <CardText>
        <p>Finished.</p>
      </CardText>
      <CardActions>
        <FlatButton
          className="previous"
          label="Previous"
          onClick={previousPage}
        />
        <RaisedButton
          className="save"
          label="Save"
          type="submit"
          secondary={true}
          disabled={pristine || submitting}
        />
      </CardActions>
    </form>
  )
}

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Finish);
