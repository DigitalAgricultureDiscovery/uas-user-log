import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { TextField }                        from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import IconButton                           from 'material-ui/IconButton';
import RaisedButton                         from 'material-ui/RaisedButton';
// material-ui icons
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import BatteryFullIcon   from 'material-ui/svg-icons/device/battery-full';
// material-ui colors
import {lightGreen500, red500} from 'material-ui/styles/colors';

import validate from './utils/validate';

class BatteriesUsedText extends React.Component {
  render() {
    return (
      <Field
        name="batteriesUsedText"
        component={TextField}
        floatingLabelText="Number of batteries used at a time"
        type="number"
      />
    )
  }
}

class BatteriesUASText extends React.Component {
  render() {
    return (
      <Field
        name="BatteriesUASText"
        component={TextField}
        floatingLabelText="Number of batteries on UAS"
        type="number"
      />
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
        backgroundColor={lightGreen500}
        icon={<BatteryFullIcon />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderBatteries = ({ fields, change, hasBatteries }) => (
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
          <br />
          <BatteryWeightText fieldName={`${battery}.batteryWeight`} />
          <br />
          <BatteryChargeStatusText
            fieldTargetName={`${battery}.batteryTargetText`}
            fieldMinimumName={`${battery}.batteryMinimumText`}
            batteryIndex={index}
            change={change}
            hasBatteries={hasBatteries}
          />
          <br />
        </li>
      )}
    </ul>
    <AddBatteryButton addNewBattery={() => fields.push({})} />
  </div>
);

class BatteryWeightText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Battery weight"
        type="number"
      />
    )
  }
}

class BatteryChargeStatusText extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.hasBatteries[this.props.batteryIndex]).length < 1) {
      this.props.change(this.props.fieldTargetName, 100.00);
      this.props.change(this.props.fieldMinimumName, 30.00);
    }
  }

  render() {
    return (
      <div>
        <br />
        Charge status
        <br />
        <Field
          name={this.props.fieldTargetName}
          className="batteryTarget"
          component={TextField}
          floatingLabelText="Target (%)"
          type="number"
          step="0.001"
        />&nbsp;
        <Field
          name={this.props.fieldMinimumName}
          className="batteryMinimum"
          component={TextField}
          floatingLabelText="Minimum (%)"
          type="number"
          step="0.001"
        />
      </div>
    )
  }
}

class Battery extends React.Component {
  render() {
    const { handleSubmit, previousPage, batteries } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Battery" />
        <CardText>
          <BatteriesUsedText />
          <br />
          <BatteriesUASText />
          <br />
          <FieldArray name="batteries" component={renderBatteries} change={this.props.change} hasBatteries={batteries}/>
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

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Battery);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const batteries = selector(state, 'batteries');
    return {
      batteries
    }
  }
)(myReduxForm);
