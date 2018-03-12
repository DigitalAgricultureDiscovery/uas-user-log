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
import PersonAdd         from 'material-ui/svg-icons/social/person-add';
// material-ui colors
import {lightGreen500, red500} from 'material-ui/styles/colors';

import validate from './utils/validate';

class PICText extends React.Component {
  render() {
    return (
      <Field
        name="picText"
        component={TextField}
        floatingLabelText="PIC"
      />
    )
  }
}

class LicenseText extends React.Component {
  render() {
    return (
      <Field
        name="licenseText"
        component={TextField}
        floatingLabelText="License"
      />
    )
  }
}

class AddPilotButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addNewPilot();
  }

  render() {
    return (
      <RaisedButton
        label="Add pilot"
        labelPosition="before"
        backgroundColor={lightGreen500}
        icon={<PersonAdd />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderPilots = ({ fields, change }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((pilot, index) =>
        <li key={index}>
          <strong>Pilot #{index + 1}</strong>
          <IconButton
            tooltip="Remove pilot"
            onClick={() => fields.remove(index)}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <br />
          <PilotText fieldName={`${pilot}.pilotName`} />
          <br />
        </li>
      )}
    </ul>
    <AddPilotButton addNewPilot={() => fields.push({})} />
  </div>
);

class AddVOButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addNewVO();
  }

  render() {
    return (
      <RaisedButton
        label="Add VO"
        labelPosition="before"
        backgroundColor={lightGreen500}
        icon={<PersonAdd />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderVOs = ({ fields, change }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((vo, index) =>
        <li key={index}>
          <strong>VO #{index + 1}</strong>
          <IconButton
            tooltip="Remove VO"
            onClick={() => fields.remove(index)}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <br />
          <VOText fieldName={`${vo}.voName`} />
          <br />
        </li>
      )}
    </ul>
    <AddVOButton addNewVO={() => fields.push({})} />
  </div>
);

class PilotText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Pilot, if other than PIC"
      />
    )
  }
}

class VOText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="VO instead of observer"
      />
    )
  }
}

class Team extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Team Information" />
        <CardText>
          <PICText />
          <br />
          <LicenseText />
          <br />
          <FieldArray name="pilots" component={renderPilots} />
          <br />
          <FieldArray name="vos" component={renderVOs} />
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
})(Team);
