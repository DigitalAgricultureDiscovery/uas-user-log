import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { SelectField }                      from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

const PAGE_NAME = 'obstacles_';

const OBSTACLES = [
  {value: 1, name: 'Power/Telephone lines'},
  {value: 2, name: 'Power/Telephone poles'},
  {value: 3, name: 'Wood or metal towers'},
  {value: 4, name: 'Guy-wires'},
  {value: 5, name: 'Buildings'},
  {value: 6, name: 'Trees'},
  {value: 7, name: 'Signs/Signboards'},
  {value: 8, name: 'Other'},
];

class ObstaclesSelect extends React.Component {
  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return OBSTACLES[values[0] - 1].name;
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
        name={`${PAGE_NAME}Obstacles`}
        className="required"
        component={SelectField}
        floatingLabelText="Select one or more"
        multiple={true}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(OBSTACLES)}
      </Field>
    )
  }
}

class Obstacles extends React.Component {
  componentDidMount() {
    this.props.trackPage('Obstacles');
  }
  
  render() {
    const { handleSubmit, previousPage, selectedObstacles } = this.props;
    const otherIndex = 8;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Obstacles Present" />
        <CardText>
          <ObstaclesSelect selectedObstacles={selectedObstacles} />
          {selectedObstacles.indexOf(otherIndex) > -1 &&
            <div>
              <LogbookTextField fieldName={`${PAGE_NAME}ObstaclesOther`} fieldLabel="Other obstacle" required={true} />
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
})(Obstacles);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const selectedObstacles = selector(state, PAGE_NAME + 'Obstacles') ? selector(state, PAGE_NAME + 'Obstacles') : [];
    return {
      selectedObstacles,
    }
  }
)(myReduxForm);
