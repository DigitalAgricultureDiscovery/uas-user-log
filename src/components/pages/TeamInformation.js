import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton              from 'material-ui/FlatButton';
import RaisedButton            from 'material-ui/RaisedButton';
import PersonAdd              from 'material-ui/svg-icons/social/person-add';
import { TextField } from 'redux-form-material-ui';
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

class PilotText extends React.Component {
  render() {
    const styles = {
      button: {
        margin: 12,
      },
    };
    return (
      <div>
        <Field
          name="pilotText"
          component={TextField}
          floatingLabelText="Pilot, if other than PIC"
        />
        <RaisedButton
          label="Add Pilot"
          labelPosition="before"
          backgroundColor="#a4c639"
          icon={<PersonAdd />}
          style={styles.button}
        />
      </div>
    )
  }
}

class VOText extends React.Component {
  render() {
    const styles = {
      button: {
        margin: 12,
      },
    };
    return (
      <div>
        <Field
          name="voText"
          component={TextField}
          floatingLabelText="VO instead of observer"
        />
        <RaisedButton
          label="Add Pilot"
          labelPosition="before"
          backgroundColor="#a4c639"
          icon={<PersonAdd />}
          style={styles.button}
        />
      </div>
    )
  }
}

class TeamInformation extends React.Component {
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
          <PilotText />
          <br />
          <VOText />
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
})(TeamInformation);
