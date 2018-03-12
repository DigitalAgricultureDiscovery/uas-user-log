import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
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

class EndLapText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="End lap"
        type="number"
      />
    )
  }
}

class SideLapText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Side lap"
        type="number"
      />
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

const renderSensors = ({ fields, change }) => (
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
          <EndLapText fieldName={`${sensor}.endLap`} />
          &nbsp;
          <SideLapText fieldName={`${sensor}.sideLap`} />
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
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Data Collection" />
        <CardText>
          <SensorsUsedText />
          <br />
          <FieldArray name="sensors" component={renderSensors} />
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
})(DataCollection);
