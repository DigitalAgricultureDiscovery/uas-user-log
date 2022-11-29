import React           from 'react';
import { Field }       from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import MenuItem        from 'material-ui/MenuItem';
import communitySensors from './communitySensors';

const containerStyle = {
  display: 'block',
};

export default class LogbookSelectField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.precisionRound = this.precisionRound.bind(this);
    this.getCommunitySensors = this.getCommunitySensors.bind(this);
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
  getCommunitySensors(sensors) {
    let communitySensorItems = [];
    communitySensorItems.push({value: null, name: ''});
    sensors.forEach(function(sensor, index) {
      communitySensorItems.push({
        value: index + 1,
        name: sensor.make + ' ' + sensor.model,
      });
    });
    return communitySensorItems;
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
      if (this.props.communitySensorsFieldName && this.props.makeFieldName && this.props.modelFieldName) {
        // Sensor type changed - reset community sensors, make, and model
        this.props.change(this.props.communitySensorsFieldName, null);
        this.props.change(this.props.makeFieldName, '');
        this.props.change(this.props.modelFieldName, '');
        // Update community sensors list based on selected sensor type
        let communitySensorItems = [];
        if (newValue === 1) {
          if (communitySensors.rgb()) {
            communitySensorItems = this.getCommunitySensors(communitySensors.rgb());
          }
        } else if (newValue === 2) {
          if (communitySensors.multi()) {
            communitySensorItems = this.getCommunitySensors(communitySensors.multi());
          }
        } else if (newValue === 3) {
          if (communitySensors.hyper()) {
            communitySensorItems = this.getCommunitySensors(communitySensors.hyper());
          }
        } else if (newValue === 4) {
          if (communitySensors.lidar()) {
            communitySensorItems = this.getCommunitySensors(communitySensors.lidar());
          }
        } else if (newValue === 5) {
          if (communitySensors.thermal()) {
            communitySensorItems = this.getCommunitySensors(communitySensors.thermal());
          }
        }
        this.props.updateCommunitySensors(communitySensorItems, newValue);
      }
      // Community sensor changes
      if (this.props.makeFieldName && this.props.modelFieldName && this.props.sensorType) {
        // Set make and model
        if (newValue > 0) {
          let communitySensorList = [];
          if (this.props.sensorType === 1) {
            communitySensorList = communitySensors.rgb();
          } else if (this.props.sensorType === 2) {
            communitySensorList = communitySensors.multi();
          } else if (this.props.sensorType === 3) {
            communitySensorList = communitySensors.hyper();
          } else if (this.props.sensorType === 4) {
             communitySensorList = communitySensors.lidar();
          } else if (this.props.sensorType === 5) {
            communitySensorList = communitySensors.thermal();
          } else {
            communitySensorList = [];
          }
          if (communitySensorList.length > 0) {
            this.props.change(this.props.makeFieldName, communitySensorList[newValue - 1].make);
            this.props.change(this.props.modelFieldName, communitySensorList[newValue - 1].model);
          } else {
            this.props.change(this.props.makeFieldName, '');
            this.props.change(this.props.modelFieldName, '');
          }
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
      <div style={this.props.containerStyle ? this.props.containerStyle : {containerStyle}}>
        <Field
          name={this.props.fieldName}
          floatingLabelText={this.props.fieldLabel}
          className={this.props.required ? "required" : null}
          component={SelectField}
          multiple={this.props.multiple}
          onChange={this.props.change ? this.handleChange : null}
          underlineShow={!this.props.underlineShow ? this.props.underlineShow : true}
          style={this.props.style ? this.props.style : null}
        >
          {this.menuItems(this.props.items)}
        </Field>
      </div>
    )
  }
}
