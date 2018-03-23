import React           from 'react';
import { Field }       from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import MenuItem        from 'material-ui/MenuItem';

const style = {
  display: 'block',
};

export default class LogbookSelectField extends React.Component {
  componentWillMount() {
    // Select first menu item as default if 'setDefault' true
    if (this.props.setDefault) {
      this.props.change(this.props.fieldName, 1);
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
        >
          {this.menuItems(this.props.items)}
        </Field>
      </div>
    )
  }
}
