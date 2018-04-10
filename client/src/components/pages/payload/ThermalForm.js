import React from 'react';
import { Field } from 'redux-form'
import LogbookSelectField from '../../helpers/LogbookSelectField';
import LogbookTextField from '../../helpers/LogbookTextField';
import SaveSensorHelp from '../../helpers/SaveSensorHelp';
import IconButton from 'material-ui/IconButton';
import { Toggle } from 'redux-form-material-ui';
// material-ui icons
import HelpIcon from 'material-ui/svg-icons/action/help';
import communitySensors from '../../helpers/communitySensors';

const PAGE_NAME = 'payload_Sensors';

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
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
        <LogbookTextField
          fieldName={`${sensorName}.ThermalMake`}
          fieldLabel="Make"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Make}
          change={change}
          style={UNIT_STYLE}
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalModel`}
          fieldLabel="Model"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Model}
          change={change}
        />
        Dimensions
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.ThermalDimensionWidth`}
            fieldLabel="Width"
            type="number"
            step="0.01"
            style={UNIT_STYLE}
          />
          <LogbookTextField
            fieldName={`${sensorName}.ThermalDimensionHeight`}
            fieldLabel="Height"
            type="number"
            step="0.01"
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.ThermalDimensionDepth`}
          fieldLabel="Depth"
          type="number"
          step="0.01"
        />
        <LogbookSelectField
          fieldName={`${sensorName}.ThermalDimensionSizeUnit`}
          fieldLabel="Dimensions Unit"
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
        {/* Sensor resolution
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
        </div> */}
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
        {/* Visible camera resolution
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
        </div> */}
        <LogbookTextField
          fieldName={`${sensorName}.ThermalVoltage`}
          fieldLabel="Voltage requirement (V)"
          type="number"
          step="0.1"
        />
        <LogbookTextField
          fieldName={`${sensorName}.ThermalPower`}
          fieldLabel="Power consumption (W)"
          type="number"
          step="0.1"
        />
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
      </div>
    )
  }
}
