import React from 'react';
import { Field } from 'redux-form'
import LogbookSelectField from '../../helpers/LogbookSelectField';
import LogbookTextField from '../../helpers/LogbookTextField';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
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

const OZ_AND_G = [
  {value: 1, name: 'oz', rate: 0.035274},
  {value: 2, name: 'g', rate: 28.3495},
];

class SaveSensorHelpText extends React.Component {
  render() {
    const style = {
      display: 'inline-block',
      padding: 5,
      textAlign: 'left',
    };

    return (
      <Paper
        name={`${this.props.sensorName}.SaveSensorFormHelp`}
        style={style}
        zDepth={1}
      >
        <div>
          Placeholder text.
        </div>
      </Paper>
    )
  }
}

export default class RGBForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    }
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  componentWillMount() {
    if (this.props.formValues.dataCollection_Sensors[this.props.index].CommunitySensors) {
      if (this.props.formValues.dataCollection_Sensors[this.props.index].Type === 1) {
        const sensorIndex = this.props.formValues.dataCollection_Sensors[this.props.index].CommunitySensors;
        const sensorData = communitySensors.rgb()[sensorIndex - 1];
        const sensorName = this.props.sensorName;
        this.props.change(`${sensorName}.RGBWidth`, sensorData.width);
        this.props.change(`${sensorName}.RGBHeight`, sensorData.height);
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
        <LogbookTextField
          fieldName={`${sensorName}.RGBMake`}
          fieldLabel="Make"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Make}
          change={change}
        />
        <LogbookTextField
          fieldName={`${sensorName}.RGBModel`}
          fieldLabel="Model"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Model}
          change={change}
        />
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
          step="0.01"
        />
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
          <div><SaveSensorHelpText sensorName={sensorName} /></div>
        }
      </div>
    )
  }
}
