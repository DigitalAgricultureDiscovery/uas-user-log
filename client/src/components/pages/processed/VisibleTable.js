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
      <Table
        bodyStyle={STYLE.tableBody}
        fixedHeader={false}
        multiSelectable={true}
        onRowSelection={(selected) => {this.props.handleRowSelection('Visible', selected)}}
        style={STYLE.table}
      >
        <TableHeader displaySelectAll={false} enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Civilian NIIRS rating</TableHeaderColumn>
            <TableHeaderColumn>Features that can be distinguished</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {/* Rating 0 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating0') > -1 ? true : false}>
            <TableRowColumn>Rating Level 0</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Interpretability of the imagery is precluded by obscuration,
              degradation, or very poor resolution.
            </TableRowColumn>
          </TableRow>
          {/* Rating 1 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating1') > -1 ? true : false}>
            <TableRowColumn>Rating Level 1<br />{'(< 9 meters)'}</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Distinguish between major land use classes (e.g., urban,
              agricultural, forest, water, barren). Identify large area
              drainage patterns by type (e.g., dendritic, trellis, radial).
            </TableRowColumn>
          </TableRow>
          {/* Rating 2 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating2') > -1 ? true : false}>
            <TableRowColumn>Rating Level 2<br />(4.5 - 9 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify large (i.e., greater than 160 acre) center-pivot irrigated
              fields during the growing season.
            </TableRowColumn>
          </TableRow>
          {/* Rating 3 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating3') > -1 ? true : false}>
            <TableRowColumn>Rating Level 3<br />(2.5 - 4.5 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Detect large area (i.e., larger than 160 acres) contour plowing.
              Distinguish between natural forest stands and orchards.
            </TableRowColumn>
          </TableRow>
          {/* Rating 4 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating4') > -1 ? true : false}>
            <TableRowColumn>Rating Level 4<br />(1.2 - 2.5 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify farm buildings as barns, silos, or residences. Count
              unoccupied railroad tracks along right-of-way or in a railroad
              yard. Detect jeep trails through grasslands.
            </TableRowColumn>
          </TableRow>
          {/* Rating 5 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating5') > -1 ? true : false}>
            <TableRowColumn>Rating Level 5<br />(0.75 - 1.2 meteres)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify Christmas tree plantations. Distinguish between stands of
              coniferous and deciduous trees during leaf-off condition. Detect
              large animals (e.g., elephants, rhinoceros, giraffes) in grasslands.
            </TableRowColumn>
          </TableRow>
          {/* Rating 6 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating6') > -1 ? true : false}>
            <TableRowColumn>Rating Level 6<br />(0.4 - 0.75 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Detect narcotics intercropping based on texture. Distinguish between
              row (e.g., corn, soybean) crops and small grain (e.g., wheat, oats)
              crops. Detect foot trails through barren areas.
            </TableRowColumn>
          </TableRow>
          {/* Rating 7 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating7') > -1 ? true : false}>
            <TableRowColumn>Rating Level 7<br />(0.2 - 0.4 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify individual mature cotton plants in a known cotton field.
              Detect stumps and rocks in forest clearings and meadows.
            </TableRowColumn>
          </TableRow>
          {/* Rating 8 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating8') > -1 ? true : false}>
            <TableRowColumn>Rating Level 8<br />(0.1 - 0.2 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Count individual baby pigs. Identify a USGS benchmark set in a paved
              surface. Identify individual pine seedlings. Identify individual
              water lilies on a pond.
            </TableRowColumn>
          </TableRow>
          {/* Rating 9 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating9') > -1 ? true : false}>
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