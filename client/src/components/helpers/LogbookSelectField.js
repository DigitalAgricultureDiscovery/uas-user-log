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
    this.precisionRound = this.precisionRound.bind(this);
  }
  componentWillMount() {
    // Select first menu item as default if 'setDefault' true
    if (this.props.setDefault) {
      this.props.change(this.props.fieldName, 1);
    }
  }
  precisionRound(number) {
    if (this.props.step && this.props.step.split('.')) {
      const precision = this.props.step.split('.')[1].length
      const factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    } else {
      return Math.round(number);
    }
  }
  handleChange(event, newValue, oldValue) {
    if (this.props.change) {
      // Unit conversions
      if (this.props.valueToConvert1) {
        // Convert value after unit change
        const convertedValue1 = this.precisionRound(this.props.valueToConvert1 * this.props.items[newValue - 1].rate);
        // Update store with converted value
        this.props.change(this.props.valueToConvert1FieldName, convertedValue1);
      }
      if (this.props.valueToConvert2) {
        // Convert value after unit change
        const convertedValue2 = this.precisionRound(this.props.valueToConvert2 * this.props.items[newValue - 1].rate);
        // Update store with converted value
        this.props.change(this.props.valueToConvert2FieldName, convertedValue2);
      }
      if (this.props.valueToConvert3) {
        // Convert value after unit change
        const convertedValue3 = this.precisionRound(this.props.valueToConvert3 * this.props.items[newValue - 1].rate);
        // Update store with converted value
        this.props.change(this.props.valueToConvert3FieldName, convertedValue3);
      }

      // Generic sensor changes
      if (this.props.communitySensorsFieldName && this.props.communitySensors && this.props.genericTypeChange) {
        // Sensor type changed - reset community sensors, make, and model
        this.props.change(this.props.communitySensorsFieldName, null);
        this.props.change(this.props.makeFieldName, '');
        this.props.change(this.props.modelFieldName, '');
        // Update community sensors list based on selected sensor type
        if (newValue === 1) {
          if (this.props.communitySensors.rgb()) {
            let communityRGBSensors = [];
            communityRGBSensors.push({value: null, name: ''});
            this.props.communitySensors.rgb().forEach(function(sensor, index) {
              communityRGBSensors.push({
                value: index + 1,
                name: sensor.make + ' ' + sensor.model,
              });
            });
            this.props.updateCommunitySensors(communityRGBSensors);
          }
        } else {
          this.props.updateCommunitySensors([]);
        }
      }
      // Community sensor changes
      if (this.props.makeFieldName && this.props.modelFieldName && this.props.communitySensors && this.props.communitySensorChange) {
        // Set make and model
        if (newValue > 0 && this.props.communitySensors.length > 0) {
          this.props.change(this.props.makeFieldName, this.props.communitySensors[newValue - 1].make);
          this.props.change(this.props.modelFieldName, this.props.communitySensors[newValue - 1].model);
        } else {
          this.props.change(this.props.makeFieldName, '');
          this.props.change(this.props.modelFieldName, '');
        }
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
          className={this.props.required ? "required" : null}
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
