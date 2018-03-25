import React from 'react';
import LogbookSelectField from '../../helpers/LogbookSelectField';
import LogbookTextField from '../../helpers/LogbookTextField';

const PAGE_NAME = 'payload_';

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

const IN_AND_CM = [
  {value: 1, name: 'in', rate: 0.393701},
  {value: 2, name: 'cm', rate: 2.54},
];

const FT_AND_M = [
  {value: 1, name: 'ft', rate: 3.28084},
  {value: 2, name: 'm', rate: 0.3048},
];

const LB_AND_KG = [
  {value: 1, name: 'lb', rate: 2.20462},
  {value: 2, name: 'kg', rate: 0.453592},
];

export default class LidarForm extends React.Component {
  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarManufacturer`}
            fieldLabel="Manufacturer"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarModel`}
            fieldLabel="Model"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarHorizontalFOV`}
            fieldLabel="Horizontal FOV (Degree)"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarVerticalFOV`}
            fieldLabel="Vertical FOV (Degree)"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarMinRange`}
            fieldLabel="Minimum range"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarMinRangeUnit`}
            fieldLabel="Unit"
            items={FT_AND_M}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].LidarMinRange : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarMinRange`}
            change={this.props.change}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarMaxRange`}
            fieldLabel="Maximum range"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarMaxRangeUnit`}
            fieldLabel="Unit"
            items={FT_AND_M}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].LidarMaxRange : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarMaxRange`}
            change={this.props.change}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarDistResolution`}
            fieldLabel="Distance resolution"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarDistResolutionUnit`}
            fieldLabel="Unit"
            items={IN_AND_CM}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].LidarDistResolution : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarDistResolution`}
            change={this.props.change}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarScanRate`}
            fieldLabel="Scan rate (Hz)"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarAngularResolution`}
            fieldLabel="Angular resolution (Hz)"
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarPower`}
            fieldLabel="Power unit (W)"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarVoltage`}
            fieldLabel="Voltage (V)"
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarWeightUnit`}
            fieldLabel="Unit"
            items={LB_AND_KG}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].LidarWeight : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarWeight`}
            change={this.props.change}
          />
      </div>
    </div>
    )
  }
}
