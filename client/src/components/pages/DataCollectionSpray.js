import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';

import validate from '../helpers/validate';

const PAGE_NAME = 'dataCollection_';

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

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

const GAL_AND_L = [
  {value: 1, name: 'gal/ac', rate: 0.1069},
  {value: 2, name: 'l/ha', rate: 9.3540},
];

const PSI_AND_PA = [
  {value: 1, name: 'psi', rate: 0.000145038},
  {value: 2, name: 'Pa', rate: 6894.76},
];

const FT_AND_M = [
  {value: 1, name: 'ft', rate: 3.28084},
  {value: 2, name: 'm', rate: 0.3048},
];

const AC_AND_HA = [
  {value: 1, name: 'ac', rate: 2.47105},
  {value: 2, name: 'ha', rate: 0.404686},
];

class DataCollectionSpray extends React.Component {
  render() {
    const {
      handleSubmit,
      previousPage,
      chemicalType,
      currentApplicationRate,
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
            items={CHEMICALS}
            setDefault={false}
          />
          {chemicalType === otherIndex ?
            <LogbookTextField
              fieldName={`${PAGE_NAME}ChemicalOther`}
              fieldLabel="Enter other chemical type" />
            : null
          }
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}ApplicatonRate`}
              fieldLabel="Application rate"
              type="number"
              step="0.01"
              style={UNIT_STYLE}
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}ApplicationRateUnit`}
              fieldLabel="Unit"
              items={GAL_AND_L}
              setDefault={false}
              currentValue={currentApplicationRate}
              currentValueField={`${PAGE_NAME}ApplicationRate`}
              change={this.props.change}
            />
          </div>
          <LogbookTextField
            fieldName={`${PAGE_NAME}ChemicalRate`}
            fieldLabel="Chemical rate"
            type="number"
            step="0.01"
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}StartingVolume`}
            fieldLabel="Starting volume"
            type="number"
            step="0.01"
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}NozzleType`}
            fieldLabel="Nozzle type"
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}OrificeSize`}
            fieldLabel="Orifice size"
            type="number"
            step="0.01"
          />
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}Pressure`}
              fieldLabel="Pressure"
              type="number"
              step="0.01"
              style={UNIT_STYLE}
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}PressureUnit`}
              fieldLabel="Unit"
              items={PSI_AND_PA}
              setDefault={false}
              currentValue={currentPressure}
              currentValueField={`${PAGE_NAME}Pressure`}
              change={this.props.change}
            />
          </div>
          <div style={{marginTop: 15}}>Effective swath</div>
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}SwathDistance`}
              fieldLabel="Distance between passes"
              type="number"
              step="0.01"
              style={UNIT_STYLE}
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}SwathDistanceUnit`}
              fieldLabel="Unit"
              items={FT_AND_M}
              setDefault={false}
              currentValue={currentSwathDistance}
              currentValueField={`${PAGE_NAME}SwathDistance`}
              change={this.props.change}
            />
          </div>
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${PAGE_NAME}SwathArea`}
              fieldLabel="Area between passes"
              type="number"
              step="0.01"
              style={UNIT_STYLE}
            />
            <LogbookSelectField
              fieldName={`${PAGE_NAME}SwathAreaUnit`}
              fieldLabel="Unit"
              items={AC_AND_HA}
              setDefault={false}
              currentValue={currentSwathArea}
              currentValueField={`${PAGE_NAME}SwathArea`}
              change={this.props.change}
            />
          </div>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}ApplicationType`}
            fieldLabel="Type of application"
            items={APPLICATIONS}
            setDefault={false}
          />
        </CardText>
        <CardActions>
          <FlatButton
            className="previous"
            label="Previous"
            onClick={previousPage}
            backgroundColor="#BAA892"
          />
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            backgroundColor="#FFD100"
          />
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
    const currentPressure = selector(state, PAGE_NAME + 'Pressure');
    const currentSwathDistance = selector(state, PAGE_NAME + 'SwathDistance');
    const currentSwathArea = selector(state, PAGE_NAME + 'SwathArea');

    return {
      chemicalType,
      currentApplicationRate,
      currentPressure,
      currentSwathDistance,
      currentSwathArea,
    }
  }
)(myReduxForm);
