import React           from 'react';
import { Field }       from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import MenuItem        from 'material-ui/MenuItem';

const style = {
  display: 'block',
};

export default class LogbookSelectField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    // Select first menu item as default if 'setDefault' true
    if (this.props.setDefault) {
      this.props.change(this.props.fieldName, 1);
    }
  }

  handleChange(event, newValue, oldValue) {
    if (this.props.change) {
      if (this.props.valueToConvert1) {
        // Convert value after unit change
        const convertedValue1 = this.props.valueToConvert1 * this.props.items[newValue - 1].rate;
        // Update store with converted value
        this.props.change(this.props.valueToConvert1FieldName, convertedValue1.toFixed(4));
      }
      if (this.props.valueToConvert2) {
        // Convert value after unit change
        const convertedValue2 = this.props.valueToConvert2 * this.props.items[newValue - 1].rate;
        // Update store with converted value
        this.props.change(this.props.valueToConvert2FieldName, convertedValue2.toFixed(4));
      }
      if (this.props.valueToConvert3) {
        // Convert value after unit change
        const convertedValue3 = this.props.valueToConvert3 * this.props.items[newValue - 1].rate;
        // Update store with converted value
        this.props.change(this.props.valueToConvert3FieldName, convertedValue3.toFixed(4));
      }
    }
  }

  menuItems(items) {
    return items.map((item) => (
      <MenuItem
        key={item.value}
        value={item.value}
        primaryText={item.name}
      />
    ))
  }

  render() {
    return (
      <div style={{style}}>
        <Field
          name={this.props.fieldName}
          floatingLabelText={this.props.fieldLabel}
          component={SelectField}
          multiple={this.props.multiple}
          onChange={this.props.change ? this.handleChange : null}
        >
          {this.menuItems(this.props.items)}
        </Field>
      </div>
    )
  }
}
