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
        className={this.props.required ? "required" : null}
        hintText={this.props.hintText ? this.props.hintText : null}
        component={TextField}
        type={this.props.type}
        step={this.props.step}
        min={this.props.min ? this.props.min : "0"}
        onChange={this.props.handleChange ? this.props.handleChange : null}
      /> :
      // String type
      <Field
        name={this.props.fieldName}
        floatingLabelText={this.props.fieldLabel}
        className={this.props.required ? "required" : null}
        component={TextField}
        onChange={this.props.handleChange ? this.props.handleChange : null}
      />;
    return (
      <div style={this.props.style ? this.props.style : {style}}>
        {form}
      </div>
    )
  }
}
