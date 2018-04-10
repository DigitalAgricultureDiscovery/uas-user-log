import React from 'react';
import { Field } from 'redux-form'
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
  dimensions: {
    marginRight: 15,
    width: 100,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  imageSensor: {
    marginRight: 15,
    width: 128,
  },
  makemodel: {
    marginRight: 15,
    width: 156,
  },
  subheader: {
    paddingLeft: 0,
    marginTop: 15,
  },
  unit: {
    display: 'inline-block', marginRight: 15,
  },
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
      if (formValues.dataCollection_Sensors[index].Type === 1) {
        const sensorIndex = formValues.dataCollection_Sensors[index].CommunitySensors;
        const sensorData = communitySensors.rgb()[sensorIndex - 1];
        // Initial form with specs from community sensor
        this.props.change(`${sensorName}.RGBWidth`, sensorData.width);
        this.props.change(`${sensorName}.RGBHeight`, sensorData.height);
        this.props.change(`${sensorName}.RGBDepth`, sensorData.depth);
        this.props.change(`${sensorName}.RGBLensType`, sensorData.lensType);
        this.props.change(`${sensorName}.RGBWeight`, sensorData.weight);
        this.props.change(`${sensorName}.RGBPixelCount`, sensorData.pixelCount);
        this.props.change(`${sensorName}.RGBPixelPitch`, sensorData.pixelPitch);
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
        <Subheader style={STYLES.subheader}>Make and model</Subheader>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.RGBMake`}
            fieldLabel="Make"
            setDefault={true}
            defaultValue={formValues.dataCollection_Sensors[index].Make}
            change={change}
            style={STYLES.makemodel}
          />
          <LogbookTextField
            fieldName={`${sensorName}.RGBModel`}
            fieldLabel="Model"
            setDefault={true}
            defaultValue={formValues.dataCollection_Sensors[index].Model}
            change={change}
          />
        </div>
        <Subheader style={STYLES.subheader}>Dimensions and Weight</Subheader>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.RGBWidth`}
            fieldLabel="Width"
            type="number"
            step="0.01"
            fullWidth
            style={STYLES.dimensions}
          />
          <LogbookTextField
            fieldName={`${sensorName}.RGBHeight`}
            fieldLabel="Height"
            type="number"
            step="0.01"
            fullWidth
            style={STYLES.dimensions}
          />
          <LogbookTextField
            fieldName={`${sensorName}.RGBDepth`}
            fieldLabel="Depth"
            type="number"
            step="0.01"
            fullWidth
            style={STYLES.dimensions}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.RGBSizeUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            style={STYLES.dimensions}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].RGBWidth : null}
            valueToConvert2={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].RGBHeight : null}
            valueToConvert3={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].RGBDepth : null}
            valueToConvert1FieldName={`${sensorName}.RGBWidth`}
            valueToConvert2FieldName={`${sensorName}.RGBHeight`}
            valueToConvert3FieldName={`${sensorName}.RGBDepth`}
            change={change}
            step="0.01"
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.RGBWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.01"
            style={STYLES.dimensions}
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
            style={STYLES.dimensions}
          />
        </div>
        <Subheader style={STYLES.subheader}>Image sensor</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.RGBLensType`}
          fieldLabel="Lens type"
        />
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.RGBPixelCount`}
            fieldLabel="Pixel count"
            style={STYLES.imageSensor}
          />
          <LogbookTextField
            fieldName={`${sensorName}.RGBPixelPitch`}
            fieldLabel="Pixel pitch µm"
            step="0.01"
            style={STYLES.imageSensor}
          />
        </div>
        <Subheader style={STYLES.subheader}>Share</Subheader>
        <Field
          name={`${sensorName}.RGBSave`}
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
