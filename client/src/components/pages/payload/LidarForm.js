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

const IN_AND_CM = [
  {value: 1, name: 'in', rate: 0.393701},
  {value: 2, name: 'cm', rate: 2.54},
];

const FT_AND_M = [
  {value: 1, name: 'ft', rate: 3.28084},
  {value: 2, name: 'm', rate: 0.3048},
];

const LB_AND_KG = [
  {value: 1, name: 'lb', rate: 2.20462},
  {value: 2, name: 'kg', rate: 0.453592},
];

export default class LidarForm extends React.Component {
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
      if (formValues.dataCollection_Sensors[index].Type === 4) {
        const sensorIndex = formValues.dataCollection_Sensors[index].CommunitySensors;
        const sensorData = communitySensors.lidar()[sensorIndex - 1];
        // Initial form with specs from community sensor
        this.props.change(`${sensorName}.LidarWeight`, sensorData.weight);
        this.props.change(`${sensorName}.LidarHorizontalFOV`, sensorData.hfov);
        this.props.change(`${sensorName}.LidarVerticalFOV`, sensorData.vfov);
        this.props.change(`${sensorName}.LidarMinRange`, sensorData.minRange);
        this.props.change(`${sensorName}.LidarMaxRange`, sensorData.maxRange);
        this.props.change(`${sensorName}.LidarDistResolution`, sensorData.distResolution);
        this.props.change(`${sensorName}.LidarScanRate`, sensorData.scanRate);
        this.props.change(`${sensorName}.LidarAngularResolution`, sensorData.angResolution);
        this.props.change(`${sensorName}.LidarVoltage`, sensorData.voltage);
        this.props.change(`${sensorName}.LidarPower`, sensorData.power);
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
          fieldName={`${sensorName}.LidarMake`}
          fieldLabel="Make"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Make}
          change={change}
        />
        <LogbookTextField
          fieldName={`${sensorName}.LidarModel`}
          fieldLabel="Model"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Model}
          change={change}
        />
        <Subheader style={STYLES.subheader}>Weight</Subheader>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.01"
            style={STYLES.unit}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.LidarWeightUnit`}
            fieldLabel="Unit"
            items={LB_AND_KG}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].LidarWeight : null}
            valueToConvert1FieldName={`${sensorName}.LidarWeight`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <Subheader style={STYLES.subheader}>Camera</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.LidarHorizontalFOV`}
          fieldLabel="Horizontal FOV (Degree)"
        />
        <LogbookTextField
          fieldName={`${sensorName}.LidarVerticalFOV`}
          fieldLabel="Vertical FOV (Degree)"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarMinRange`}
            fieldLabel="Minimum range"
            type="number"
            step="0.01"
            style={STYLES.shortField}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.LidarMinRangeUnit`}
            fieldLabel="Unit"
            items={FT_AND_M}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].LidarMinRange : null}
            valueToConvert1FieldName={`${sensorName}.LidarMinRange`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarMaxRange`}
            fieldLabel="Maximum range"
            type="number"
            step="0.01"
            style={STYLES.shortField}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.LidarMaxRangeUnit`}
            fieldLabel="Unit"
            items={FT_AND_M}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].LidarMaxRange : null}
            valueToConvert1FieldName={`${sensorName}.LidarMaxRange`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.LidarDistResolution`}
            fieldLabel="Distance resolution"
            type="number"
            step="0.01"
            style={STYLES.shortField}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.LidarDistResolutionUnit`}
            fieldLabel="Unit"
            items={IN_AND_CM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].LidarDistResolution : null}
            valueToConvert1FieldName={`${sensorName}.LidarDistResolution`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <LogbookTextField
          fieldName={`${sensorName}.LidarScanRate`}
          fieldLabel="Scan rate (Hz)"
        />
        <LogbookTextField
          fieldName={`${sensorName}.LidarAngularResolution`}
          fieldLabel="Angular resolution"
        />
        <Subheader style={STYLES.subheader}>Inputs and Power Consumption</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.LidarVoltage`}
          fieldLabel="Voltage requirement (V)"
        />
        <LogbookTextField
          fieldName={`${sensorName}.LidarPower`}
          fieldLabel="Power consumption (W)"
        />
        <Subheader style={STYLES.subheader}>Share</Subheader>
        <Field
          name={`${sensorName}.LidarSave`}
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
