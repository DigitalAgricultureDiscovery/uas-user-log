import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const style = {
  display: 'block',
};

export default class LogbookTextField extends React.Component {
  render() {
    const form = this.props.type ?
      // Number type
      <Field
        name={this.props.fieldName}
        floatingLabelText={this.props.fieldLabel}
        hintText={this.props.hintText ? this.props.hintText : null}
        component={TextField}
        type={this.props.type}
        step={this.props.step}
      /> :
      // String type
      <Field
        name={this.props.fieldName}
        floatingLabelText={this.props.fieldLabel}
        component={TextField}
      />;
    return (
      <div style={this.props.style ? this.props.style : {style}}>
        {form}
      </div>
    )
  }
}
