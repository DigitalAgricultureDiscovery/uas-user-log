import React from 'react';
import { Field } from 'redux-form';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import LogbookSelectField from '../../helpers/LogbookSelectField';
import LogbookTextField from '../../helpers/LogbookTextField';
import SaveSensorHelp from '../../helpers/SaveSensorHelp';
import IconButton from 'material-ui/IconButton';
import { Toggle } from 'redux-form-material-ui';
// material-ui icons
import HelpIcon from 'material-ui/svg-icons/action/help';
import communitySensors from '../../helpers/communitySensors';

const PAGE_NAME = 'payload_Sensors';

const STYLES = {
  divider: {
    marginTop: 10,
  },
  shortField: {
    marginRight: 10,
    width: 182,
  },
  subheader: {
    paddingLeft: 0,
    marginTop: 15,
  },
  unit: {
    marginRight: 10,
    width: 64,
  },
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

// class TriggeringOptionsSelect extends React.Component {
//   selectionRenderer = (values) => {
//     switch (values.length) {
//       case 0:
//         return '';
//       case 1:
//         return TRIGGERING_OPTIONS[values[0] - 1].name;
//       default:
//         return `${values.length} options selected`;
//     }
//   }
//
//   menuItems (options) {
//     return options.map((option) => (
//       <MenuItem
//         key={option.value}
//         insetChildren={true}
//         value={option.value}
//         checked={this.props.selectedOptions.indexOf(option.value) > -1}
//         primaryText={option.name}
//       />
//     ));
//   }
//
//   render() {
//     return (
//       <Field
//         name={`${sensorName}.MultiTriggeringOption`}
//         component={SelectField}
//         floatingLabelText="Select one or more"
//         multiple={true}
//         selectionRenderer={this.selectionRenderer}
//       >
//           {this.menuItems(TRIGGERING_OPTIONS)}
//       </Field>
//     )
//   }
// }

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
        const sensorData = communitySensors.multi()[sensorIndex - 1];
        // Initial form with specs from community sensor
        this.props.change(`${sensorName}.MultiWidth`, sensorData.width);
        this.props.change(`${sensorName}.MultiHeight`, sensorData.height);
        this.props.change(`${sensorName}.MultiDepth`, sensorData.depth);
        this.props.change(`${sensorName}.MultiWeight`, sensorData.weight);
        this.props.change(`${sensorName}.MultiBands`, sensorData.bands);
        this.props.change(`${sensorName}.MultiGSD`, sensorData.gsd);
        this.props.change(`${sensorName}.MultiHFOV`, sensorData.hfov);
        // this.props.change(`${sensorName}.MultiTriggeringOption`, sensorData.triggeringOptions);
        this.props.change(`${sensorName}.MultiPixelSize`, sensorData.pixelSize);
        this.props.change(`${sensorName}.MultiPixelDepth`, sensorData.pixelDepth);
        this.props.change(`${sensorName}.MultiFrameRate`, sensorData.frameRate);
        this.props.change(`${sensorName}.MultiImageFormat`, sensorData.imageFormat);
        this.props.change(`${sensorName}.MultiVideoFormat`, sensorData.videoFormat);
        this.props.change(`${sensorName}.MultiElectronicShutter`, sensorData.shutter);
        this.props.change(`${sensorName}.MultiGain`, sensorData.gain);
        this.props.change(`${sensorName}.MultiVoltage`, sensorData.voltage);
        this.props.change(`${sensorName}.MultiPower`, sensorData.power);
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
        <Subheader style={STYLES.subheader}>Make and Model</Subheader>
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
        <Subheader style={STYLES.subheader}>Dimensions (WxHxD) and Weight</Subheader>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiWidth`}
            fieldLabel="Width"
            type="number"
            step="0.01"
            style={STYLES.unit}
          />
          <LogbookTextField
            fieldName={`${sensorName}.MultiHeight`}
            fieldLabel="Height"
            type="number"
            step="0.01"
            style={STYLES.unit}
          />
          <LogbookTextField
            fieldName={`${sensorName}.MultiDepth`}
            fieldLabel="Depth"
            type="number"
            step="0.01"
            style={STYLES.unit}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.MultiSizeUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiWidth : null}
            valueToConvert2={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiHeight : null}
            valueToConvert3={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiDepth : null}
            valueToConvert1FieldName={`${sensorName}.MultiWidth`}
            valueToConvert2FieldName={`${sensorName}.MultiHeight`}
            valueToConvert3FieldName={`${sensorName}.MultiDepth`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.01"
            style={STYLES.unit}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.MultiWeightUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiWeight : null}
            valueToConvert1FieldName={`${sensorName}.MultiWeight`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <Subheader style={STYLES.subheader}>Spatial and Spectral Bands</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.MultiBands`}
          fieldLabel="Number of spectral bands"
          type="number"
        />
        <Subheader style={STYLES.subheader}>Camera</Subheader>
        <LogbookSelectField
          fieldName={`${sensorName}.MultiTriggeringOption`}
          fieldLabel="Triggering option"
          items={TRIGGERING_OPTIONS}
          setDefault={true}
          change={change}
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.MultiGSD`}
            fieldLabel="Ground sample distance"
            type="number"
            step="0.01"
            style={STYLES.shortField}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.MultiGSDUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].MultiGSD : null}
            valueToConvert1FieldName={`${sensorName}.MultiGSD`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.MultiHFOV`}
          fieldLabel="Horizontal Field of View (degree)"
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiPixelSize`}
          fieldLabel="Pixel size (microns)"
          type="number"
          step="0.01"
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiPixelDepth`}
          fieldLabel="Pixel depth"
          type="number"
          step="0.01"
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiFrameRate`}
          fieldLabel="Frame rate (Hz)"
          type="number"
          step="0.01"
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiElectronicShutter`}
          fieldLabel="Electronic shutter"
          type="number"
          step="0.01"
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiGain`}
          fieldLabel="Gain selection"
          type="number"
          step="0.01"
        />
        <Subheader style={STYLES.subheader}>Outputs</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.MultiImageFormat`}
          fieldLabel="Image data format"
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiVideoFormat`}
          fieldLabel="Video data format"
        />
        <Subheader style={STYLES.subheader}>Inputs and Power Consumption</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.MultiVoltage`}
          fieldLabel="Voltage requirement (V)"
        />
        <LogbookTextField
          fieldName={`${sensorName}.MultiPower`}
          fieldLabel="Power consumption (W)"
        />
        <Subheader style={STYLES.subheader}>Share</Subheader>
        <Field
          name={`${sensorName}.MultiSave`}
          label="Share this sensor with community"
          labelPosition="right"
          component={Toggle}
          style={{display: 'inline-block', width: 'auto'}}
        />
        <IconButton
          tooltip="Learn about the benefits"
          onClick={this.toggleHelp}
        >
          <HelpIcon />
        </IconButton>
        {this.state.showHelp &&
          <div><SaveSensorHelp sensorName={sensorName} /></div>
        }
        <Divider style={STYLES.divider} />
      </div>
    )
  }
}
