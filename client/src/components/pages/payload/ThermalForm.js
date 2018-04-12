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
    width: 128,
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

const IN_AND_MM = [
  {value: 1, name: 'in', rate: 0.0393701},
  {value: 2, name: 'mm', rate: 25.4},
];

export default class ThermalForm extends React.Component {
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
      if (formValues.dataCollection_Sensors[index].Type === 5) {
        const sensorIndex = formValues.dataCollection_Sensors[index].CommunitySensors;
        const sensorData = communitySensors.thermal()[sensorIndex - 1];
        // Initial form with specs from community sensor
        this.props.change(`${sensorName}.ThermalDimensionWidth`, sensorData.width);
        this.props.change(`${sensorName}.ThermalDimensionHeight`, sensorData.height);
        this.props.change(`${sensorName}.ThermalDimensionDepth`, sensorData.depth);
        this.props.change(`${sensorName}.ThermalSpectralBand`, sensorData.spectralBand);
        this.props.change(`${sensorName}.ThermalFrameRate`, sensorData.frameRate);
        this.props.change(`${sensorName}.ThermalImager`, sensorData.imager);
        this.props.change(`${sensorName}.ThermalMeasurementAcc`, sensorData.accuracy);
        this.props.change(`${sensorName}.ThermalLens`, sensorData.lens);
        this.props.change(`${sensorName}.ThermalFOV`, sensorData.fov);
        this.props.change(`${sensorName}.ThermalVoltage`, sensorData.voltage);
        this.props.change(`${sensorName}.ThermalPower`, sensorData.power);
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
          fieldName={`${sensorName}.ThermalMake`}
          fieldLabel="Make"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Make}
          change={change}
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalModel`}
          fieldLabel="Model"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Model}
          change={change}
        />
        <Subheader style={STYLES.subheader}>Dimensions (WxHxD) and Weight</Subheader>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalDimensionWidth`}
            fieldLabel="Width"
            type="number"
            step="0.01"
            style={STYLES.unit}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalDimensionHeight`}
            fieldLabel="Height"
            type="number"
            step="0.01"
            style={STYLES.unit}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalDimensionDepth`}
            fieldLabel="Depth"
            type="number"
            step="0.01"
            style={STYLES.unit}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.ThermalDimensionSizeUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].ThermalDimensionWidth : null}
            valueToConvert2={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].ThermalDimensionHeight : null}
            valueToConvert3={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].ThermalDimensionDepth : null}
            valueToConvert1FieldName={`${sensorName}.ThermalDimensionWidth`}
            valueToConvert2FieldName={`${sensorName}.ThermalDimensionHeight`}
            valueToConvert3FieldName={`${sensorName}.ThermalDimensionDepth`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <Subheader style={STYLES.subheader}>Spatial and Spectral Bands</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalSpectralBand`}
          fieldLabel="Spectral band (microns)"
        />
        <Subheader style={STYLES.subheader}>Camera</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalFrameRate`}
          fieldLabel="Frame rate (Hz)"
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalImager`}
          fieldLabel="Imager"
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalMeasurementAcc`}
          fieldLabel="Measurement accuracy"
        />
        {/* Sensor resolution
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalResolutionWidth`}
            fieldLabel="Width"
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalResolutionHeight`}
            fieldLabel="Height"
            type="number"
            step=""
          />
        </div> */}
        <LogbookTextField
          fieldName={`${sensorName}.ThermalLens`}
          fieldLabel="Lens"
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalFOV`}
          fieldLabel="Visible camera FOV (degree)"
          type="number"
          step="0.01"
        />
        {/* Visible camera resolution
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalVisibleCameraWidth`}
            fieldLabel="Width"
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalVisibleCameraHeight`}
            fieldLabel="Height"
            type="number"
            step="0.01"
          />
        </div> */}
        <Subheader style={STYLES.subheader}>Inputs and Power Consumption</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalVoltage`}
          fieldLabel="Voltage requirement (V)"
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalPower`}
          fieldLabel="Power consumption (W)"
        />
        <Subheader style={STYLES.subheader}>Share</Subheader>
        <Field
          name={`${sensorName}.ThermalSave`}
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
