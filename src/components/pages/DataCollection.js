import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { SelectField, TextField }           from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import IconButton                           from 'material-ui/IconButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';
// material-ui icons
import DeleteForeverIcon  from 'material-ui/svg-icons/action/delete-forever';
import DeveloperBoardIcon from 'material-ui/svg-icons/hardware/developer-board';
// material-ui colors
import {lightGreen500, red500} from 'material-ui/styles/colors';

import validate from './utils/validate';

class SensorsUsedText extends React.Component {
  render() {
    return (
      <Field
        name="sensorsUsedText"
        component={TextField}
        floatingLabelText="Number of sensors used"
        type="number"
      />
    )
  }
}

class SensorTypeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
  }

  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={SelectField}
        floatingLabelText="Type of sensor"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="RGB" />
        <MenuItem value={2} primaryText="Multispectral" />
        <MenuItem value={3} primaryText="Hyperspectral" />
        <MenuItem value={4} primaryText="LiDAR" />
        <MenuItem value={5} primaryText="Other" />
      </Field>
    )
  }
}

class SensorMakeText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Make"
      />
    )
  }
}

class SensorModelText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Model"
      />
    )
  }
}

class OperationModeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
  }

  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={SelectField}
        floatingLabelText="Operation mode"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Operated by mission planner" />
        <MenuItem value={2} primaryText="Time interval" />
      </Field>
    )
  }
}

class LapText extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length < 1) {
      this.props.change(this.props.fieldEndName, 80.00);
      this.props.change(this.props.fieldSideName, 70.00);
    }
  }
  render() {
    return (
      <div>
        <Field
          name={this.props.fieldEndName}
          component={TextField}
          floatingLabelText="End lap (%)"
          type="number"
          step="0.01"
        />
        &nbsp;
        <Field
          name={this.props.fieldSideName}
          component={TextField}
          floatingLabelText="Side lap (%)"
          type="number"
          step="0.01"
        />
      </div>
    )
  }
}

class DataFormatSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
  }

  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={SelectField}
        floatingLabelText="Data format"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Raw" />
        <MenuItem value={2} primaryText="Tiff" />
        <MenuItem value={3} primaryText="Jpeg" />
        <MenuItem value={4} primaryText="Video" />
        <MenuItem value={5} primaryText="Other" />
      </Field>
    )
  }
}

class AddSensorButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addNewSensor();
  }

  render() {
    return (
      <RaisedButton
        label="Add sensor"
        labelPosition="before"
        backgroundColor={lightGreen500}
        icon={<DeveloperBoardIcon />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderSensors = ({ fields, change, currentSensors }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((sensor, index) =>
        <li key={index}>
          <strong>Sensor #{index + 1}</strong>
          <IconButton
            tooltip="Remove sensor"
            onClick={() => fields.remove(index)}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <br />
          <SensorTypeSelect fieldName={`${sensor}.sensorType`} />
          <br />
          <SensorMakeText fieldName={`${sensor}.sensorMake`} />
          &nbsp;
          <SensorModelText fieldName={`${sensor}.sensorModel`} />
          <br />
          <OperationModeSelect fieldName={`${sensor}.operationMode`} />
          <br />
          <LapText
            fieldEndName={`${sensor}.endLap`}
            fieldSideName={`${sensor}.sideLap`}
            currentSensors={currentSensors}
            change={change}
            sensorIndex={index}
          />
          <br />
          <DataFormatSelect fieldName={`${sensor}.dataFormat`} />
        </li>
      )}
    </ul>
    <AddSensorButton addNewSensor={() => fields.push({})} />
  </div>
);

class DataCollection extends React.Component {
  render() {
    const { handleSubmit, previousPage, currentSensors } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Data Collection" />
        <CardText>
          <SensorsUsedText />
          <br />
          <FieldArray
            name="sensors"
            component={renderSensors}
            change={this.props.change}
            currentSensors={currentSensors} />
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
})(DataCollection);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentSensors = selector(state, 'sensors');
    return {
      currentSensors
    }
  }
)(myReduxForm);
