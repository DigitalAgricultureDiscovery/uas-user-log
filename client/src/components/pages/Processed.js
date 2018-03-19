import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { Checkbox, SelectField, TextField }           from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';
import Subheader                            from 'material-ui/Subheader';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
}                                           from 'material-ui/Table';

import validate from '../helpers/validate';

const wordWrapStyle = {
  wordWrap: 'break-word',
  whiteSpace: 'normal',
}

class NiirsTable extends React.Component {
  render() {
    return (
      <Table
        multiSelectable={true}
      >
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{width: 125}}>Civilian NIIRS rating</TableHeaderColumn>
            <TableHeaderColumn>Features that can be distinguished</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating0" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>Rating Level 0</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Interpretability of the imagery is precluded by obscuration, degradation, or very poor resolution.</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating1" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>{"Rating Level 1"}<br />{"(< 9 meters)"}</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Distinguish between major land use classes (e.g., urban, agricultural, forest, water, barren). Identify large area drainage patterns by type (e.g., dendritic, trellis, radial).</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating2" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>Rating Level 2<br />(4.5-9 meters)</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Identify large (i.e., greater than 160 acre) center-pivot irrigated fields during the growing season.</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating3" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>Rating Level 3<br />(2.5-4.5 meters)</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Detect large area (i.e., larger than 160 acres) contour plowing. Distinguish between natural forest stands and orchards.</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating4" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>Rating Level 4<br />(1.2-2.5 meters)</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Identify farm buildings as barns, silos, or residences. Count unoccupied railroad tracks along right-of-way or in a railroad yard. Detect jeep trails through grasslands.</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating5" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>Rating Level 5<br />(0.75-1.2 meters)</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Identify Christmas tree plantations. Distinguish between stands of coniferous and deciduous trees during leaf-off condition. Detect large animals (e.g., elephants, rhinoceros, giraffes) in grasslands.</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating6" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>Rating Level 6<br />(0.4-0.75 meters)</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Detect narcotics intercropping based on texture. Distinguish between row (e.g., corn, soybean) crops and small grain (e.g., wheat, oats) crops. Detect foot trails through barren areas.</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating7" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>Rating Level 7<br />(0.2-0.4 meters)</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Identify individual mature cotton plants in a known cotton field. Detect stumps and rocks in forest clearings and meadows.</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating8" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>Rating Level 8<br />(0.1-0.2 meters)</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Count individual baby pigs. Identify a USGS benchmark set in a paved surface. Identify individual pine seedlings. Identify individual water lilies on a pond.</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={{width: 50}}>
              <Field name="rating9" component={Checkbox} />
            </TableRowColumn>
            <TableRowColumn style={{width: 125}}>{"Rating Level 9"}<br />{"(< 0.1 meters)"}</TableRowColumn>
            <TableRowColumn style={wordWrapStyle}>Identify individual grain heads on small grain (e.g., wheat, oats, barley). Identify an ear tag on large game animals (e.g., deer, elk, moose).</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

class Processed extends React.Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Processed" />
        <CardText>
          <Subheader>Remote Sensing - Select one or more applicable ratings</Subheader>
          <NiirsTable />
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

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Processed);
