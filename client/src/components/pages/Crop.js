import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
// helpers
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate from '../helpers/validate';

const PAGE_NAME = 'crop_';

const LIFE_CYCLE_ITEMS = [
  {value: 1, name: 'Annual'},
  {value: 2, name: 'Perennial'},
];

class YearDatePicker extends React.Component {
  render() {
    return (
      <Field
        name={`${PAGE_NAME}YearDate`}
        className={this.props.required ? "required" : null}
        component={TextField}
        type="date"
        floatingLabelText="Year of planting"
        floatingLabelFixed={true}
      />
    )
  }
}

class AnnualSubForm extends React.Component {
  render() {
    return (
      <div>
        <LogbookTextField fieldName={`${PAGE_NAME}Variety`} fieldLabel="Variety/Genotype" />
        <LogbookTextField fieldName={`${PAGE_NAME}SeedSource`} fieldLabel="Seed source" />
        <LogbookTextField fieldName={`${PAGE_NAME}SeedStock`} fieldLabel="Seed stock" />
      </div>
    )
  }
}

class PerennialSubForm extends React.Component {
  render() {
    return (
      <div>
        <YearDatePicker />
        <LogbookTextField fieldName={`${PAGE_NAME}Rootstock`} fieldLabel="Rootstock" />
        <LogbookTextField fieldName={`${PAGE_NAME}Scion`} fieldLabel="Scion" />
      </div>
    )
  }
}

class Crop extends React.Component {
  componentDidMount() {
    this.props.trackPage('Crop');
  }

  render() {
    const { handleSubmit, previousPage, currentLifeCycle } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Crop" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}LifeCycle`}
            fieldLabel="Crop Life Cycle"
            items={LIFE_CYCLE_ITEMS}
            setDefault={false}
          />
          <LogbookTextField fieldName={`${PAGE_NAME}Name`} fieldLabel="Crop name" />
          <LogbookTextField fieldName={`${PAGE_NAME}GrowthStage`} fieldLabel="Growth stage" />
          { currentLifeCycle ? (currentLifeCycle === 1 ? <AnnualSubForm /> : <PerennialSubForm />) : null }
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
})(Crop);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentLifeCycle = selector(state, 'crop_LifeCycle');
    return {
      currentLifeCycle
    }
  }
)(myReduxForm);
