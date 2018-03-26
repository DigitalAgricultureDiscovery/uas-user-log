import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm, formValueSelector } from 'redux-form';
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

class BatteryChargeSubForm extends React.Component {
  render() {
    return (
      <div>
        <div>
          <LogbookTextField
            fieldName={this.props.fullChargeName}
            fieldLabel="Full charge voltage"
            style={UNIT_STYLE}
          />
          <span style={{verticalAlign: 'middle'}}>volts/cell</span>
        </div>
        <div>
          <LogbookTextField
            fieldName={this.props.dischargeName}
            fieldLabel="Discharge voltage"
            style={UNIT_STYLE}
          />
          <span style={{verticalAlign: 'middle'}}>volts/cell (as per manufacturer's recommendation)</span>
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

const renderBatteries = ({ fields, change, currentBatteries, meta: { touched, error, submitFailed } }) => (
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
          <LogbookTextField fieldName={`${battery}.SerialNumber`} fieldLabel="Serial number" />
          <LogbookTextField fieldName={`${battery}.Weight`} fieldLabel="Weight" />
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
  componentWillUpdate(nextProps) {
    // console.log(nextProps.numberOfBatteries);
  }
  render() {
    const { handleSubmit, previousPage, currentBatteries, numberOfBatteries } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Battery" />
        <CardText>
          <LogbookTextField fieldName={`${PAGE_NAME}Used`} fieldLabel="Number of batteries used at a time" />
          <LogbookTextField fieldName={`${PAGE_NAME}OnUAS`} fieldLabel="Number of batteries on UAS" />
          <FieldArray
            name={`${PAGE_NAME}Batteries`}
            component={renderBatteries}
            change={this.props.change}
            currentBatteries={currentBatteries}
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
    const numberOfBatteries = selector(state, PAGE_NAME + 'Used');
    const currentBatteries = selector(state, PAGE_NAME + 'Batteries');
    return {
      currentBatteries,
      numberOfBatteries,
    }
  }
)(myReduxForm);
