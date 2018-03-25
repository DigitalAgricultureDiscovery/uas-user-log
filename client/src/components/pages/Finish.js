import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const Finish = props => {
  const { handleSubmit, pristine, previousPage, submitting, formValues, clearAndReturn } = props;
  let data = "data:text/json;charset=utf-8,";
  data += encodeURIComponent(JSON.stringify(formValues));
  return (
    <form onSubmit={ handleSubmit }>
      <CardTitle title="Finish" />
      <CardText>
        <p>
          Click Save Copy to download a copy of the form you have just completed.
          You will be able to re-load your form selections using the downloaded file
          on the Welcome page. Editing this file may prevent the site from properly
          loading the file. Your forms are never saved or read on a remote server.
        </p>
        <p>
          Click the Clear button to erase your current form selections and return
          to the beginning of the form.
        </p>
      </CardText>
      <a id="downloadAnchorElem" href={data} download="data.json">Download file</a>
      <CardActions>
        <FlatButton
          className="previous"
          label="Previous"
          onClick={previousPage}
          backgroundColor="#BAA892"
        />
        <RaisedButton
          className="saveCopy"
          label="Save Copy"
          href={data}
          download="data.json"
          target="_blank"
          backgroundColor="#FF9B1A"
          disabled={pristine || submitting}
        />
        <RaisedButton
          className="clearReturn"
          label="Clear Form"
          labelPosition="before"
          onClick={clearAndReturn}
          backgroundColor="#AD1F65"
        />
      </CardActions>
    </form>
  )
}

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Finish);

export default connect(
  state => ({
    formValues: getFormValues('logbook')(state),
  })
)(myReduxForm);
