import React from 'react';
import LogbookSelectField from '../../helpers/LogbookSelectField';
import LogbookTextField from '../../helpers/LogbookTextField';

const PAGE_NAME = 'payload_';

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

const IN_AND_MM = [
  {value: 1, name: 'in', rate: 0.0393701},
  {value: 2, name: 'mm', rate: 25.4},
];

export default class ThermalForm extends React.Component {
  render() {
    return (
      <div>
        Dimensions
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalDimensionWidth`}
            fieldLabel="Width"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalDimensionLength`}
            fieldLabel="Length"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalDimensionHeight`}
          fieldLabel="Height"
          required={true}
          type="number"
          step="0.1"
        />
        <LogbookSelectField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalDimensionSizeUnit`}
          fieldLabel="Dimensions Unit"
          required={true}
          items={IN_AND_MM}
          setDefault={true}
          valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].ThermalDimensionWidth : null}
          valueToConvert2={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].ThermalDimensionLength : null}
          valueToConvert3={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].ThermalDimensionHeight : null}
          valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalDimensionWidth`}
          valueToConvert2FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalDimensionLength`}
          valueToConvert3FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalDimensionHeight`}
          change={this.props.change}
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalSpectralBand`}
            fieldLabel="Spectral band (microns)"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalFrameRate`}
            fieldLabel="Frame rate (Hz)"
            required={true}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalImager`}
            fieldLabel="Imager"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.thermalMeasurementAcc`}
            fieldLabel="Measurement accuracy"
            required={true}
          />
        </div>
        Sensor resolution
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalResolutionWidth`}
            fieldLabel="Width"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalResolutionHeight`}
            fieldLabel="Height"
            required={true}
            type="number"
            step=""
          />
        </div>
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalLens`}
          fieldLabel="Lens"
          required={true}
        />
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalFOV`}
          fieldLabel="Visible camera FOV (degree)"
          required={true}
          type="number"
          step="0.1"
        />
        Visible camera resolution
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalVisibleCameraWidth`}
            fieldLabel="Width"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalVisibleCameraHeight`}
            fieldLabel="Height"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.ThermalVoltage`}
          fieldLabel="Input voltage (V)"
          required={true}
          type="number"
          step="0.1"
        />
      </div>
    )
  }
}
