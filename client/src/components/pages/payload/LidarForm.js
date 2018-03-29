import React from 'react';
import LogbookSelectField from '../../helpers/LogbookSelectField';
import LogbookTextField from '../../helpers/LogbookTextField';

const PAGE_NAME = 'payload_Sensors';

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
    const { index, sensorName, formValues, change } = this.props;
    return (
      <div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarManufacturer`}
            fieldLabel="Manufacturer"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.LidarModel`}
            fieldLabel="Model"
            required={true}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarHorizontalFOV`}
            fieldLabel="Horizontal FOV (Degree)"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.LidarVerticalFOV`}
            fieldLabel="Vertical FOV (Degree)"
            required={true}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarMinRange`}
            fieldLabel="Minimum range"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.LidarMinRangeUnit`}
            fieldLabel="Unit"
            items={FT_AND_M}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].LidarMinRange : null}
            valueToConvert1FieldName={`${sensorName}.LidarMinRange`}
            change={change}
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarMaxRange`}
            fieldLabel="Maximum range"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.LidarMaxRangeUnit`}
            fieldLabel="Unit"
            items={FT_AND_M}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].LidarMaxRange : null}
            valueToConvert1FieldName={`${sensorName}.LidarMaxRange`}
            change={change}
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarDistResolution`}
            fieldLabel="Distance resolution"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.LidarDistResolutionUnit`}
            fieldLabel="Unit"
            items={IN_AND_CM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].LidarDistResolution : null}
            valueToConvert1FieldName={`${sensorName}.LidarDistResolution`}
            change={change}
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarScanRate`}
            fieldLabel="Scan rate (Hz)"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.LidarAngularResolution`}
            fieldLabel="Angular resolution (Hz)"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarPower`}
            fieldLabel="Power unit (W)"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.LidarVoltage`}
            fieldLabel="Voltage (V)"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarWeight`}
            fieldLabel="Weight"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.LidarWeightUnit`}
            fieldLabel="Unit"
            items={LB_AND_KG}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].LidarWeight : null}
            valueToConvert1FieldName={`${sensorName}.LidarWeight`}
            change={change}
            step="0.1"
          />
      </div>
    </div>
    )
  }
}
