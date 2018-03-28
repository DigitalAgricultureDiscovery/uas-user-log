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

const IN_AND_MM = [
  {value: 1, name: 'in', rate: 0.0393701},
  {value: 2, name: 'mm', rate: 25.4},
];

const OZ_AND_G = [
  {value: 1, name: 'oz', rate: 0.035274},
  {value: 2, name: 'g', rate: 28.3495},
];

const TRIGGERING_OPTIONS = [
  {value: 1, name: 'Timer mode'},
  {value: 2, name: 'Overlap mode'},
  {value: 3, name: 'External trigger mode (PWM, GPIO, serial, and Ethernet options)'},
  {value: 4, name: 'Manual capture mode'}
];

export default class MultispectralForm extends React.Component {
  render() {
    return (
      <div>
        Sensor size
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiHorizontal`}
            fieldLabel="Horizontal"
            required={true}
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiVertical`}
            fieldLabel="Vertical"
            required={true}
            type="number"
            step="0.01"
          />
        </div>
        <LogbookSelectField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiSizeUnit`}
          fieldLabel="Unit"
          items={IN_AND_MM}
          setDefault={true}
          valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].MultiHorizontal : null}
          valueToConvert2={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].MultiVertical : null}
          valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiHorizontal`}
          valueToConvert2FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiVertical`}
          change={this.props.change}
        />
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiBands`}
          fieldLabel="Number of spectral bands"
          required={true}
          type="number"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiGSD`}
            fieldLabel="Ground sample distance"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiGSDUnit`}
            fieldLabel="Unit"
            items={IN_AND_CM}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].MultiGSD : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiGSD`}
            change={this.props.change}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiFOV`}
            fieldLabel="Field of view"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiFOVUnit`}
            fieldLabel="Unit"
            items={IN_AND_CM}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].MultiFOV : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiFOV`}
            change={this.props.change}
          />
        </div>
        <LogbookSelectField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiTriggeringOption`}
          fieldLabel="Triggering option"
          required={true}
          items={TRIGGERING_OPTIONS}
          setDefault={true}
          change={this.props.change}
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiWeight`}
            fieldLabel="Weight"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiWeightUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].MultiWeight : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiWeight`}
            change={this.props.change}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiPixelSize`}
            fieldLabel="Pixel size (microns)"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiPixelDepth`}
            fieldLabel="Pixel depth"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiFrameRate`}
          fieldLabel="Frame rate (Hz)"
          required={true}
          type="number"
          step="0.1"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiImageFormat`}
            fieldLabel="Image data format"
            required={true}
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiVideoFormat`}
            fieldLabel="Video data format"
            required={true}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiElectronicShutter`}
            fieldLabel="Electronic shutter"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiGain`}
            fieldLabel="Gain selection"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiVoltage`}
            fieldLabel="Voltage requirement (V)"
            required={true}
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.MultiPower`}
            fieldLabel="Power consumption (W)"
            required={true}
            type="number"
            step="0.1"
          />
        </div>
      </div>
    )
  }
}
