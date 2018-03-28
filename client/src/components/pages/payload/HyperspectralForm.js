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

const OZ_AND_G = [
  {value: 1, name: 'oz', rate: 0.035274},
  {value: 2, name: 'g', rate: 28.3495},
];

const G_AND_KG = [
  {value: 1, name: 'g', rate: 1000},
  {value: 2, name: 'kg', rate: 0.001},
];

const OPERATION_MODES = [
  {value: 1, name: 'Push-broom'},
  {value: 2, name: 'Snapshot'},
];

export default class HyperspectralForm extends React.Component {
  render() {
    return (
      <div>
        <LogbookSelectField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperOperationMode`}
          fieldLabel="Operation mode"
          required={true}
          items={OPERATION_MODES}
          setDefault={true}
          change={this.props.change}
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperWeight`}
            fieldLabel="Weight"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperWeightUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].HyperWeight : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperWeight`}
            change={this.props.change}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperSpatialBands`}
            fieldLabel="Spatial bands"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperSpectralBands`}
            fieldLabel="Spectral bands"
            required={true}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperFrameRate`}
            fieldLabel="Frame rate (Hz)"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperDispersion`}
            fieldLabel="Dispersion per pixel"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperFWHM`}
            fieldLabel="FWHM slit image"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperLens`}
            fieldLabel="Lens"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperStorage`}
            fieldLabel="Storage"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperInterface`}
            fieldLabel="Interface"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperSize`}
            fieldLabel="Size (exclusive of GPS unit)"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperSizeUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].HyperSize : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperSize`}
            change={this.props.change}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperWeightMinusLens`}
            fieldLabel="Weight (without lens)"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperWeightMinusLensUnit`}
            fieldLabel="Unit"
            items={G_AND_KG}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].HyperWeightMinusLens : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.HyperWeightMinusLens`}
            change={this.props.change}
          />
        </div>
      </div>
    )
  }
}
