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

export default class InfraredTable extends React.Component {
  render() {
    return (
      <Table
        bodyStyle={STYLE.tableBody}
        fixedHeader={false}
        multiSelectable={true}
        onRowSelection={(selected) => {this.props.handleRowSelection('Infrared', selected)}}
        style={STYLE.table}
      >
          <TableRow>
            <TableHeader displaySelectAll={false} enableSelectAll={false}>
            <TableHeaderColumn>Civilian NIIRS rating</TableHeaderColumn>
            <TableHeaderColumn>Features that can be distinguished</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {/* Rating 0 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating0') > -1 ? true : false}>
            <TableRowColumn>Rating Level 0</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 1 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating1') > -1 ? true : false}>
            <TableRowColumn>Rating Level 1<br />{'(< 9 meters)'}</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 2 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating2') > -1 ? true : false}>
            <TableRowColumn>Rating Level 2<br />(4.5 - 9 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 3 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating3') > -1 ? true : false}>
            <TableRowColumn>Rating Level 3<br />(2.5 - 4.5 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 4 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating4') > -1 ? true : false}>
            <TableRowColumn>Rating Level 4<br />(1.2 - 2.5 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 5 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating5') > -1 ? true : false}>
            <TableRowColumn>Rating Level 5<br />(0.75 - 1.2 meteres)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 6 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating6') > -1 ? true : false}>
            <TableRowColumn>Rating Level 6<br />(0.4 - 0.75 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 7 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating7') > -1 ? true : false}>
            <TableRowColumn>Rating Level 7<br />(0.2 - 0.4 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 8 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating8') > -1 ? true : false}>
            <TableRowColumn>Rating Level 8<br />(0.1 - 0.2 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
          {/* Rating 9 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating9') > -1 ? true : false}>
            <TableRowColumn>Rating Level 9<br />{'(< 0.1 meters)'}</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>

            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
