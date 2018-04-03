import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';
import Subheader                            from 'material-ui/Subheader';

import validate from '../helpers/validate';

import VisibleTable       from './processed/VisibleTable';
// import InfraredTable      from './processed/InfraredTable';
// import MultispectralTable from './processed/MultispectralTable';
// import RadarTable         from './processed/RadarTable';

const PAGE_NAME = 'processed_';

const SENSORS = [
  {value: 1, name: 'Visible'},
  // {value: 2, name: 'Infrared'},
  // {value: 3, name: 'Multispectral'},
  // {value: 4, name: 'Radar'},
]

class Processed extends React.Component {
  constructor(props) {
    super(props);
    this.updateSelected = this.updateSelected.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollTop = 0;
  }

  updateSelected(selected) {
    this.props.change(selected.type, selected);
  }

  handleRowSelection(type, selected) {
    let selectedNames = [];
    selected.forEach(function(row, index) {
      selectedNames.push(`Rating${row}`);
    })
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
      // case 2:
      //   return (
      //     <div>
      //       <Subheader>Infrared NIIRS - Select one or more applicable ratings</Subheader>
      //       <InfraredTable />
      //     </div>
      //   );
      // case 3:
      //   return (
      //     <div>
      //       <Subheader>Multispectral NIIRS - Select one or more applicable ratings</Subheader>
      //       <MultispectralTable />
      //     </div>
      //   );
      // case 4:
      //   return (
      //     <div>
      //       <Subheader>Radar NIIRS - Select one or more applicable ratings</Subheader>
      //       <RadarTable />
      //     </div>
      //   );
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
          <LogbookSelectField
            fieldName={`${PAGE_NAME}NIIRS`}
            fieldLabel="Select a sensor"
            required={true}
            items={SENSORS}
          />
          {this.renderSensorGrid(currentNiirsSensor, currentVisibleSelections)}
          <p>
            <strong>Source: </strong>
            <a href="https://fas.org/irp/imint/niirs.htm" target="_blank" rel="noopener noreferrer">
              National Image Interpretability Rating Scales
            </a>
          </p>
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
            backgroundColor="#FFD125"
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
})(Processed);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const currentNiirsSensor = selector(state, PAGE_NAME + 'NIIRS');
    const currentVisibleSelections = selector(state, PAGE_NAME + 'Visible');

    return {
      currentNiirsSensor,
      currentVisibleSelections,
    }
  }
)(myReduxForm);
