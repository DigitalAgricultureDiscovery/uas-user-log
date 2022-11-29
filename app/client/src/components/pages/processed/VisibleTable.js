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
    'minWidth': 550,
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
        <TableBody className="processed-table" deselectOnClickaway={false}>
          {/* Rating 0 */}
          {/* <TableRow selected={this.props.currentSelections.indexOf('Rating0') > -1 ? true : false}>
            <TableRowColumn>Rating Level 0</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Interpretability of the imagery is precluded by obscuration,
              degradation, or very poor resolution.
            </TableRowColumn>
          </TableRow> */}
          {/* Rating 1 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating0') > -1 ? true : false}>
            <TableRowColumn>Rating Level 1<br />{'(> 9 meters)'}</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              <ul>
                <li>Detect large (i.e., greater than 100 acre) slash and burn clearings in jungle areas. (NIIRS 1.4)</li>
                <li>Identify long-lot land ownership patterns along major waterways. (NIIRS 1.7)</li>
              </ul>
            </TableRowColumn>
          </TableRow>
          {/* Rating 2 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating1') > -1 ? true : false}>
            <TableRowColumn>Rating Level 2<br />(4.5 - 9 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              <ul>
                <li>Detect forest clearings in suspected coca growing areas. (NIIRS 2.4)</li>
                <li>Detect windbreaks (i.e., rows of trees) between fields. (NIIRS 2.6)</li>
                <li>Detect forest clearings m suspected opium growing areas. (NIIRS 2.7)</li>
              </ul>
            </TableRowColumn>
          </TableRow>
          {/* Rating 3 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating2') > -1 ? true : false}>
            <TableRowColumn>Rating Level 3<br />(2.5 - 4.5 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              <ul>
                <li>Identify the path of a tornado through crop fields. (NIIRS 3.3)</li>
                <li>Detect small (e.g., less than one acre) forest clearings in suspected opium growing areas. (NIIRS 3.3)</li>
                <li>Detect individual large buildings (e.g., house, barn) in a farmstead. (NIIRS 3.3)</li>
                <li>Detect slash and burn field abandonment in a jungle through observation of regrowth. (NIIRS 3.3)</li>
                <li>Distinguish between crop land and pasture land. (NIIRS 3.4)</li>
                <li>Detect hay mowing. (NIIRS 3.5)</li>
                <li>Detect mechanized grain harvesting operations. (NIIRS 3.6)</li>
              </ul>
            </TableRowColumn>
          </TableRow>
          {/* Rating 4 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating3') > -1 ? true : false}>
            <TableRowColumn>Rating Level 4<br />(1.2 - 2.5 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              <ul>
                <li>Detect active plowing of fields. (NIIRS 4.1)</li>
                <li>Identify small water sources (e.g., stock ponds, prairie potholes) in range land areas. (NIIRS 4.2)</li>
                <li>Distinguish between individual trees in an orchard. (NIIRS 4.4)</li>
                <li>Distinguish between individual rows in a mature vineyard. (NIIRS 4.5)</li>
                <li>Detect large farm equipment (e.g., tractors, combines) in open fields. (NIIRS 4 5)</li>
                <li>Identify commercial greenhouses. (NIIRS 4.6)</li>
                <li>Detect marijuana harvest based on the absence of vegetation in known marijuana fields. (NIIRS 4.8)</li>
                <li>Detect vehicle tracks through freshly plowed fields. (NIIRS 4.8)</li>
              </ul>
            </TableRowColumn>
          </TableRow>
          {/* Rating 5 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating4') > -1 ? true : false}>
            <TableRowColumn>Rating Level 5<br />(0.75 - 1.2 meteres)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              <ul>
                <li>Detect individual large domesticated animals (e.g., horses, cattle) in grazing pastures. (NIIRS 5.3)</li>
                <li>Detect small (i.e., less than 1-meter wide) irrigation/drainage ditches. (NIIRS 5.3)</li>
                <li>Identify individual bales of hay/straw. (NIIRS 5.4)</li>
                <li>Distinguish between livestock watering troughs and feed troughs in pastures. (NIIRS 5.7)</li>
                <li>Distinguish between individual rows of truck crops. (NIIRS 5.7)</li>
                <li>Distinguish between livestock semi-trailers and regular box-body semi-trailers. (NIIRS 5.8)</li>
                <li>Identify ornamental tree nurseries. (NIIRS 5.8)</li>
              </ul>
            </TableRowColumn>
          </TableRow>
          {/* Rating 6 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating5') > -1 ? true : false}>
            <TableRowColumn>Rating Level 6<br />(0.4 - 0.75 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              <ul>
                <li>Detect a closed gate across a single lane road. (NIIRS 6.0)</li>
                <li>Identify orchards by fruit type based on tree size and shape (e.g., apple, cherry, citrus). (NIIRS 6.1)</li>
                <li>Determine the number of rows on a field crop (e.g., corn, soybean) planter. (NIIRS 6.3)</li>
                <li>Detect mixed cropping in small farm plots. (NIIRS 6.4)</li>
                <li>Distinguish between mature and immature coca fields. (NIIRS 6.5)</li>
                <li>Detect coca harvest based on the absence of leaves on coca bushes in known coca fields. (NIIRS 6.6)​</li>
                <li>Identify cattle guards on single lane roads. (NIIRS 6.6)</li>
                <li>Detect the presence of obstructions (e.g., weed growth, soil slumpage) in an irrigation system. (NIIRS 6.6)</li>
                <li>Detect manual coca plant eradication. (NIIRS 6.6)</li>
                <li>Identify large farm animals by type (e.g., horses, cows). (NIIRS 6.7)</li>
                <li>Identify tractor-drawn farm machinery by type (e.g., plow, sprayer, planter). (NIIRS 6.7)</li>
                <li>Detect flowering of opium poppies in known fields. (NIIRS 6.7)</li>
                <li>Count sheep or goats in a flock. (NIIRS 6.8)</li>
                <li>Identify silage crops by type (e.g., corn, sorghum). (NIIRS 6.9)</li>
                <li>Distinguish opium poppies from wheat in small plots. (NIIR5 6.9)</li>
              </ul>
            </TableRowColumn>
          </TableRow>
          {/* Rating 7 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating6') > -1 ? true : false}>
            <TableRowColumn>Rating Level 7<br />(0.2 - 0.4 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              <ul>
                <li>Identify medium farm animals by type (e.g., sheep, goats). (NIIRS 7.1)</li>
                <li>Identify individual steel fence posts. (NIIRS 7.6)</li>
                <li>Distinguish between ewes and lambs. (NIIRS 7.7)</li>
                <li>Distinguish between individual tea or coffee plants. (NIIRS 7.9)</li>
              </ul>
            </TableRowColumn>
          </TableRow>
          {/* Rating 8 */}
          <TableRow selected={this.props.currentSelections.indexOf('Rating7') > -1 ? true : false}>
            <TableRowColumn>Rating Level 8<br />(0.1 - 0.2 meters)</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              <ul>
                <li>Identify an uncoiled garden hose laying on the ground. (NIIRS 8.2)</li>
                <li>Identify specific type of truck crop being grown (e.g., tomatoes, peppers, lettuce). (NIIRS 8.2)</li>
                <li>Detect scoring of poppy bulbs. (NIIRS 8.5)</li>
                <li>Detect tubing (approximately 1-inch diameter) for drip irrigation systems. (NIIR5 8.5)</li>
              </ul>
            </TableRowColumn>
          </TableRow>
          {/* Rating 9 */}
          {/* <TableRow selected={this.props.currentSelections.indexOf('Rating9') > -1 ? true : false}>
            <TableRowColumn>Rating Level 9<br />{'(< 0.1 meters)'}</TableRowColumn>
            <TableRowColumn style={STYLE.tableRow}>
              Identify individual grain heads on small grain (e.g., wheat, oats,
              barley). Identify an ear tag on large game animals
              (e.g., deer, elk, moose).
            </TableRowColumn>
          </TableRow> */}
        </TableBody>
      </Table>
    )
  }
}
