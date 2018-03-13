import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { SelectField }                      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from './utils/validate';

const obstacles = [
  {value: 0, name: 'Power/Telephone lines'},
  {value: 1, name: 'Power/Telephone poles'},
  {value: 2, name: 'Wood or metal towers'},
  {value: 3, name: 'Guy-wires'},
  {value: 4, name: 'Buildings'},
  {value: 5, name: 'Trees'},
  {value: 6, name: 'Signs/Signboards'},
  {value: 7, name: 'Other'}
];

class ObstaclesSelect extends React.Component {
  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return obstacles[values[0]].name;
      default:
        return `${values.length} obstacles selected`;
    }
  }

  menuItems(obstacles) {
    return obstacles.map((obstacle) => (
      <MenuItem
        key={obstacle.value}
        insetChildren={true}
        value={obstacle.value}
        checked={this.props.selectedObstacles.indexOf(obstacle.value) > -1}
        primaryText={obstacle.name}
      />
    ));
  }

  render() {
    return (
      <Field
        name="obstaclesSelect"
        component={SelectField}
        floatingLabelText="Select one or more"
        multiple={true}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(obstacles)}
      </Field>
    )
  }
}

class Obstacles extends React.Component {
  render() {
    const { handleSubmit, previousPage, selectedObstacles } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Obstacles Present" />
        <CardText>
          <ObstaclesSelect selectedObstacles={selectedObstacles} />
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

const myReduxForm = reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Obstacles);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const selectedObstacles = selector(state, 'obstaclesSelect') ? selector(state, 'obstaclesSelect') : [];
    return {
      selectedObstacles
    }
  }
)(myReduxForm);
