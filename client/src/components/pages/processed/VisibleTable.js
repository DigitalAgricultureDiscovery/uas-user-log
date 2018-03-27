import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const STYLE = {
  table: {
    overflowX: 'auto',
    tableLayout: 'auto',
    width: 'auto',
  },
  tableBody: {
    'minWidth': 500,
    overflow: 'visible',
  },
  tableRow: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
};

export default class VisibleTable extends React.Component {
  render() {
    return (
      <Table bodyStyle={STYLE.tableBody} multiSelectable={true} fixedHeader={false} style={STYLE.table}>
        <TableHeader displaySelectAll={false} enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Civilian NIIRS rating</TableHeaderColumn>
            <TableHeaderColumn>Features that can be distinguished</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Rating 0 */}
          <TableRow>
            <TableRowColumn>Rating Level 0</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Interpretability of the imagery is precluded by obscuration,
              degradation, or very poor resolution.
            </TableRowColumn>
          </TableRow>
          {/* Rating 1 */}
          <TableRow>
            <TableRowColumn>Rating Level 1<br />{'(< 9 meters)'}</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Distinguish between major land use classes (e.g., urban,
                agricultural, forest, water, barren). Identify large area
                drainage patterns by type (e.g., dendritic, trellis, radial).
              </TableRowColumn>
          </TableRow>
          {/* Rating 2 */}
          <TableRow>
            <TableRowColumn>Rating Level 2<br />(4.5 - 9 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify large (i.e., greater than 160 acre) center-pivot irrigated
              fields during the growing season.
            </TableRowColumn>
          </TableRow>
          {/* Rating 3 */}
          <TableRow>
            <TableRowColumn>Rating Level 3<br />(2.5 - 4.5 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Detect large area (i.e., larger than 160 acres) contour plowing.
              Distinguish between natural forest stands and orchards.
            </TableRowColumn>
          </TableRow>
          {/* Rating 4 */}
          <TableRow>
            <TableRowColumn>Rating Level 4<br />(1.2 - 2.5 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify farm buildings as barns, silos, or residences. Count
              unoccupied railroad tracks along right-of-way or in a railroad
              yard. Detect jeep trails through grasslands.
            </TableRowColumn>
          </TableRow>
          {/* Rating 5 */}
          <TableRow>
            <TableRowColumn>Rating Level 5<br />(0.75 - 1.2 meteres)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify Christmas tree plantations. Distinguish between stands of
              coniferous and deciduous trees during leaf-off condition. Detect
              large animals (e.g., elephants, rhinoceros, giraffes) in grasslands.
            </TableRowColumn>
          </TableRow>
          {/* Rating 6 */}
          <TableRow>
            <TableRowColumn>Rating Level 6<br />(0.4 - 0.75 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Detect narcotics intercropping based on texture. Distinguish between
              row (e.g., corn, soybean) crops and small grain (e.g., wheat, oats)
              crops. Detect foot trails through barren areas.
            </TableRowColumn>
          </TableRow>
          {/* Rating 7 */}
          <TableRow>
            <TableRowColumn>Rating Level 7<br />(0.2 - 0.4 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify individual mature cotton plants in a known cotton field.
              Detect stumps and rocks in forest clearings and meadows.
            </TableRowColumn>
          </TableRow>
          {/* Rating 8 */}
          <TableRow>
            <TableRowColumn>Rating Level 8<br />(0.1 - 0.2 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Count individual baby pigs. Identify a USGS benchmark set in a paved
              surface. Identify individual pine seedlings. Identify individual
              water lilies on a pond.
            </TableRowColumn>
          </TableRow>
          {/* Rating 9 */}
          <TableRow>
            <TableRowColumn>Rating Level 9<br />{'(< 0.1 meters)'}</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify individual grain heads on small grain (e.g., wheat, oats,
              barley). Identify an ear tag on large game animals
              (e.g., deer, elk, moose).
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

// class NiirsVisibleGrid extends React.Component {
//   render() {
//     return (
//       <div style={{display: 'grid', gridTemplateColumns: 'auto', gridGap: 10, gridAutoRows: 'minmax(25px, auto)'}}>
//         {/* header */}
//         <div style={{gridColumn: 2, gridRow: 1, borderBottom: 'solid'}}><strong>Civilian NIIRS rating</strong></div>
//         <div style={{gridColumn: '3/5', gridRow: 1, borderBottom: 'solid'}}><strong>Features that can be distinguished</strong></div>
//         {/* checkboxes */}
//         <div style={{gridColumn: 1, gridRow: 2}}><Field name={`${this.props.fieldName}.rating0`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 3}}><Field name={`${this.props.fieldName}.rating1`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 4}}><Field name={`${this.props.fieldName}.rating2`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 5}}><Field name={`${this.props.fieldName}.rating3`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 6}}><Field name={`${this.props.fieldName}.rating4`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 7}}><Field name={`${this.props.fieldName}.rating5`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 8}}><Field name={`${this.props.fieldName}.rating6`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 9}}><Field name={`${this.props.fieldName}.rating7`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 10}}><Field name={`${this.props.fieldName}.rating8`} component={Checkbox} /></div>
//         <div style={{gridColumn: 1, gridRow: 11}}><Field name={`${this.props.fieldName}.rating9`} component={Checkbox} /></div>
//         {/* rating level */}
//         <div style={{gridColumn: 2, gridRow: 2}}>Rating Level 0</div>
//         <div style={{gridColumn: 2, gridRow: 3}}>Rating Level 1<br />{"(< 9 meters)"}</div>
//         <div style={{gridColumn: 2, gridRow: 4}}>Rating Level 2<br />(4.5-9 meters)</div>
//         <div style={{gridColumn: 2, gridRow: 5}}>Rating Level 3<br />(2.5-4.5 meters)</div>
//         <div style={{gridColumn: 2, gridRow: 6}}>Rating Level 4<br />(1.2-2.5 meters)</div>
//         <div style={{gridColumn: 2, gridRow: 7}}>Rating Level 5<br />(0.75-1.2 meters)</div>
//         <div style={{gridColumn: 2, gridRow: 8}}>Rating Level 6<br />(0.4-0.75 meters)</div>
//         <div style={{gridColumn: 2, gridRow: 9}}>Rating Level 7<br />(0.2-0.4 meters)</div>
//         <div style={{gridColumn: 2, gridRow: 10}}>Rating Level 8<br />(0.1-0.2 meters)</div>
//         <div style={{gridColumn: 2, gridRow: 11}}>Rating Level 9<br />{"(< 0.1 meters)"}</div>
//         {/* description */}
//         <div style={{gridColumn: '3/5', gridRow: 2}}>Interpretability of the imagery is precluded by obscuration, degradation, or very poor resolution.</div>
//         <div style={{gridColumn: '3/5', gridRow: 3}}>Distinguish between major land use classes (e.g., urban, agricultural, forest, water, barren). Identify large area drainage patterns by type (e.g., dendritic, trellis, radial).</div>
//         <div style={{gridColumn: '3/5', gridRow: 4}}>Identify large (i.e., greater than 160 acre) center-pivot irrigated fields during the growing season.</div>
//         <div style={{gridColumn: '3/5', gridRow: 5}}>Detect large area (i.e., larger than 160 acres) contour plowing. Distinguish between natural forest stands and orchards.</div>
//         <div style={{gridColumn: '3/5', gridRow: 6}}>Identify farm buildings as barns, silos, or residences. Count unoccupied railroad tracks along right-of-way or in a railroad yard. Detect jeep trails through grasslands.</div>
//         <div style={{gridColumn: '3/5', gridRow: 7}}>Identify Christmas tree plantations. Distinguish between stands of coniferous and deciduous trees during leaf-off condition. Detect large animals (e.g., elephants, rhinoceros, giraffes) in grasslands.</div>
//         <div style={{gridColumn: '3/5', gridRow: 8}}>Detect narcotics intercropping based on texture. Distinguish between row (e.g., corn, soybean) crops and small grain (e.g., wheat, oats) crops. Detect foot trails through barren areas.</div>
//         <div style={{gridColumn: '3/5', gridRow: 9}}>Identify individual mature cotton plants in a known cotton field. Detect stumps and rocks in forest clearings and meadows.</div>
//         <div style={{gridColumn: '3/5', gridRow: 10}}>Count individual baby pigs. Identify a USGS benchmark set in a paved surface. Identify individual pine seedlings. Identify individual water lilies on a pond.</div>
//         <div style={{gridColumn: '3/5', gridRow: 11}}>Identify individual grain heads on small grain (e.g., wheat, oats, barley). Identify an ear tag on large game animals (e.g., deer, elk, moose).</div>
//       </div>
//     )
//   }
// }
