import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import LogbookSelectField from '../helpers/LogbookSelectField';
// material-ui elements
import { Checkbox }                         from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';
import Subheader                            from 'material-ui/Subheader';

import validate from '../helpers/validate';

const PAGE_NAME = 'processed_';

const SENSORS = [
  {value: 1, name: 'Visible'},
  // {value: 2, name: 'Infrared'},
  // {value: 3, name: 'Multispectral'},
  // {value: 4, name: 'Radar'},
]

class NiirsVisibleGrid extends React.Component {
  render() {
    return (
      <div style={{display: 'grid', gridTemplateColumns: 'auto', gridGap: 10, gridAutoRows: 'minmax(25px, auto)'}}>
        {/* header */}
        <div style={{gridColumn: 2, gridRow: 1, borderBottom: 'solid'}}><strong>Civilian NIIRS rating</strong></div>
        <div style={{gridColumn: '3/5', gridRow: 1, borderBottom: 'solid'}}><strong>Features that can be distinguished</strong></div>
        {/* checkboxes */}
        <div style={{gridColumn: 1, gridRow: 2}}><Field name={`${this.props.fieldName}.rating0`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 3}}><Field name={`${this.props.fieldName}.rating1`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 4}}><Field name={`${this.props.fieldName}.rating2`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 5}}><Field name={`${this.props.fieldName}.rating3`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 6}}><Field name={`${this.props.fieldName}.rating4`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 7}}><Field name={`${this.props.fieldName}.rating5`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 8}}><Field name={`${this.props.fieldName}.rating6`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 9}}><Field name={`${this.props.fieldName}.rating7`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 10}}><Field name={`${this.props.fieldName}.rating8`} component={Checkbox} /></div>
        <div style={{gridColumn: 1, gridRow: 11}}><Field name={`${this.props.fieldName}.rating9`} component={Checkbox} /></div>
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

