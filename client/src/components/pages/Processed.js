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

class NiirsGrid extends React.Component {
  render() {
    return (
      <div style={{display: 'grid', gridTemplateColumns: 'auto', gridGap: 10, gridAutoRows: 'minmax(25px, auto)'}}>
        {/* header */}
        <div style={{gridColumn: 2, gridRow: 1, borderBottom: 'solid'}}><strong>Civilian NIIRS rating</strong></div>
        <div style={{gridColumn: '3/5', gridRow: 1, borderBottom: 'solid'}}><strong>Features that can be distinguished</strong></div>
        {/* checkboxes */}
        <div style={{gridColumn: 1, gridRow: 2}}><Field name="rating0" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 3}}><Field name="rating1" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 4}}><Field name="rating2" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 5}}><Field name="rating3" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 6}}><Field name="rating4" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 7}}><Field name="rating5" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 8}}><Field name="rating6" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 9}}><Field name="rating7" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 10}}><Field name="rating8" component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 11}}><Field name="rating9" component={Checkbox} /></div>
        {/* rating level */}
        <div style={{gridColumn: 2, gridRow: 2}}>Rating Level 0</div>
        <div style={{gridColumn: 2, gridRow: 3}}>Rating Level 1<br />{"(< 9 meters)"}</div>
        <div style={{gridColumn: 2, gridRow: 4}}>Rating Level 2<br />(4.5-9 meters)</div>
        <div style={{gridColumn: 2, gridRow: 5}}>Rating Level 3<br />(2.5-4.5 meters)</div>
        <div style={{gridColumn: 2, gridRow: 6}}>Rating Level 4<br />(1.2-2.5 meters)</div>
        <div style={{gridColumn: 2, gridRow: 7}}>Rating Level 5<br />(0.75-1.2 meters)</div>
        <div style={{gridColumn: 2, gridRow: 8}}>Rating Level 6<br />(0.4-0.75 meters)</div>
        <div style={{gridColumn: 2, gridRow: 9}}>Rating Level 7<br />(0.2-0.4 meters)</div>
        <div style={{gridColumn: 2, gridRow: 10}}>Rating Level 8<br />(0.1-0.2 meters)</div>
        <div style={{gridColumn: 2, gridRow: 11}}>Rating Level 9<br />{"(< 0.1 meters)"}</div>
        {/* description */}
        <div style={{gridColumn: '3/5', gridRow: 2}}>Interpretability of the imagery is precluded by obscuration, degradation, or very poor resolution.</div>
        <div style={{gridColumn: '3/5', gridRow: 3}}>Distinguish between major land use classes (e.g., urban, agricultural, forest, water, barren). Identify large area drainage patterns by type (e.g., dendritic, trellis, radial).</div>
        <div style={{gridColumn: '3/5', gridRow: 4}}>Identify large (i.e., greater than 160 acre) center-pivot irrigated fields during the growing season.</div>
        <div style={{gridColumn: '3/5', gridRow: 5}}>Detect large area (i.e., larger than 160 acres) contour plowing. Distinguish between natural forest stands and orchards.</div>
        <div style={{gridColumn: '3/5', gridRow: 6}}>Identify farm buildings as barns, silos, or residences. Count unoccupied railroad tracks along right-of-way or in a railroad yard. Detect jeep trails through grasslands.</div>
        <div style={{gridColumn: '3/5', gridRow: 7}}>Identify Christmas tree plantations. Distinguish between stands of coniferous and deciduous trees during leaf-off condition. Detect large animals (e.g., elephants, rhinoceros, giraffes) in grasslands.</div>
        <div style={{gridColumn: '3/5', gridRow: 8}}>Detect narcotics intercropping based on texture. Distinguish between row (e.g., corn, soybean) crops and small grain (e.g., wheat, oats) crops. Detect foot trails through barren areas.</div>
        <div style={{gridColumn: '3/5', gridRow: 9}}>Identify individual mature cotton plants in a known cotton field. Detect stumps and rocks in forest clearings and meadows.</div>
        <div style={{gridColumn: '3/5', gridRow: 10}}>Count individual baby pigs. Identify a USGS benchmark set in a paved surface. Identify individual pine seedlings. Identify individual water lilies on a pond.</div>
        <div style={{gridColumn: '3/5', gridRow: 11}}>Identify individual grain heads on small grain (e.g., wheat, oats, barley). Identify an ear tag on large game animals (e.g., deer, elk, moose).</div>
      </div>
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
          <NiirsGrid />
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