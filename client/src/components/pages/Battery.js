import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm, getFormValues, formValueSelector } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import IconButton                           from 'material-ui/IconButton';
import RaisedButton                         from 'material-ui/RaisedButton';
// material-ui icons
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import BatteryFullIcon   from 'material-ui/svg-icons/device/battery-full';
// material-ui colors
import {red500} from 'material-ui/styles/colors';

import validate from '../helpers/validate';

const PAGE_NAME = 'battery_';

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

const OZ_AND_G = [
  {value: 1, name: 'oz', rate: 0.035274},
  {value: 2, name: 'g', rate: 28.3495},
];

class BatteryChargeSubForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUpdate(nextProps) {
    // Update full charge and discharge voltages based on number of cells entered
    if (nextProps.currentBatteries) {
      if (nextProps.currentBatteries[nextProps.batteryIndex]) {
        if (this.props.currentBatteries[this.props.batteryIndex].NumOfCells !== nextProps.currentBatteries[this.props.batteryIndex].NumOfCells) {
          this.props.change(`${PAGE_NAME}Batteries[${this.props.batteryIndex}].FullChargeVoltage`, this.getVoltage(parseInt(nextProps.currentBatteries[this.props.batteryIndex].NumOfCells, 10)));
          this.props.change(`${PAGE_NAME}Batteries[${this.props.batteryIndex}].DischargeVoltage`, this.getVoltage(parseInt(nextProps.currentBatteries[this.props.batteryIndex].NumOfCells, 10)));
        }
      }
    }
  }

  handleChange(event) {
    this.props.change(`${PAGE_NAME}Batteries[${this.props.batteryIndex}].FullChargeVoltage`, event.target.value);
  }

  getVoltage(cells) {
    switch (cells) {
      case 1:
        return 4.2;
      case 2:
        return 8.4;
      case 3:
        return 12.6;
      case 4:
        return 16.8;
      case 5:
        return 21.0;
      case 6:
        return 25.2;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <div>
          <LogbookTextField
            fieldName={this.props.fullChargeName}
            fieldLabel="Full charge voltage"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
            min="0.1"
            handleChange={this.handleChange}
          />
          <span style={{verticalAlign: 'middle'}}>volt</span>
        </div>
        <div>
          <LogbookTextField
            fieldName={this.props.dischargeName}
            fieldLabel="Discharge voltage"
            type="number"
            step="0.1"
            style={UNIT_STYLE}
            min="0.1"
            handleChange={this.handleChange}
          />
          <span style={{verticalAlign: 'middle'}}>volt (as per manufacturer's recommendation)</span>
        </div>
      </div>
    )
  }
}

class AddBatteryButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addNewBattery();
  }

  render() {
    return (
      <RaisedButton
        label="Add battery"
        labelPosition="before"
        backgroundColor="#B46012"
        icon={<BatteryFullIcon />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderBatteries = ({ fields, change, currentBatteries, formValues, meta: { touched, error, submitFailed } }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((battery, index) =>
        <li key={index}>
          <strong>Battery #{index + 1}</strong>
          <IconButton
            tooltip="Remove battery"
            onClick={() => fields.remove(index)}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <LogbookTextField
            fieldName={`${battery}.NumOfCells`}
            fieldLabel="Number of cells"
            type="number"
            min="1"
            max="6"
          />
          <LogbookTextField fieldName={`${battery}.BatteryID`} fieldLabel="Battery ID" />
          <BatteryChargeSubForm
            fullChargeName={`${battery}.FullChargeVoltage`}
            dischargeName={`${battery}.DischargeVoltage`}
            batteryIndex={index}
            change={change}
            currentBatteries={currentBatteries}
          />
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${battery}.Weight`}
              fieldLabel="Weight"
              type="number"
              min="1"
              style={UNIT_STYLE}
            />
            <LogbookSelectField
              fieldName={`${battery}.WeightUnit`}
              fieldLabel="Unit"
              items={OZ_AND_G}
              setDefault={true}
              valueToConvert1={formValues[`${PAGE_NAME}Batteries`][`${index}`] ? formValues[`${PAGE_NAME}Batteries`][`${index}`].Weight : null}
              valueToConvert1FieldName={`${PAGE_NAME}Batteries[${index}].Weight`}
              change={change}
            />
          </div>
        </li>
      )}
    </ul>
    <AddBatteryButton addNewBattery={() => fields.push({})} />
    {(touched || submitFailed) && error && <p><span className="error-msg">{error}</span></p>}
  </div>
);

class Battery extends React.Component {
  render() {
    const { handleSubmit, previousPage, currentBatteries, formValues } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Battery" />
        <CardText>
          <LogbookTextField
            fieldName={`${PAGE_NAME}OnUAS`}
            fieldLabel="Number of batteries on UAS"
            type="number"
            min="1"
          />
          <FieldArray
            name={`${PAGE_NAME}Batteries`}
            component={renderBatteries}
            change={this.props.change}
            currentBatteries={currentBatteries}
            formValues={formValues}
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
})(Battery);

const selector = formValueSelector('logbook');

export default connect(
  state => {
    const currentBatteries = selector(state, PAGE_NAME + 'Batteries');
    const formValues = getFormValues('logbook')(state);
    return {
      currentBatteries,
      formValues,
    }
  }
)(myReduxForm);
