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

export default class RGBForm extends React.Component {
  render() {
    const { index, sensorName, formValues, change } = this.props;
    return (
      <div>
        Sensor size
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.RGBWidth`}
            fieldLabel="Width"
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.RGBHeight`}
            fieldLabel="Height"
            type="number"
            step="0.01"
          />
        </div>
        <LogbookSelectField
          fieldName={`${sensorName}.RGBSizeUnit`}
          fieldLabel="Unit"
          items={IN_AND_MM}
          setDefault={true}
          valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].RGBWidth : null}
          valueToConvert2={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].RGBHeight : null}
          valueToConvert1FieldName={`${sensorName}.RGBWidth`}
          valueToConvert2FieldName={`${sensorName}.RGBHeight`}
          change={change}
          step="0.01"
        />
        <LogbookTextField
          fieldName={`${sensorName}.RGBLensType`}
          fieldLabel="Lens type"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.RGBWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.RGBWeightUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].RGBWeight : null}
            valueToConvert1FieldName={`${sensorName}.RGBWeight`}
            change={change}
            step="0.01"
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.RGBPixelCount`}
          fieldLabel="Pixel count"
          type="number"
        />
        <LogbookTextField
          fieldName={`${sensorName}.RGBPixelPitch`}
          fieldLabel="Pixel pitch (microns)"
          type="number"
          step="0.1"
        />
      </div>
    )
  }
}
