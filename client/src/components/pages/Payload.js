import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { SelectField, TextField }           from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

class PayloadOperationModeSelect extends React.Component {
  render() {
    return (
      <Field
        name="payloadOperationModeSelect"
        component={SelectField}
        floatingLabelText="Operation mode"
      >
        <MenuItem value={0} primaryText="Automatic" />
        <MenuItem value={1} primaryText="Manual" />
      </Field>
    )
  }
}

class PayloadCameraSpecsText extends React.Component {
  render() {
    return (
      <Field
        name="payloadCameraSpecsText"
        component={TextField}
        floatingLabelText="Camera Specs"
      />
    )
  }
}

class ImageWidthText extends React.Component {
  render() {
    return (
      <Field
        name="imageWidthText"
        component={TextField}
        floatingLabelText="Image width"
        type="number"
      />
    )
  }
}

class ImageHeightText extends React.Component {
  render() {
    return (
      <Field
        name="imageHeightText"
        component={TextField}
        floatingLabelText="Image height"
        type="number"
      />
    )
  }
}

class FieldOfView extends React.Component {
  render() {
    return (
      <div>
        <ImageWidthText />
        <br />
        <ImageHeightText />
      </div>
    )
  }
}

class Payload extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Payload" />
        <CardText>
          Development in progress.
        </CardText>
        <CardActions>
          <FlatButton
            className="previous"
            label="Previous"
            onClick={previousPage}
            backgroundColor="#BAA892"
          />
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            backgroundColor="#FFD100"
          />
        </CardActions>
      </form>
    )
  }
}

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Payload);
