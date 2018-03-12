import React from 'react';
import { Field, reduxForm } from 'redux-form';
// material-ui elements
import { DatePicker, SelectField, TextField } from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText }   from 'material-ui/Card';
import FlatButton                             from 'material-ui/FlatButton';
import RaisedButton                           from 'material-ui/RaisedButton';
import MenuItem                               from 'material-ui/MenuItem';

import validate from './utils/validate';

class LifeCycleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
    this.props.updateAnnual(value === 1 ? true : false);
  }

  render() {
    return (
      <Field
        name="lifeCycleSelect"
        component={SelectField}
        floatingLabelText="Crop lifecycle"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Annual" />
        <MenuItem value={2} primaryText="Perennial" />
      </Field>
    )
  }
}

class CropNameText extends React.Component {
  render() {
    return (
      <Field
        name="cropNameText"
        component={TextField}
        floatingLabelText="Crop name"
      />
    )
  }
}

class GrowthStageText extends React.Component {
  render() {
    return (
      <Field
        name="growthStageText"
        component={TextField}
        floatingLabelText="Growth stage"
      />
    )
  }
}

class VarietyText extends React.Component {
  render() {
    return (
      <Field
        name="varietyText"
        component={TextField}
        floatingLabelText="Variety/Genotype"
      />
    )
  }
}

class SeedSourceText extends React.Component {
  render() {
    return (
      <Field
        name="seedSourceText"
        component={TextField}
        floatingLabelText="Seed source"
      />
    )
  }
}

class SeedStockText extends React.Component {
  render() {
    return (
      <Field
        name="seedStockText"
        component={TextField}
        floatingLabelText="Seed stock"
      />
    )
  }
}

class YearDatePicker extends React.Component {
  render() {
    return (
      <Field
        name="yearDatePicker"
        component={DatePicker}
        format={null}
        floatingLabelText="Year of planting"
        openToYearSelection={true}
      />
    )
  }
}

class RootstockText extends React.Component {
  render() {
    return (
      <Field
        name="rootstockText"
        component={TextField}
        floatingLabelText="Rootstock"
      />
    )
  }
}

class ScionText extends React.Component {
  render() {
    return (
      <Field
        name="scionText"
        component={TextField}
        floatingLabelText="Scion"
      />
    )
  }
}

class AnnualTexts extends React.Component {
  render() {
    return (
      <div>
        <VarietyText />
        <br />
        <SeedSourceText />
        <br />
        <SeedStockText />
      </div>
    )
  }
}

class PerennialTexts extends React.Component {
  render() {
    return (
      <div>
        <YearDatePicker />
        <RootstockText />
        <br />
        <ScionText />
      </div>
    )
  }
}

class Crop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnnual: true,
    }
    this.updateAnnual = this.updateAnnual.bind(this);
  }

  updateAnnual(isAnnual) {
    this.setState({
      isAnnual: isAnnual
    });
  }

  render() {
    const isAnnual = this.state.isAnnual;
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Crop" />
        <CardText>
          <LifeCycleSelect updateAnnual={ this.updateAnnual }/>
          <br />
          <CropNameText />
          <br />
          <GrowthStageText />
          <br />
          { isAnnual ? <PerennialTexts /> : <AnnualTexts /> }
        </CardText>
        <CardActions>
          <FlatButton
            className="previous"
            label="Prevous"
            onClick={previousPage}
          />
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            primary={true}
          />
        </CardActions>
      </form>
    )
  }
}

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Crop);
