import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm, getFormValues, formValueSelector } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import IconButton                           from 'material-ui/IconButton';
import RaisedButton                         from 'material-ui/RaisedButton';
// material-ui icons
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import BatteryFullIcon   from 'material-ui/svg-icons/device/battery-full';
// material-ui colors
import {red500} from 'material-ui/styles/colors';
// helpers
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate from '../helpers/validate';

const PAGE_NAME = 'battery_';

const STYLES = {
  shortField: {
    marginRight: 10,
    width: 182,
  },
  unit: {
    marginRight: 10,
    width: 64,
  },
}

const OZ_AND_G = [
  {value: 1, name: 'oz', rate: 0.035274},
  {value: 2, name: 'g', rate: 28.3495},
];

class BatteryChargeSubForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFullChargeChange = this.handleFullChargeChange.bind(this);
    this.handleDischargeChange = this.handleDischargeChange.bind(this);
  }

  componentWillUpdate(nextProps) {
    // Update full charge and discharge voltages based on number of cells entered
    if (nextProps.currentBatteries) {
      if (nextProps.currentBatteries[nextProps.batteryIndex]) {
        if (this.props.currentBatteries[this.props.batteryIndex].NumOfCells !== nextProps.currentBatteries[this.props.batteryIndex].NumOfCells) {
          this.props.change(`${PAGE_NAME}Batteries[${this.props.batteryIndex}].FullChargeVoltage`, this.getFullChargeVoltage(parseInt(nextProps.currentBatteries[this.props.batteryIndex].NumOfCells, 10)));
          this.props.change(`${PAGE_NAME}Batteries[${this.props.batteryIndex}].DischargeVoltage`, this.getDischargeVoltage(parseInt(nextProps.currentBatteries[this.props.batteryIndex].NumOfCells, 10)));
        }
      }
    }
  }

  handleFullChargeChange(event) {
    this.props.change(`${PAGE_NAME}Batteries[${this.props.batteryIndex}].FullChargeVoltage`, event.target.value);
  }

  handleDischargeChange(event) {
    this.props.change(`${PAGE_NAME}Batteries[${this.props.batteryIndex}].DischargeVoltage`, event.target.value);
  }

  getFullChargeVoltage(cells) {
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

  getDischargeVoltage(cells) {
    switch (cells) {
      case 1:
        return 3.5;
      case 2:
        return 7.0;
      case 3:
        return 10.5;
      case 4:
        return 14.0;
      case 5:
        return 17.5;
      case 6:
        return 21.0;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={this.props.fullChargeName}
            fieldLabel="Full charge voltage"
            required={true}
            type="number"
            step="0.1"
            style={STYLES.shortField}
            min="0.1"
            handleChange={this.handleFullChargeChange}
          />
          <span style={{marginTop: 49, fontSize: 12}}>volt</span>
        </div>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={this.props.dischargeName}
            fieldLabel="Discharge voltage"
            required={true}
            type="number"
            step="0.1"
            style={STYLES.shortField}
            min="0.1"
            handleChange={this.handleDischargeChange}
          />
          <span style={{marginTop: 49, fontSize: 12}}>volt (or as per manufacturer's recommendation)</span>
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
            fieldName={`${battery}.BatteryID`}
            fieldLabel="Battery ID"
          />
          <div style={{display: 'flex'}}>
            <LogbookTextField
              fieldName={`${battery}.Weight`}
              fieldLabel="Weight"
              type="number"
              min="1"
              style={STYLES.shortField}
            />
            <LogbookSelectField
              fieldName={`${battery}.WeightUnit`}
              fieldLabel="Unit"
              items={OZ_AND_G}
              setDefault={true}
              valueToConvert1={formValues[`${PAGE_NAME}Batteries`][`${index}`] ? formValues[`${PAGE_NAME}Batteries`][`${index}`].Weight : null}
              valueToConvert1FieldName={`${PAGE_NAME}Batteries[${index}].Weight`}
              change={change}
              style={STYLES.unit}
            />
          </div>
          <LogbookTextField
            fieldName={`${battery}.NumOfCells`}
            fieldLabel="Number of cells"
            required={true}
            type="number"
            min="1"
            max="6"
          />
          <BatteryChargeSubForm
            fullChargeName={`${battery}.FullChargeVoltage`}
            dischargeName={`${battery}.DischargeVoltage`}
            batteryIndex={index}
            change={change}
            currentBatteries={currentBatteries}
          />
        </li>
      )}
    </ul>
    <AddBatteryButton addNewBattery={() => fields.push({})} />
    {(touched || submitFailed) && error && <p><span className="error-msg">{error}</span></p>}
  </div>
);

class Battery extends React.Component {
  componentDidMount() {
    this.props.trackPage('Battery');
  }

  render() {
    const { handleSubmit, previousPage, currentBatteries, formValues } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Battery" />
        <CardText>
          <LogbookTextField
            fieldName={`${PAGE_NAME}OnUAS`}
            fieldLabel="Number of batteries on UAS"
            required={true}
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
