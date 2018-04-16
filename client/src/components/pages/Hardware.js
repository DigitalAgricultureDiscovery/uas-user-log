import React from 'react';
import { reduxForm } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
import Subheader from 'material-ui/Subheader';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'hardware_';

const STYLES = {
  longField: {
    width: 384,
  },
  shortField: {
    marginRight: 10,
    width: 123,
  },
  subheader: {
    paddingLeft: 0,
    marginTop: 15,
  },
};

const DRONE_TYPES = [
  {value: 1, name: 'Fixed wing'},
  {value: 2, name: 'Multi-rotor'},
  {value: 3, name: 'Helicopter'},
];

class RemoteControlChargeSubForm extends React.Component {
  render() {
    return (
      <div>
        <Subheader style={STYLES.subheader}>Remote control charge status</Subheader>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}RemoteControlChargeTarget`}
            fieldLabel="Target (%)"
            required={true}
            type="number"
            min="1"
            style={STYLES.shortField}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}RemoteControlChargeMinimum`}
            fieldLabel="Minimum (%)"
            required={true}
            type="number"
            min="1"
            max="80"
            style={STYLES.shortField}
          />
        </div>
      </div>
    )
  }
}

class GroundControlChargeSubForm extends React.Component {
  render() {
    return (
      <div>
        <Subheader style={STYLES.subheader}>Ground control station battery charge status</Subheader>
        <div style={{display: 'flex'}}>
          <LogbookTextField
            fieldName={`${PAGE_NAME}GroundControlChargeTarget`}
            fieldLabel="Target (%)"
            required={true}
            type="number"
            min="1"
            style={STYLES.shortField}
          />
          <LogbookTextField
            fieldName={`${PAGE_NAME}GroundControlChargeMinimum`}
            fieldLabel="Minimum (%)"
            required={true}
            type="number"
            min="1"
            max="80"
            style={STYLES.shortField}
          />
        </div>
      </div>
    )
  }
}

class Hardware extends React.Component {
  componentDidMount() {
    this.props.trackPage('Hardware');
  }

  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Hardware" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Type`}
            fieldLabel="Type"
            required={true}
            items={DRONE_TYPES}
            setDefault={false}
          />
          <LogbookTextField fieldName={`${PAGE_NAME}Make`} fieldLabel="Make" />
          <LogbookTextField fieldName={`${PAGE_NAME}Model`} fieldLabel="Model" />
          <LogbookTextField
            fieldName={`${PAGE_NAME}Registration`}
            fieldLabel="Registration certificate or equivalent as per local law"
            style={STYLES.longField}
          />
          <RemoteControlChargeSubForm />
          <GroundControlChargeSubForm />
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

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Hardware);
