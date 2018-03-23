import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm, formValueSelector } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { CardActions, CardTitle, CardText }         from 'material-ui/Card';
import FlatButton                                   from 'material-ui/FlatButton';
import IconButton                                   from 'material-ui/IconButton';
import RaisedButton                                 from 'material-ui/RaisedButton';
// material-ui icons
import DeleteForeverIcon  from 'material-ui/svg-icons/action/delete-forever';
import DeveloperBoardIcon from 'material-ui/svg-icons/hardware/developer-board';
// material-ui colorsz
import {red500} from 'material-ui/styles/colors';

import validate from '../helpers/validate';

const PAGE_NAME = 'dataCollection_';

const UNIT_STYLE = {
  display: 'inline-block', marginRight: 15,
}

const SENSORS = [
  {value: 1, name: 'RGB'},
  {value: 2, name: 'Multispectral'},
  {value: 3, name: 'Hyperspectral'},
  {value: 4, name: 'LiDAR'},
  {value: 5, name: 'Thermal'},
  {value: 6, name: 'Other'},
];

const OPERATION_MODES = [
  {value: 1, name: 'Operated by mission planner'},
  {value: 2, name: 'Time interval'},
];

const DATA_FORMATS = [
  {value: 1, name: 'Raw'},
  {value: 2, name: 'Tiff'},
  {value: 3, name: 'Jpeg'},
  {value: 4, name: 'Video'},
  {value: 5, name: 'Other'},
];

class SensorTypeSubForm extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length < 1) {
      this.props.change(this.props.typeName, 1);
    }
  }
  render() {
    const otherSelected = (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length > 0 & this.props.currentSensors[this.props.sensorIndex].Type === 6 ? true : false);
    return (
      <div>
        <LogbookSelectField
          fieldName={this.props.typeName}
          fieldLabel="Type of sensor"
          items={SENSORS}
          setDefault={false}
        />
        {otherSelected ?
          <LogbookTextField
            fieldName={this.props.otherName}
            fieldLabel="Enter other sensor type"
          />
        : null}
      </div>
    )
  }
}

class OperationModeSubForm extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length < 1) {
      this.props.change(this.props.modeName, 1);
    }
  }
  render() {
    const timeIntervalSelected = (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length > 0 & this.props.currentSensors[this.props.sensorIndex].OperationMode === 2 ? true : false);
    return (
      <div>
        <LogbookSelectField
          fieldName={this.props.modeName}
          fieldLabel="Operation mode"
          items={OPERATION_MODES}
          setDefault={false}
        />
        {timeIntervalSelected ?
          <LogbookTextField
            fieldName={this.props.timeIntervalName}
            fieldLabel="Enter time interval"
            type="number"
            step="0.01"
          />
        : null}
      </div>
    )
  }
}

class LapSubForm extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length < 1) {
      this.props.change(this.props.endName, 80.00);
      this.props.change(this.props.sideName, 70.00);
    }
  }
  render() {
    return (
      <div style={{display: 'flex'}}>
        <LogbookTextField
          fieldName={this.props.endName}
          fieldLabel="End lap (%)"
          type="number"
          step="0.01"
          style={UNIT_STYLE}
        />
        <LogbookTextField
          fieldName={this.props.sideName}
          fieldLabel="Side lap (%)"
          type="number"
          step="0.01"
        />
      </div>
    )
  }
}

class DataFormatSubForm extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length < 1) {
      this.props.change(this.props.formatName, 1);
    }
  }

  render() {
    const otherDataFormatSelected = (Object.keys(this.props.currentSensors[this.props.sensorIndex]).length > 0 & this.props.currentSensors[this.props.sensorIndex].DataFormat === 5 ? true : false);
    return (
      <div>
        <LogbookSelectField
          fieldName={this.props.formatName}
          fieldLabel="Data format"
          items={DATA_FORMATS}
          setDefault={false}
        />
        {otherDataFormatSelected ?
          <LogbookTextField
            fieldName={this.props.otherName}
            fieldLabel="Enter data format"
          />
        : null}
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
          <SensorTypeSubForm
            typeName={`${sensor}.Type`}
            otherName={`${sensor}.Other`}
            sensorIndex={index}
            change={change}
            currentSensors={currentSensors}
          />
          <LogbookTextField fieldName={`${sensor}.Make`} fieldLabel="Make" />
          <LogbookTextField fieldName={`${sensor}.Model`} fieldLabel="Model" />
          <OperationModeSubForm
            modeName={`${sensor}.OperationMode`}
            intervalName={`${sensor}.TimeInterval`}
            sensorIndex={index}
            change={change}
            currentSensors={currentSensors}
          />
          <LapSubForm
            endName={`${sensor}.EndLap`}
            sideName={`${sensor}.SideLap`}
            change={change}
            sensorIndex={index}
            currentSensors={currentSensors}
          />
          <DataFormatSubForm
            formatName={`${sensor}.DataFormat`}
            otherName={`${sensor}.OtherDataFormat`}
            change={change}
            sensorIndex={index}
            currentSensors={currentSensors}
          />
        </li>
      )}
    </ul>
    <AddSensorButton addNewSensor={() => fields.push({})} />
  </div>
);

class DataCollectionResearch extends React.Component {
  render() {
    const { handleSubmit, previousPage, currentSensors } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Data Collection" />
        <CardText>
          <LogbookTextField
            fieldName={`${PAGE_NAME}SensorsUsed`}
            fieldLabel="Number of sensors used"
            type="number"
          />
          <FieldArray
            name={`${PAGE_NAME}Sensors`}
            component={renderSensors}
            change={this.props.change}
            currentSensors={currentSensors}
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
})(DataCollectionResearch);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentSensors = selector(state, PAGE_NAME + 'Sensors');

    return {
      currentSensors,
    }
  }
)(myReduxForm);
