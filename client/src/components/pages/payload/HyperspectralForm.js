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

const OZ_AND_G = [
  {value: 1, name: 'oz', rate: 0.035274},
  {value: 2, name: 'g', rate: 28.3495},
];

// const G_AND_KG = [
//   {value: 1, name: 'g', rate: 1000},
//   {value: 2, name: 'kg', rate: 0.001},
// ];

const OPERATION_MODES = [
  {value: 1, name: 'Push-broom'},
  {value: 2, name: 'Snapshot'},
];

export default class HyperspectralForm extends React.Component {
  render() {
    const { index, sensorName, formValues, change } = this.props;
    return (
      <div>
        <LogbookSelectField
          fieldName={`${sensorName}.HyperOperationMode`}
          fieldLabel="Operation mode"
          items={OPERATION_MODES}
          setDefault={true}
          change={change}
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.HyperWeightUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].HyperWeight : null}
            valueToConvert1FieldName={`${sensorName}.HyperWeight`}
            change={change}
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperSpatialBands`}
            fieldLabel="Spatial bands"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.HyperSpectralBands`}
            fieldLabel="Spectral bands"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperFrameRate`}
            fieldLabel="Frame rate (Hz)"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.HyperDispersion`}
            fieldLabel="Dispersion per pixel"
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperFWHM`}
            fieldLabel="FWHM slit image"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.HyperLens`}
            fieldLabel="Lens"
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperStorage`}
            fieldLabel="Storage"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.HyperInterface`}
            fieldLabel="Interface"
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperSize`}
            fieldLabel="Size (exclusive of GPS unit)"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.HyperSizeUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].HyperSize : null}
            valueToConvert1FieldName={`${sensorName}.HyperSize`}
            change={change}
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperWeightMinusLens`}
            fieldLabel="Weight (without lens)"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.HyperWeightMinusLensUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].HyperWeightMinusLens : null}
            valueToConvert1FieldName={`${sensorName}.HyperWeightMinusLens`}
            change={change}
            step="0.1"
          />
        </div>
      </div>
    )
  }
}
