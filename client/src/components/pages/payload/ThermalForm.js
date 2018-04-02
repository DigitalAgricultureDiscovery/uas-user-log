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
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalDimensionLength`}
            fieldLabel="Length"
            type="number"
            step="0.1"
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalDimensionHeight`}
          fieldLabel="Height"
          type="number"
          step="0.1"
        />
        <LogbookSelectField
          fieldName={`${sensorName}.ThermalDimensionSizeUnit`}
          fieldLabel="Dimensions Unit"
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
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalFrameRate`}
            fieldLabel="Frame rate (Hz)"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalImager`}
            fieldLabel="Imager"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalMeasurementAcc`}
            fieldLabel="Measurement accuracy"
          />
        </div>
        Sensor resolution
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalResolutionWidth`}
            fieldLabel="Width"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalResolutionHeight`}
            fieldLabel="Height"
            type="number"
            step=""
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalLens`}
          fieldLabel="Lens"
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalFOV`}
          fieldLabel="Visible camera FOV (degree)"
          type="number"
          step="0.1"
        />
        Visible camera resolution
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalVisibleCameraWidth`}
            fieldLabel="Width"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalVisibleCameraHeight`}
            fieldLabel="Height"
            type="number"
            step="0.1"
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalVoltage`}
          fieldLabel="Input voltage (V)"
          type="number"
          step="0.1"
        />
      </div>
    )
  }
}
