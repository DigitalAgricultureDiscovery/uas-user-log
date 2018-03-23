import React from 'react';
import { reduxForm } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'flightOperation_';

const FLIGHT_MODES = [
  {value: 1, name: 'Autonomous'},
  {value: 2, name: 'Manual'},
];

class FlightOperation extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Flight Operation" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Mode`}
            fieldLabel="Mode"
            items={FLIGHT_MODES}
            setDefault={false}
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

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(FlightOperation);
