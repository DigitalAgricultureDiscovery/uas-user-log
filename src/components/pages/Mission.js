import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import validate from './utils/validate';


// Select input for mission category
class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
  }

  render() {
    return (
      <Field
        name="selectCategory"
        component={SelectField}
        floatingLabelText="Category"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Planning" />
        <MenuItem value={2} primaryText="Payload" />
        <MenuItem value={3} primaryText="Processed" />
      </Field>
    )
  }
}

// Select input for mission type
class TypeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
  }

  render() {
    return (
      <Field
        name="selectType"
        component={SelectField}
        floatingLabelText="Type"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Teaching/Demonstration" />
        <MenuItem value={2} primaryText="Research - Remote Sensing" />
        <MenuItem value={3} primaryText="Spray application" />
      </Field>
    )
  }
}

// Mission card
class Mission extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Mission" />
        <CardText>
          <CategorySelect />
          <br />
          <TypeSelect />
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
})(Mission);
