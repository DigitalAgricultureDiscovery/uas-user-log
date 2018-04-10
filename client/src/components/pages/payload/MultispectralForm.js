import React from 'react';
import LogbookSelectField from '../../helpers/LogbookSelectField';
import LogbookTextField from '../../helpers/LogbookTextField';
import communitySensors from '../../helpers/communitySensors';

const PAGE_NAME = 'payload_Sensors';

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

// const IN_AND_CM = [
//   {value: 1, name: 'in', rate: 0.393701},
//   {value: 2, name: 'cm', rate: 2.54},
// ];

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
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    }
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  componentWillMount() {
    // Determine if any community sensors were used
    const { formValues, index, sensorName } = this.props;
    if (formValues.dataCollection_Sensors[index].CommunitySensors) {
      if (formValues.dataCollection_Sensors[index].Type === 2) {
        const sensorIndex = formValues.dataCollection_Sensors[index].CommunitySensors;
        const sensorData = communitySensors.rgb()[sensorIndex - 1];
        // Initial form with specs from community sensor
        // this.props.change(`${sensorName}.MultiHorizontal`, sensorData.horizontal);

      }
    }
  }

  toggleHelp() {
    this.setState({showHelp: !this.state.showHelp});
  }

  render() {
    const { index, sensorName, formValues, change } = this.props;
    return (
      <div>
        <LogbookTextField
          fieldName={`${sensorName}.MultiMake`}
          fieldLabel="Make"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Make}
          change={change}
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiModel`}
          fieldLabel="Model"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Model}
          change={change}
        />
        Sensor size
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiHorizontal`}
            fieldLabel="Horizontal"
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.MultiVertical`}
            fieldLabel="Vertical"
            type="number"
            step="0.01"
          />
        </div>
        <LogbookSelectField
          fieldName={`${sensorName}.MultiSizeUnit`}
          fieldLabel="Unit"
          items={IN_AND_MM}
          setDefault={true}
          valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiHorizontal : null}
          valueToConvert2={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiVertical : null}
          valueToConvert1FieldName={`${sensorName}.MultiHorizontal`}
          valueToConvert2FieldName={`${sensorName}.MultiVertical`}
          change={change}
          step="0.01"
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiBands`}
          fieldLabel="Number of spectral bands"
          type="number"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiGSD`}
            fieldLabel="Ground sample distance"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.MultiGSDUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiGSD : null}
            valueToConvert1FieldName={`${sensorName}.MultiGSD`}
            change={change}
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiFOV`}
            fieldLabel="Field of view"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.MultiFOVUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiFOV : null}
            valueToConvert1FieldName={`${sensorName}.MultiFOV`}
            change={change}
            step="0.1"
          />
        </div>
        <LogbookSelectField
          fieldName={`${sensorName}.MultiTriggeringOption`}
          fieldLabel="Triggering option"
          items={TRIGGERING_OPTIONS}
          setDefault={true}
          change={change}
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.MultiWeightUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiWeight : null}
            valueToConvert1FieldName={`${sensorName}.MultiWeight`}
            change={change}
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiPixelSize`}
            fieldLabel="Pixel size (microns)"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.MultiPixelDepth`}
            fieldLabel="Pixel depth"
            type="number"
            step="0.1"
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.MultiFrameRate`}
          fieldLabel="Frame rate (Hz)"
          type="number"
          step="0.1"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiImageFormat`}
            fieldLabel="Image data format"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.MultiVideoFormat`}
            fieldLabel="Video data format"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiElectronicShutter`}
            fieldLabel="Electronic shutter"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.MultiGain`}
            fieldLabel="Gain selection"
            type="number"
            step="0.1"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiVoltage`}
            fieldLabel="Voltage requirement (V)"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.MultiPower`}
            fieldLabel="Power consumption (W)"
            type="number"
            step="0.1"
          />
        </div>
      </div>
    )
  }
}
