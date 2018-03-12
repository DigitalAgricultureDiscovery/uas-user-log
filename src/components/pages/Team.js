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
import PersonAddIcon     from 'material-ui/svg-icons/social/person-add';
// material-ui colors
import {lightGreen500, red500} from 'material-ui/styles/colors';

import validate from './utils/validate';

class RemotePICText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Name"
      />
    )
  }
}

class RemotePICLicenseText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="License #"
      />
    )
  }
}

class AddRemotePICButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addNewRemotePIC();
  }

  render() {
    return (
      <RaisedButton
        label="Add Remote PIC"
        labelPosition="before"
        tooltip="Add remote Pilot in Command (PIC)"
        backgroundColor={lightGreen500}
        icon={<PersonAddIcon />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderRemotePICs = ({ fields, change }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((remotePic, index) =>
        <li key={index}>
          <strong>Remote PIC #{index + 1}</strong>
          <IconButton
            tooltip="Remove remote PIC"
            onClick={() => fields.remove(index)}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <br />
          <RemotePICText fieldName={`${remotePic}.remotePicName`} />&nbsp;
          <RemotePICLicenseText fieldName={`${remotePic}.remotePicLicense`} />
          <br />
        </li>
      )}
    </ul>
    <AddRemotePICButton addNewRemotePIC={() => fields.push({})} />
  </div>
);

class PICText extends React.Component {
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={TextField}
        floatingLabelText="Name"
      />
    )
  }
}

class AddPICButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addNewPIC();
  }

  render() {
    return (
      <RaisedButton
        label="Add PIC"
        labelPosition="before"
        backgroundColor={lightGreen500}
        icon={<PersonAddIcon />}
        onClick={this.handleClick}
      />
    )
  }
}

const renderPICs = ({ fields, change }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((pic, index) =>
        <li key={index}>
          <strong>Pilot #{index + 1}</strong>
          <IconButton
            tooltip="Remove PIC"
            onClick={() => fields.remove(index)}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <br />
          <PICText fieldName={`${pic}.picName`} />&nbsp;
          <br />
        </li>
      )}
    </ul>
    <AddPICButton addNewPIC={() => fields.push({})} />
  </div>
);

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
        icon={<PersonAddIcon />}
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

class Team extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Team Information" />
        <CardText>
          <FieldArray name="remotePICs" component={renderRemotePICs} />
          <br />
          <FieldArray name="pics" component={renderPICs} />
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
