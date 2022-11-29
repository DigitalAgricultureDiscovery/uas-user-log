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

const OZ_AND_G = [
  {value: 1, name: 'oz', rate: 0.035274},
  {value: 2, name: 'g', rate: 28.3495},
];

// const G_AND_KG = [
//   {value: 1, name: 'g', rate: 1000},
//   {value: 2, name: 'kg', rate: 0.001},
// ];

const OPERATION_MODES = [
  {value: null, name: ''},
  {value: 1, name: 'Push-broom'},
  {value: 2, name: 'Snapshot'},
];

export default class HyperspectralForm extends React.Component {
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
      if (formValues.dataCollection_Sensors[index].Type === 3) {
        const sensorIndex = formValues.dataCollection_Sensors[index].CommunitySensors;
        const sensorData = communitySensors.hyper()[sensorIndex - 1];
        // Initial form with specs from community sensor
        this.props.change(`${sensorName}.HyperWeight`, sensorData.weight);
        this.props.change(`${sensorName}.HyperSpatialBands`, sensorData.spatialBands);
        this.props.change(`${sensorName}.HyperSpectralBands`, sensorData.spectralBands);
        this.props.change(`${sensorName}.HyperSpectralRange`, sensorData.spectralRange);
        this.props.change(`${sensorName}.HyperOperationMode`, sensorData.operationMode);
        this.props.change(`${sensorName}.HyperFrameRate`, sensorData.frameRate);
        this.props.change(`${sensorName}.HyperDispersion`, sensorData.dispersion);
        this.props.change(`${sensorName}.HyperFWHM`, sensorData.fwhm);
        this.props.change(`${sensorName}.HyperLens`, sensorData.lens);
        this.props.change(`${sensorName}.HyperStorage`, sensorData.storage);
        this.props.change(`${sensorName}.HyperInterface`, sensorData.interface);
        this.props.change(`${sensorName}.HyperSize`, sensorData.sizeMinusGPS);
        this.props.change(`${sensorName}.HyperWeightMinusLens`, sensorData.weightMinusLens);
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
          fieldName={`${sensorName}.HyperMake`}
          fieldLabel="Make"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Make}
          change={change}
        />
        <LogbookTextField
          fieldName={`${sensorName}.HyperModel`}
          fieldLabel="Model"
          setDefault={true}
          defaultValue={formValues.dataCollection_Sensors[index].Model}
          change={change}
        />
        <Subheader style={STYLES.subheader}>Size and Weight</Subheader>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperSize`}
            fieldLabel="Size w/o GPS"
            type="number"
            step="0.01"
            style={STYLES.shortField}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.HyperSizeUnit`}
            fieldLabel="Unit"
            items={IN_AND_MM}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].HyperSize : null}
            valueToConvert1FieldName={`${sensorName}.HyperSize`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperWeight`}
            fieldLabel="Weight"
            type="number"
            step="0.01"
            style={STYLES.shortField}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.HyperWeightUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].HyperWeight : null}
            valueToConvert1FieldName={`${sensorName}.HyperWeight`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${sensorName}.HyperWeightMinusLens`}
            fieldLabel="Weight w/o lens"
            type="number"
            step="0.01"
            style={STYLES.shortField}
          />
          <LogbookSelectField
            fieldName={`${sensorName}.HyperWeightMinusLensUnit`}
            fieldLabel="Unit"
            items={OZ_AND_G}
            setDefault={true}
            valueToConvert1={formValues[PAGE_NAME][index] ? formValues[PAGE_NAME][index].HyperWeightMinusLens : null}
            valueToConvert1FieldName={`${sensorName}.HyperWeightMinusLens`}
            change={change}
            step="0.01"
            style={STYLES.unit}
          />
        </div>
        <Subheader style={STYLES.subheader}>Spatial and Spectral Bands</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.HyperSpatialBands`}
          fieldLabel="Spatial bands"
        />
        <LogbookTextField
          fieldName={`${sensorName}.HyperSpectralBands`}
          fieldLabel="Spectral bands"
        />
        <LogbookTextField
          fieldName={`${sensorName}.HyperSpectralRange`}
          fieldLabel="Spectral range"
        />
        <Subheader style={STYLES.subheader}>Camera</Subheader>
        <LogbookSelectField
          fieldName={`${sensorName}.HyperOperationMode`}
          fieldLabel="Operation mode"
          items={OPERATION_MODES}
          change={change}
        />
        <LogbookTextField
          fieldName={`${sensorName}.HyperFrameRate`}
          fieldLabel="Frame rate (Hz)"
        />
        <LogbookTextField
          fieldName={`${sensorName}.HyperDispersion`}
          fieldLabel="Dispersion per pixel"
        />
        <LogbookTextField
          fieldName={`${sensorName}.HyperFWHM`}
          fieldLabel="FWHM slit image"
        />
        <LogbookTextField
          fieldName={`${sensorName}.HyperLens`}
          fieldLabel="Lens"
        />
        <Subheader style={STYLES.subheader}>Outputs</Subheader>
        <LogbookTextField
          fieldName={`${sensorName}.HyperStorage`}
          fieldLabel="Storage"
        />
        <LogbookTextField
          fieldName={`${sensorName}.HyperInterface`}
          fieldLabel="Interface"
        />
        <Subheader style={STYLES.subheader}>Share</Subheader>
        <Field
          name={`${sensorName}.HyperSave`}
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
