import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const containerStyle = {
  display: 'block',
};

export default class LogbookTextField extends React.Component {
  componentWillMount() {
    // Select first menu item as default if 'setDefault' true
    if (this.props.setDefault) {
      this.props.change(this.props.fieldName, this.props.defaultValue);
    }
  }

  render() {
    const form = this.props.type ? (
      // Number type
      <Field
        name={this.props.fieldName}
        floatingLabelText={this.props.fieldLabel}
        floatingLabelShrinkStyle={
          this.props.floatingLabelShrinkStyle
            ? this.props.floatingLabelShrinkStyle
            : null
        }
        className={this.props.required ? 'required' : null}
        hintText={this.props.hintText ? this.props.hintText : null}
        component={TextField}
        type={this.props.type}
        step={this.props.step}
        min={this.props.min ? this.props.min : '0'}
        onChange={this.props.handleChange ? this.props.handleChange : null}
        style={this.props.style ? this.props.style : null}
      />
    ) : (
      // String type
      <Field
        name={this.props.fieldName}
        floatingLabelText={this.props.fieldLabel}
        floatingLabelShrinkStyle={
          this.props.floatingLabelShrinkStyle
            ? this.props.floatingLabelShrinkStyle
            : null
        }
        className={this.props.required ? 'required' : null}
        hintText={this.props.hintText ? this.props.hintText : null}
        component={TextField}
        onChange={this.props.handleChange ? this.props.handleChange : null}
        multiLine={this.props.multiLine ? true : false}
        rows={
          this.props.multiLine ? (this.props.rows ? this.props.rows : null) : 1
        }
        style={this.props.style ? this.props.style : null}
      />
    );
    return (
      <div
        style={
          this.props.containerStyle
            ? this.props.containeStyle
            : { containerStyle }
        }
      >
        {form}
      </div>
    );
  }
}
