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
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarModel`}
            fieldLabel="Model"
            required={true}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarHorizontalFOV`}
            fieldLabel="Horizontal FOV (Degree)"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarVerticalFOV`}
            fieldLabel="Vertical FOV (Degree)"
            required={true}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarMinRange`}
            fieldLabel="Minimum range"
            required={true}
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
            required={true}
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
            required={true}
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
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarAngularResolution`}
            fieldLabel="Angular resolution (Hz)"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarPower`}
            fieldLabel="Power unit (W)"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarVoltage`}
            fieldLabel="Voltage (V)"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.LidarWeight`}
            fieldLabel="Weight"
            required={true}
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
