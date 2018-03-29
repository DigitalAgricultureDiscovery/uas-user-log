import React from 'react';
import LogbookSelectField from '../../helpers/LogbookSelectField';
import LogbookTextField from '../../helpers/LogbookTextField';

const PAGE_NAME = 'payload_Sensors';

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

const IN_AND_MM = [
  {value: 1, name: 'in', rate: 0.0393701},
  {value: 2, name: 'mm', rate: 25.4},
];

export default class ThermalForm extends React.Component {
  render() {
    const { index, sensorName, formValues, change } = this.props;
    return (
      <div>
        Dimensions
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalDimensionWidth`}
            fieldLabel="Width"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalDimensionLength`}
            fieldLabel="Length"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalDimensionHeight`}
          fieldLabel="Height"
          required={true}
          type="number"
          step="0.1"
        />
        <LogbookSelectField
          fieldName={`${sensorName}.ThermalDimensionSizeUnit`}
          fieldLabel="Dimensions Unit"
          required={true}
          items={IN_AND_MM}
          setDefault={true}
          valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].ThermalDimensionWidth : null}
          valueToConvert2={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].ThermalDimensionLength : null}
          valueToConvert3={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].ThermalDimensionHeight : null}
          valueToConvert1FieldName={`${sensorName}.ThermalDimensionWidth`}
          valueToConvert2FieldName={`${sensorName}.ThermalDimensionLength`}
          valueToConvert3FieldName={`${sensorName}.ThermalDimensionHeight`}
          change={change}
          step="0.1"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalSpectralBand`}
            fieldLabel="Spectral band (microns)"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalFrameRate`}
            fieldLabel="Frame rate (Hz)"
            required={true}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalImager`}
            fieldLabel="Imager"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalMeasurementAcc`}
            fieldLabel="Measurement accuracy"
            required={true}
          />
        </div>
        Sensor resolution
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalResolutionWidth`}
            fieldLabel="Width"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalResolutionHeight`}
            fieldLabel="Height"
            required={true}
            type="number"
            step=""
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalLens`}
          fieldLabel="Lens"
          required={true}
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalFOV`}
          fieldLabel="Visible camera FOV (degree)"
          required={true}
          type="number"
          step="0.1"
        />
        Visible camera resolution
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalVisibleCameraWidth`}
            fieldLabel="Width"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalVisibleCameraHeight`}
            fieldLabel="Height"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalVoltage`}
          fieldLabel="Input voltage (V)"
          required={true}
          type="number"
          step="0.1"
        />
      </div>
    )
  }
}