// class NiirsInfraredGrid extends React.Component {
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
//         <div style={{gridColumn: '3/5', gridRow: 2}}>
//           Interpretability of the imagery is precluded by obscuration, degradation, or very poor resolution.
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 3}}>
//           Distinguish between runways and taxiways on the basis of size, configuration or pattern at a large airfield.
//           <p>Detect a large (e.g., greater than I square kilometer) cleared area in dense forest.</p>
//           <p>Detect large ocean-going vessels (e.g., aircraft carrier, super-tanker, KIROV) in open water.</p>
//           <p>Detect large areas (e.g., greater than I square kilometer) of marsh/swamp.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 4}}>
//           Detect large aircraft (e.g., C-141, 707, BEAR, CANDID, CLASSIC).
//           <p>Detect individual large buildings (e.g., hospitals, factories) in an urban area.</p>
//           <p>Distinguish between densely wooded, sparsely wooded and open fields.</p>
//           <p>Identify an SS-25 base by the pattern of buildings and roads.</p>
//           <p>Distinguish between naval and commercial port facilities based on type and configuration of large functional areas.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 5}}>
//           Distinguish between large (e.g., C-141, 707, BEAR, A300 AIRBUS) and small aircraft (e.g., A-4, FISHBED, L-39).
//           <p>Identify individual thermally active flues running between the boiler hall and smoke stacks at a thermal power plant.</p>
//           <p>Detect a large air warning radar site based on the presence of mounds, revetments and security fencing.</p>
//           <p>Detect a driver training track at a ground forces garrison.</p>
//           <p>Identify individual functional areas (e.g., launch sites, electronics area, support area, missile handling area) of an SA-5 launch complex.</p>
//           <p>Distinguish between large (e.g, greater than 200 meter) freighters and tankers.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 6}}>
//           Identify the wing configuration of small fighter aircraft (e.g., FROGFOOT, F- 16, FISHBED).
//           <p>Detect a small (e.g., 50 meter square) electrical transformer yard in an urban area.</p>
//           <p>Detect large (e.g., greater than 10 meter diameter) environmental domes at an electronics facility.</p>
//           <p>Detect individual thermally active vehicles in garrison.</p>
//           <p>Detect thermally active SS-25 MSV's in garrison.</p>
//           <p>Identify individual closed cargo hold hatches on large merchant ships.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 7}}>
//           Distinguish between single-tail (e.g., FLOGGER, F-16, TORNADO) and twin-tailed (e.g., F-15, FLANKER, FOXBAT) fighters.
//           <p>Identify outdoor tennis courts.</p>
//           <p>Identify the metal lattice structure of large (e.g. approximately 75 meter) radio relay towers.</p>
//           <p>Detect armored vehicles in a revetment.</p>
//           <p>Detect a deployed TET (transportable electronics tower) at an SA-10 site.</p>
//           <p>Identify the stack shape (e.g., square, round, oval) on large (e.g., greater than 200 meter) merchant ships.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 8}}>
//           Detect wing-mounted stores (i.e., ASM, bombs) protruding from the wings of large bombers (e.g., B-52, BEAR, Badger).
//           <p>Identify individual thermally active engine vents atop diesel locomotives.</p>
//           <p>Distinguish between a FIX FOUR and FIX SIX site based on antenna pattern and spacing.</p>
//           <p>Distinguish between thermally active tanks and APCs.</p>
//           <p>Distinguish between a 2-rail and 4-rail SA-3 launcher.</p>
//           <p>Identify missile tube hatches on submarines.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 9}}>
//           Distinguish between ground attack and interceptor versions of the MIG-23 FLOGGER based on the shape of the nose.
//           <p>Identify automobiles as sedans or station wagons.</p>
//           <p>Identify antenna dishes (less than 3 meters in diameter) on a radio relay tower.</p>
//           <p>Identify the missile transfer crane on a SA-6 transloader.</p>
//           <p>Distinguish between an SA-2/CSA-1 and a SCUD-B missile transporter when missiles are not loaded.</p>
//           <p>Detect mooring cleats or bollards on piers.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 10}}>
//           Identify the RAM airscoop on the dorsal spine of FISHBED J/K/L.
//           <p>Identify limbs (e.g., arms, legs) on an individual.</p>
//           <p>Identify individual horizontal and vertical ribs on a radar antenna.</p>
//           <p>Detect closed hatches on a tank turret.</p>
//           <p>Distinguish between fuel and oxidizer Multi-System Propellant Transporters based on twin or single fitments on the front of the semi-trailer.</p>
//           <p>Identify individual posts and rails on deck edge life rails.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 11}}>
//           Identify access panels on fighter aircraft.
//           <p>Identify cargo (e.g., shovels, rakes, ladders) in an open-bed, light-duty truck.</p>
//           <p>Distinguish between BIRDS EYE and BELL LACE antennas based on the presence or absence of small dipole elements.</p>
//           <p>Identify turret hatch hinges on armored vehicles.</p>
//           <p>Identify individual command guidance strip antennas on an SA-2/CSA-1 missile.</p>
//           <p>Identify individual rungs on bulkhead mounted ladders.</p>
//         </div>
//       </div>
//     )
//   }
// }
//
// class NiirsMultispectralGrid extends React.Component {
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
//         <div style={{gridColumn: '3/5', gridRow: 2}}>
//           Interpretability of the imagery is precluded by obscuration, degradation, or very poor resolution.
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 3}}>
//           Distinguish between urban and rural areas.
//           <p>Identify a large wetland (greater than 100 acres).</p>
//           <p>Detect meander flood plains (characterized by features such as channel scars, oxbow lakes, meander scrolls).</p>
//           <p>Delineate coastal shoreline.</p>
//           <p>Detect major highway and rail bridges over water (e.g., Golden Gate, Chesapeake Bay).</p>
//           <p>Delineate extent of snow or ice cover.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 4}}>
//           Detect multilane highways.
//           <p>Detect strip mining.</p>
//           <p>Determine water current direction as indicated by color differences (e.g., tributary entering larger water feature, chlorophyll or sediment patterns).</p>
//           <p>Detect timber clear-cutting.</p>
//           <p>Delineate extent of cultivated land.</p>
//           <p>Identify riverine flood plains.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 5}}>
//           Detect vegetation/soil moisture differences along a linear feature (suggesting the presence of a fenceline).
//           <p>Identify major street patterns in urban areas.</p>
//           <p>Identify golf courses.</p>
//           <p>Identify shoreline indications of predominant water currents.</p>
//           <p>Distinguish among residential, commercial, and industrial areas within an urban area.</p>
//           <p>Detect reservoir depletion.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 6}}>
//           Detect recently constructed weapon positions (e.g. tank, artillery, self-propelled gun) based on the presence of revetments, berms, and ground scarring in vegetated areas.
//           <p>Distinguish between two-lane improved and unimproved roads.</p>
//           <p>Detect indications of natural surface airstrip maintenance or improvements (e.g., runway extension, grading, resurfacing, bush removal, vegetation cutting).</p>
//           <p>Detect landslide or rockslide large enough to obstruct a single-lane road.</p>
//           <p>Detect small boats(15-20 feet in length) in open water</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 7}}>
//           Detect automobile in a parking lot.
//           <p>Identify beach terrain suitable for amphibious landing operation.</p>
//           <p>Detect ditch irrigation of beet fields.</p>
//           <p>Detect disruptive or deceptive use of paints or coatings on buildings/structures at a ground forces installation.</p>
//           <p>Detect raw construction materials in ground forces deployment areas (e.g., timber, sand, gravel).</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 8}}>
//           Detect summer woodland camouflage netting large enough to cover a tank against a scattered tree background.
//           <p>Detect foot trail through tall grass.</p>
//           <p>Detect navigational channel markers and mooring buoys in water.</p>
//           <p>Detect livestock in open but fenced areas.</p>
//           <p>Detect recently installed minefields in ground forces deployment area based on a regular pattern of disturbed earth or vegetation.</p>
//           <p>Count individual dwellings in subsistence housing areas (e.g., squatter settlements, refugee camps).</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 9}}>
//           Distinguish between tanks and three-dimensional tank decoys.
//           <p>Identify individual 55-gallon drums.</p>
//           <p>Detect small marine mammals (e.g., harbor seals) on sand/gravel beaches.</p>
//           <p>Detect underwater pier footings.</p>
//           <p>Detect foxholes by ring of spoil outlining hole.</p>
//           <p>Distinguish individual rows of truck crops.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 10}}>
//           NA
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 11}}>
//           NA
//         </div>
//       </div>
//     )
//   }
// }
//
// class NiirsRadarGrid extends React.Component {
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
//         <div style={{gridColumn: '3/5', gridRow: 2}}>
//           Interpretability of the imagery is precluded by obscuration, degradation, or very poor resolution.
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 3}}>
//           Detect the presence of aircraft dispersal parking areas.
//           <p>Detect a large cleared swath in a densely wooded area.</p>
//           <p>Detect, based on presence of piers and warehouses, a port facility.</p>
//           <p>Detect lines of transportation (either road or rail), but do not distinguish between</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 4}}>
//           Detect the presence of large (e.g., BLACKJACK, CAMBER, COCK, 707, 747) bombers or transports.
//           <p>Identify large phased array radars (e.g., HEN HOUSE, DOG HOUSE) by type.</p>
//           <p>Detect a military installation by building pattern and site configuration.</p>
//           <p>Detect road pattern, fence, and hardstand configuration at SSM launch sites (missile silos, launch control silos) within a known ICBM complex.</p>
//           <p>Detect large non-combatant ships (e.g., freighters or tankers) at a known port facility.</p>
//           <p>Identify athletic stadiums.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 5}}>
//           Detect medium-sized aircraft (e.g., FENCER, FLANKER, CURL, COKE, F-15).
//           <p>Identify an ORBITA site on the basis of a 12 meter dish antenna normally mounted on a circular building.</p>
//           <p>Detect vehicle revetments at a ground forces facility.</p>
//           <p>Detect vehicles/pieces of equipment at a SAM, SSM, or ABM fixed missile site.</p>
//           <p>Determine the location of the superstructure (e.g., fore, amidships, aft) on a medium-sized freighter.</p>
//           <p>Identify a medium-sized (approx. six track) railroad classification yard.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 6}}>
//           Distinguish between large rotary-wing and medium fixed-wing aircraft (e.g., HALO helicopter versus CRUSTY transport).
//           <p>Detect recent cable scars between facilities or command posts.</p>
//           <p>Detect individual vehicles in a row at a known motor pool.</p>
//           <p>Distinguish between open and closed sliding roof areas on a single bay garage at a mobile missile base.</p>
//           <p>Identify square bow shape of ROPUCHA class (LST).</p>
//           <p>Detect all rail/road bridges.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 7}}>
//           Count all medium helicopters (e.g., HIND, HIP, HAZE, HOUND, PUMA, WASP).
//           <p>Detect deployed TWIN EAR antenna.</p>
//           <p>Distinguish between river crossing equipment and medium/heavy armored vehicles by size and shape (e.g., MTU-20 vs. T-62 MBT).</p>
//           <p>Detect missile support equipment at an SS-25 RTP (e.g., TEL, MSV).</p>
//           <p>Distinguish bow shape and length/width differences of SSNS.</p>
//           <p>Detect the break between railcars (count railcars).</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 8}}>
//           Distinguish between variable and fixed-wing fighter aircraft (e.g., FENCER vs. FLANKER).
//           <p>Distinguish between the BAR LOCK and SIDE NET antennas at a BAR LOCK/SIDE NET acquisition radar site.</p>
//           <p>Distinguish between small support vehicles (e.g., UAZ-69, UAZ-469) and tanks (e.g., T-72, T-80).</p>
//           <p>Identify SS-24 launch triplet at a known location.</p>
//           <p>Distinguish between the raised helicopter deck on a KRESTA II (CG) and the helicopter deck with main deck on a KRESTA I (CG).</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 9}}>
//           Identify small fighter aircraft by type (e.g., FISHBED, FITTER, FLOGGER).
//           <p>Distinguish between electronics van trailers (without tractor) and van trucks in garrison.</p>
//           <p>Distinguish, by size and configuration, between a turreted, tracked APC and a medium tank (e.g., BMP-1/2 vs. T-64).</p>
//           <p>Detect a missile on the launcher in an SA-2 launch revetment.</p>
//           <p>Distinguish between bow mounted missile system on KRIVAK I/II and bow mounted gun turret on KRIVAK III.</p>
//           <p>Detect road/street lamps in an urban residential area or military complex.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 10}}>
//           Distinguish the fuselage difference between a HIND and a HIP helicopter.
//           <p>Distinguish between the FAN SONG E missile control radar and the FAN SONG F based on the number of parabolic dish antennas (three vs. one).</p>
//           <p>Identify the SA-6 transloader when other SA-6 equipment is present.</p>
//           <p>Distinguish limber hole shape and configuration differences between DELTA I and YANKEE I (SSBNs).</p>
//           <p>Identify the dome/vent pattern on rail tank cars.</p>
//         </div>
//         <div style={{gridColumn: '3/5', gridRow: 11}}>
//           Detect major modifications to large aircraft (e.g., fairings, pods, winglets).
//           <p>Identify the shape of antennas on EW/GCI/ACQ radars as parabolic, parabolic with clipped corners, or rectangular.</p>
//           <p>Identify, based on presence or absence of turret, size of aun tube, and chassis configuration, wheeled or tracked APCs by type (e.g., BTR-80, BMP- 1/2, MT-LB, Ml 13).</p>
//           <p>Identify the forward fins on an SA-3 missile.</p>
//           <p>Identify individual hatch covers of vertically launched SA-N-6 surface-to-air system.</p>
//           <p>Identify trucks as cab-over-engine or engine-in-front.</p>
//         </div>
//       </div>
//     )
//   }
// }

