import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
// helpers
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate from '../helpers/validate';

const PAGE_NAME = 'dataCollection_';

const STYLES = {
  shortField: {
    marginRight: 10,
    width: 172,
  },
  shortFieldB: {
    marginRight: 10,
    width: 144,
  },
  unit: {
    width: 74,
  },
  unitB: {
    width: 102,
  },
};

const CHEMICALS = [
  {value: 1, name: 'Herbicide'},
  {value: 2, name: 'Insecticide'},
  {value: 3, name: 'Fungicide'},
  {value: 4, name: 'Plant Growth Regulator (PGR)'},
  {value: 5, name: 'Nutrients'},
  {value: 6, name: 'Other'},
];

const APPLICATIONS = [
  {value: 1, name: 'Precision'},
  {value: 2, name: 'Uniform'},
];

const OZ_AC_AND_ML_HA = [
  {value: 1, name: 'oz/ac', rate: 0.013684},
  {value: 2, name: 'ml/ha', rate: 73.0778},
];

const GAL_AC_AND_L_HA = [
  {value: 1, name: 'gal/ac', rate: 0.01069},
  {value: 2, name: 'l/ha', rate: 9.3540},
];

const GAL_AND_L = [
  {value: 1, name: 'gal', rate: 0.264172},
  {value: 2, name: 'l', rate: 3.78541},
];

const PSI_AND_KPA = [
  {value: 1, name: 'psi', rate: 0.0145038},
  {value: 2, name: 'kPa', rate: 6.89476},
];

const FT_AND_M = [
  {value: 1, name: 'ft', rate: 3.28084},
  {value: 2, name: 'm', rate: 0.3048},
];

const AC_AND_HA = [
  {value: 1, name: 'ac', rate: 2.47105},
  {value: 2, name: 'ha', rate: 0.404686},
];

const PPM_AND_PPB = [
  {value: 1, name: 'ppm', rate: 0.001},
  {value: 2, name: 'ppb', rate: 1000},
]

class DataCollectionSpray extends React.Component {
  componentDidMount() {
    this.props.trackPage('Data Collection Spray');
  }

  render() {
    const {
      handleSubmit,
      previousPage,
      chemicalType,
      currentApplicationRate,
      currentChemicalRate,
      currentStartingVolume,
      currentPressure,
      currentSwathDistance,
      currentSwathArea,
    } = this.props;

    const otherIndex = 6;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Data Collection" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}ChemicalType`}
            fieldLabel="Select a chemical type"
            required={true}
            items={CHEMICALS}
            setDefault={false}
          />
          {chemicalType === otherIndex ?
            <LogbookTextField
              fieldName={`${PAGE_NAME}ChemicalOther`}
              fieldLabel="Other chemical type"
              required={true}
            />
            : null
          }
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}ApplicationRate`}
              fieldLabel="Application rate"
              required={true}
              type="number"
              step="0.01"
              style={STYLES.shortFieldB}
              min="0.01"
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}ApplicationRateUnit`}
              fieldLabel="Unit"
              items={GAL_AC_AND_L_HA}
              setDefault={false}
              valueToConvert1={currentApplicationRate}
              valueToConvert1FieldName={`${PAGE_NAME}ApplicationRate`}
              change={this.props.change}
              step="0.01"
              style={STYLES.unitB}
            />
          </div>
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}ChemicalRate`}
              fieldLabel="Chemical rate"
              required={true}
              type="number"
              step="0.01"
              style={STYLES.shortFieldB}
              min="0.01"
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}ChemicalRateUnit`}
              fieldLabel="Unit"
              items={chemicalType !== 6 ? OZ_AC_AND_ML_HA : PPM_AND_PPB}
              setDefault={false}
              valueToConvert1={currentChemicalRate}
              valueToConvert1FieldName={`${PAGE_NAME}ChemicalRate`}
              change={this.props.change}
              step="0.01"
              style={STYLES.unitB}
            />
          </div>
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}StartingVolume`}
              fieldLabel="Starting volume"
              required={true}
              type="number"
              step="0.01"
              style={STYLES.shortFieldB}
              min="0.01"
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}StartingVolumeUnit`}
              fieldLabel="Unit"
              items={GAL_AND_L}
              setDefault={false}
              valueToConvert1={currentStartingVolume}
              valueToConvert1FieldName={`${PAGE_NAME}StartingVolume`}
              change={this.props.change}
              step="0.01"
              style={STYLES.unitB}
            />
          </div>
          <LogbookTextField
            fieldName={`${PAGE_NAME}NozzleNumber`}
            fieldLabel="Number of nozzles"
            required={true}
            type="number"
            min="1"
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}NozzleType`}
            fieldLabel="Nozzle type"
            required={true}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}OrificeSize`}
            fieldLabel="Orifice size"
            required={true}
          />
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}Pressure`}
              fieldLabel="Pressure"
              required={true}
              type="number"
              step="0.01"
              style={STYLES.shortFieldB}
              min="0.01"
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}PressureUnit`}
              fieldLabel="Unit"
              items={PSI_AND_KPA}
              setDefault={false}
              valueToConvert1={currentPressure}
              valueToConvert1FieldName={`${PAGE_NAME}Pressure`}
              change={this.props.change}
              step="0.01"
              style={STYLES.unitB}
            />
          </div>
          <div style={{marginTop: 15}}>Effective swath</div>
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}SwathDistance`}
              fieldLabel="Distance between passes"
              required={true}
              type="number"
              step="0.01"
              style={STYLES.shortField}
              min="0.01"
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}SwathDistanceUnit`}
              fieldLabel="Unit"
              items={FT_AND_M}
              setDefault={false}
              valueToConvert1={currentSwathDistance}
              valueToConvert1FieldName={`${PAGE_NAME}SwathDistance`}
              change={this.props.change}
              step="0.01"
              style={STYLES.unit}
            />
          </div>
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}SwathArea`}
              fieldLabel="Total target area"
              required={true}
              type="number"
              step="0.01"
              style={STYLES.shortField}
              min="0.01"
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}SwathAreaUnit`}
              fieldLabel="Unit"
              items={AC_AND_HA}
              setDefault={false}
              valueToConvert1={currentSwathArea}
              valueToConvert1FieldName={`${PAGE_NAME}SwathArea`}
              change={this.props.change}
              step="0.01"
              style={STYLES.unit}
            />
          </div>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}ApplicationType`}
            fieldLabel="Type of application"
            required={true}
            items={APPLICATIONS}
            setDefault={false}
          />
        </CardText>
        <CardActions>
          <PrevButton onClick={previousPage} />
          <NextButton />
        </CardActions>
      </form>
    )
  }
}

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(DataCollectionSpray);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const chemicalType = selector(state, PAGE_NAME + 'ChemicalType');
    const currentApplicationRate = selector(state, PAGE_NAME + 'ApplicationRate');
    const currentChemicalRate = selector(state, PAGE_NAME + 'ChemicalRate');
    const currentStartingVolume = selector(state, PAGE_NAME + 'StartingVolume');
    const currentPressure = selector(state, PAGE_NAME + 'Pressure');
    const currentSwathDistance = selector(state, PAGE_NAME + 'SwathDistance');
    const currentSwathArea = selector(state, PAGE_NAME + 'SwathArea');

    return {
      chemicalType,
      currentApplicationRate,
      currentChemicalRate,
      currentStartingVolume,
      currentPressure,
      currentSwathDistance,
      currentSwathArea,
    }
  }
)(myReduxForm);
