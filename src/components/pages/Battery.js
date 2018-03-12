import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
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

const renderBatteries = ({ fields, change }) => (
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
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Battery" />
        <CardText>
          <BatteriesUsedText />
          <br />
          <BatteriesUASText />
          <br />
          <FieldArray name="batteries" component={renderBatteries} />
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
})(Battery);