class Processed extends React.Component {
  renderSensorGrid(sensorIndex) {
    switch(sensorIndex) {
      case 1:
        return (
          <div>
            <Subheader>Visible NIIRS - Select one or more applicable ratings</Subheader>
            <NiirsVisibleGrid fieldName={"vis"} />
          </div>
        );
      // case 2:
      //   return (
      //     <div>
      //       <Subheader>Infrared NIIRS - Select one or more applicable ratings</Subheader>
      //       <NiirsInfraredGrid fieldName={"inf"} />
      //     </div>
      //   );
      // case 3:
      //   return (
      //     <div>
      //       <Subheader>Multispectral NIIRS - Select one or more applicable ratings</Subheader>
      //       <NiirsMultispectralGrid fieldName={"mul"} />
      //     </div>
      //   );
      // case 4:
      //   return (
      //     <div>
      //       <Subheader>Radar NIIRS - Select one or more applicable ratings</Subheader>
      //       <NiirsRadarGrid fieldName={"rad"} />
      //     </div>
      //   );
      default:
        return <div>Unknown sensor selected</div>;
    }
  }

  render() {
    const { handleSubmit, previousPage, currentNiirsSensor } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Processed" />
        <CardText>
          <LogbookSelectField
            fieldName={`${PAGE_NAME}NIIRS`}
            fieldLabel="Select a sensor"
            items={SENSORS}
          />
          {this.renderSensorGrid(currentNiirsSensor)}
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

    return {
      currentNiirsSensor,
    }
  }
)(myReduxForm);
