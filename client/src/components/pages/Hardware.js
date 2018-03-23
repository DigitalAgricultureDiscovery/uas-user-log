import React from 'react';
import { reduxForm } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'hardware_';

const DRONE_TYPES = [
  {value: 1, name: 'Fixed wing'},
  {value: 2, name: 'Multi-rotor'},
  {value: 3, name: 'Helicopter'},
];

class RemoteChargeSubForm extends React.Component {
  render() {
    return (
      <div>
        Remote charge status
        <LogbookTextField
          fieldName={`${PAGE_NAME}RemoteChargeTarget`}
          fieldLabel="Target (%)"
          type="number"
          step="0.01"
        />
        <LogbookTextField
          fieldName={`${PAGE_NAME}RemoteChargeMinimum`}
          fieldLabel="Minimum (%)"
          type="number"
          step="0.01"
        />
      </div>
    )
  }
}

class GroundControlChargeSubForm extends React.Component {
  render() {
    return (
      <div>
        Ground control station battery status
        Remote charge status
        <LogbookTextField
          fieldName={`${PAGE_NAME}GroundControlChargeTarget`}
          fieldLabel="Target (%)"
          type="number"
          step="0.01"
        />
        <LogbookTextField
          fieldName={`${PAGE_NAME}GroundControlChargeMinimum`}
          fieldLabel="Minimum (%)"
          type="number"
          step="0.01"
        />
      </div>
    )
  }
}

class Hardware extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Hardware" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Type`}
            fieldLabel="Type"
            items={DRONE_TYPES}
            setDefault={false}
          />
          <LogbookTextField fieldName={`${PAGE_NAME}Make`} fieldLabel="Make" />
          <LogbookTextField fieldName={`${PAGE_NAME}Model`} fieldLabel="Model" />
          <LogbookTextField fieldName={`${PAGE_NAME}Registration`} fieldLabel="Registration" />
          <RemoteChargeSubForm />
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
