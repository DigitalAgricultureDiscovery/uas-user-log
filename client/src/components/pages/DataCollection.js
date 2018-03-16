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
// material-ui colorsz
import {red500} from 'material-ui/styles/colors';

import validate from '../helpers/validate';

const chemicals = [
  {value: 0, name: 'Herbicide'},
  {value: 1, name: 'Insecticide'},
  {value: 2, name: 'Fungicide'},
  {value: 3, name: 'Plant Growth Regulator (PGR)'},
  {value: 4, name: 'Nutrients'},
  {value: 5, name: 'Other'},
];

class ChemicalTypeSelect extends React.Component {
  menuItems(chemicals) {
    return chemicals.map((chemical) => (
      <MenuItem
        key={chemical.value}
        value={chemical.value}
        primaryText={chemical.name}
      />
    ))
  }
  render() {
    return (
      <Field
        name="chemicalTypeSelect"
        component={SelectField}
        floatingLabelText="Select a chemical type"
      >
        {this.menuItems(chemicals)}
      </Field>
    )
  }
}

class ChemicalOtherText extends React.Component {
  render() {
    return (
      <Field
        name="chemicalOtherText"
        component={TextField}
        floatingLabelText="Enter other chemical type"
      />
    )
  }
}

class ApplicateRateText extends React.Component {
  render() {
    return (
      <Field
        name="applicationRateText"
        component={TextField}
        floatingLabelText="Application rate"
        type="number"
        step="0.01"
      />
    )
  }
}

class ApplicationRateUnitSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    const convertedAppRate = (index === 0 ? this.props.currentAppRate * 0.106907 : this.props.currentAppRate * 9.35396);
    this.props.change('applicationRateText', convertedAppRate.toFixed(2));
  }

  render() {
    return (
      <Field
        name="appRateUnitSelect"
        component={SelectField}
        floatingLabelText="Unit"
        onChange={this.handleChange}
      >
        <MenuItem value={0} primaryText="gallons/acre" />
        <MenuItem value={1} primaryText="l/ha" />
      </Field>
    )
  }
}

class ChemicalRateText extends React.Component {
  render() {
    return (
      <Field
        name="chemicalRateText"
        component={TextField}
        floatingLabelText="Chemical rate"
        type="number"
        step="0.01"
      />
    )
  }
}

class StartingVolumeText extends React.Component {
  render() {
    return (
      <Field
        name="startingVolumeText"
        component={TextField}
        floatingLabelText="Starting volume"
        type="number"
        step="0.01"
      />
    )
  }
}

class NozzleTypeText extends React.Component {
  render() {
    return (
      <Field
        name="nozzleTypeText"
        component={TextField}
        floatingLabelText="Nozzle type"
      />
    )
  }
}

class OrificeSizeText extends React.Component {
  render() {
    return (
      <Field
        name="orificeSizeText"
        component={TextField}
        floatingLabelText="Orifice size"
        type="number"
        step="0.01"
      />
    )
  }
}

class PressureText extends React.Component {
  render() {
    return (
      <Field
        name="pressureText"
        component={TextField}
        floatingLabelText="Pressure"
        type="number"
        step="0.01"
      />
    )
  }
}

class PressureUnitSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    console.log(this.props.currentPressure);
    console.log(index);
    const convertedPressure = (index === 0 ? this.props.currentPressure * 0.000145038 : this.props.currentPressure * 6894.76);
    this.props.change('pressureText', convertedPressure.toFixed(5));
  }

  render() {
    return (
      <Field
        name="pressureUnitSelect"
        component={SelectField}
        floatingLabelText="Unit"
        onChange={this.handleChange}
      >
        <MenuItem value={0} primaryText="psi" />
        <MenuItem value={1} primaryText="Pascal" />
      </Field>
    )
  }
}

class EffectiveSwathText extends React.Component {
  render() {
    return (
      <Field
        name="effectiveSwathText"
        component={TextField}
        floatingLabelText="Effective swath distance between passes"
        type="number"
        step="0.01"
      />
    )
  }
}

class EffectiveSwathUnitSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    const convertedEffectiveSwath = (index === 0 ? this.props.currentEffectiveSwath * 43560 : this.props.currentEffectiveSwath * 0.000022956841138659);
    this.props.change('effectiveSwathText', convertedEffectiveSwath.toFixed(5));
  }

  render() {
    return (
      <Field
        name="effectiveSwathUnitSelect"
        component={SelectField}
        floatingLabelText="Unit"
        onChange={this.handleChange}
      >
        <MenuItem value={0} primaryText="sq ft" />
        <MenuItem value={1} primaryText="acre" />
      </Field>
    )
  }
}

class ApplicationTypeSelect extends React.Component {
  render() {
    return (
      <Field
        name="applicationTypeSelect"
        component={SelectField}
        floatingLabelText="Type of application"
      >
        <MenuItem value={0} primaryText="Precision" />
        <MenuItem value={1} primaryText="Uniform" />
      </Field>
    )
  }
}

class OtherSprayInputs extends React.Component {
  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <ApplicateRateText />&nbsp;
          <ApplicationRateUnitSelect
            currentAppRate={this.props.currentAppRate}
            change={this.props.change}
          />
        </div>
        <br />
        <ChemicalRateText /><br />
        <StartingVolumeText /><br />
        <NozzleTypeText /><br />
        <OrificeSizeText /><br />
        <div style={{display: 'flex'}}>
          <PressureText />&nbsp;
          <PressureUnitSelect
            currentPressure={this.props.currentPressure}
            change={this.props.change}
          />
        </div>
        <br />
        <div style={{display: 'flex'}}>
          <EffectiveSwathText />&nbsp;
          <EffectiveSwathUnitSelect
            currentEffectiveSwath={this.props.currentEffectiveSwath}
            change={this.props.change}
          />
        </div>
        <br />
        <ApplicationTypeSelect />
      </div>
    )
  }
}

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

const sensors = [
  {value: 0, name: 'RGB'},
  {value: 1, name: 'Multispectral'},
  {value: 2, name: 'Hyperspectral'},
  {value: 3, name: 'LiDAR'},
  {value: 4, name: 'Other'},
];

class SensorOtherText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Enter sensor type"
      />
    )
  }
}

class SensorTypeSelect extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length < 1) {
      this.props.change(this.props.fieldName, 0);
    }
  }

  menuItems(sensors) {
    return sensors.map((sensor) => (
      <MenuItem
        key={sensor.value}
        value={sensor.value}
        primaryText={sensor.name}
      />
    ));
  }

  render() {
    const otherSelected = (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length > 0 & this.props.currentSensors[this.props.sensorIndex].sensorType === 4 ? true : false);
    return (
      <div>
        <Field
          name={this.props.fieldTypeName}
          component={SelectField}
          floatingLabelText="Type of sensor"
        >
          {this.menuItems(sensors)}
        </Field>
        <br />
        {otherSelected ? <SensorOtherText fieldName={this.props.fieldOtherName} /> : null}
      </div>
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

const operations = [
  {value: 0, name: 'Operated by mission planner'},
  {value: 1, name: 'Time interval'},
];

class TimeIntervalText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Enter time interval"
        type="number"
        step="0.01"
      />
    )
  }
}

class OperationModeSelect extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length < 1) {
      this.props.change(this.props.fieldName, 0);
    }
  }

  menuItems(operations) {
    return operations.map((operation) => (
      <MenuItem
        key={operation.value}
        value={operation.value}
        primaryText={operation.name}
      />
    ));
  }

  render() {
    const otherSelected = (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length > 0 & this.props.currentSensors[this.props.sensorIndex].operationMode === 1 ? true : false);
    return (
      <div>
        <Field
          name={this.props.fieldModeName}
          component={SelectField}
          floatingLabelText="Operation mode"
        >
          {this.menuItems(operations)}
        </Field>
        <br />
        {otherSelected ? <TimeIntervalText fieldName={this.props.fieldTimeName} /> : null}
      </div>
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

const formats = [
  {value: 0, name: 'Raw'},
  {value: 1, name: 'Tiff'},
  {value: 2, name: 'Jpeg'},
  {value: 3, name: 'Video'},
  {value: 4, name: 'Other'},
];

class DataFormatOtherText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Enter data format"
      />
    )
  }
}

