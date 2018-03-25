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

export default class RGBForm extends React.Component {
  render() {
    return (
      <div>
        Sensor size
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBWidth`}
            fieldLabel="Width"
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBHeight`}
            fieldLabel="Height"
            type="number"
            step="0.01"
          />
        </div>
        <LogbookSelectField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBSizeUnit`}
          fieldLabel="Unit"
          items={IN_AND_MM}
          setDefault={true}
          valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].RGBWidth : null}
          valueToConvert2={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].RGBHeight : null}
          valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBWidth`}
          valueToConvert2FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBHeight`}
          change={this.props.change}
        />
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBLensType`}
          fieldLabel="Lens type"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBWeightUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`] ? this.props.formValues[`${PAGE_NAME}Sensor${this.props.index + 1}`].RGBWeight : null}
            valueToConvert1FieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBWeight`}
            change={this.props.change}
          />
        </div>
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBPixelCount`}
          fieldLabel="Pixel count"
          type="number"
        />
        <LogbookTextField
          fieldName={`${PAGE_NAME}Sensor${this.props.index + 1}.RGBPixelPitch`}
          fieldLabel="Pixel pitch (microns)"
          type="number"
          step="0.1"
        />
      </div>
    )
  }
}
