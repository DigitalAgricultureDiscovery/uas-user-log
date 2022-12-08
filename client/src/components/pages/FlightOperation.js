import React from 'react';
import { reduxForm } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
// helpers
import LogbookSelectField from '../helpers/LogbookSelectField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate from '../helpers/validate';

const PAGE_NAME = 'flightOperation_';

const FLIGHT_MODES = [
  {value: 1, name: 'Autonomous'},
  {value: 2, name: 'Manual'},
];

class FlightOperation extends React.Component {
  componentDidMount() {
    this.props.trackPage('Flight Operation');
  }

  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Flight Operation" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Mode`}
            fieldLabel="Mode"
            required={true}
            items={FLIGHT_MODES}
            setDefault={false}
          />
        </CardText>
        <CardActions>
          <PrevButton onClick={previousPage} />
          <NextButton />
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