class DataFormatSelect extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length < 1) {
      this.props.change(this.props.fieldName, 0);
    }
  }

  menuItems(formats) {
    return formats.map((format) => (
      <MenuItem
        key={format.value}
        value={format.value}
        primaryText={format.name}
      />
    ));
  }

  render() {
    const otherSelected = (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length > 0 & this.props.currentSensors[this.props.sensorIndex].dataFormat === 4 ? true : false);
    return (
      <div>
        <Field
          name={this.props.fieldFormatName}
          component={SelectField}
          floatingLabelText="Data format"
        >
          {this.menuItems(formats)}
        </Field>
        <br />
        {otherSelected ? <DataFormatOtherText fieldName={this.props.fieldOtherName} /> : null}
      </div>
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
        backgroundColor="#B46012"
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
          <SensorTypeSelect
            fieldTypeName={`${sensor}.sensorType`}
            fieldOtherName={`${sensor}.sensorOther`}
            currentSensors={currentSensors}
            sensorIndex={index}
            change={change}
          />
          <br />
          <SensorMakeText fieldName={`${sensor}.sensorMake`} />
          &nbsp;
          <SensorModelText fieldName={`${sensor}.sensorModel`} />
          <br />
          <OperationModeSelect
            fieldModeName={`${sensor}.operationMode`}
            fieldTimeName={`${sensor}.timeInterval`}
            currentSensors={currentSensors}
            sensorIndex={index}
            change={change}
          />
          <br />
          <LapText
            fieldEndName={`${sensor}.endLap`}
            fieldSideName={`${sensor}.sideLap`}
            currentSensors={currentSensors}
            change={change}
            sensorIndex={index}
          />
          <br />
          <DataFormatSelect
            fieldFormatName={`${sensor}.dataFormat`}
            fieldOtherName={`${sensor}.otherFormat`}
            currentSensors={currentSensors}
            change={change}
            sensorIndex={index}
          />
        </li>
      )}
    </ul>
    <AddSensorButton addNewSensor={() => fields.push({})} />
  </div>
);

class DataCollection extends React.Component {
  render() {
    const { handleSubmit, previousPage, currentSensors, isSpray, chemicalType, currentAppRate, currentPressure, currentEffectiveSwath } = this.props;
    const otherIndex = 5;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Data Collection" />
        <CardText>
          {isSpray !== 3 &&
            <div>
              <SensorsUsedText />
              <br />
              <FieldArray
                name="sensors"
                component={renderSensors}
                change={this.props.change}
                currentSensors={currentSensors}
              />
            </div>
          }
          {isSpray === 3 &&
            <div>
              <ChemicalTypeSelect />
              {chemicalType === otherIndex ? <div><ChemicalOtherText /></div> : null}
              <OtherSprayInputs
                change={this.props.change}
                currentAppRate={currentAppRate}
                currentPressure={currentPressure}
                currentEffectiveSwath={currentEffectiveSwath}
              />
            </div>
          }
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
})(DataCollection);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentSensors = selector(state, 'sensors');
    const isSpray = selector(state, 'typeSelect');
    const chemicalType = selector(state, 'chemicalTypeSelect');
    const currentAppRate = selector(state, 'applicationRateText');
    const currentPressure = selector(state, 'pressureText');
    const currentEffectiveSwath = selector(state, 'effectiveSwathText');
    return {
      currentSensors,
      isSpray,
      chemicalType,
      currentAppRate,
      currentPressure,
      currentEffectiveSwath,
    }
  }
)(myReduxForm);
