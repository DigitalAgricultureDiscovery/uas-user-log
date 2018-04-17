import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import Subheader                            from 'material-ui/Subheader';
// processed forms
import VisibleTable from './processed/VisibleTable';
// helpers
import LogbookSelectField         from '../helpers/LogbookSelectField';
import { PrevButton, NextButton } from '../helpers/LogbookButtons';
import validate                   from '../helpers/validate';

const PAGE_NAME = 'processed_';

const SENSORS = [
  {value: 1, name: 'Visible'},
];

class NIIRSStatement extends React.Component {
  render() {
    return (
      <p>
        The use of small Unmanned Aircraft Systems (sUAS) has been increasing
        in the US National Air Space (NAS). It's increasing use is also
        requiring an objective manner to ascertain quality of data being
        collected by payload mounted on sUAS. Until some other standard
        evolves, the National Imagery Interpretability Rating Scale (NIIRS)
        is being proposed for assessing performance of sUAS sensors.​
      </p>
    )
  }
}

class Processed extends React.Component {
  constructor(props) {
    super(props);
    this.updateSelected = this.updateSelected.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  componentDidMount() {
    this.props.trackPage('Processed');
  }

  updateSelected(selected) {
    this.props.change(selected.type, selected);
  }

  handleRowSelection(type, selected) {
    let selectedNames = [];
    selected.forEach(function(row, index) {
      selectedNames.push(`Rating${row}`);
    });
    this.props.change(PAGE_NAME + type, selectedNames);
  }

  renderSensorGrid(sensorIndex) {
    switch(sensorIndex) {
      case 1:
        return (
          <div>
            <Subheader>Visible NIIRS - Select one or more applicable ratings <span style={{color: 'rgb(244, 67, 54)'}}>*</span></Subheader>
            <VisibleTable
              updateSelected={this.updateSelected}
              handleRowSelection={this.handleRowSelection}
              currentSelections={this.props.currentVisibleSelections ? this.props.currentVisibleSelections : []}
            />
          </div>
        );
      default:
        return <div>Unknown sensor selected</div>;
    }
  }

  render() {
    const { handleSubmit, previousPage, currentNiirsSensor, currentVisibleSelections } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Processed" />
        <CardText>
          <NIIRSStatement />
          <LogbookSelectField
            fieldName={`${PAGE_NAME}Sensor`}
            fieldLabel="Select a sensor"
            required={true}
            items={SENSORS}
          />
          {this.renderSensorGrid(currentNiirsSensor, currentVisibleSelections)}
          <p>
            <strong>Source: </strong>
            <a href="https://fas.org/irp/imint/niirs_c/app2.htm" target="_blank" rel="noopener noreferrer">
              Civil NIIRS Reference Guide. Appendix II: Additional NIIRS Criteria
            </a>
          </p>
        </CardText>
        <CardActions>
          <PrevButton onClick={previousPage} />
          <NextButton />
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
})(Processed);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentNiirsSensor = selector(state, PAGE_NAME + 'Sensor');
    const currentVisibleSelections = selector(state, PAGE_NAME + 'Visible');
    return {
      currentNiirsSensor,
      currentVisibleSelections,
    }
  }
)(myReduxForm);
