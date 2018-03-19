import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// material-ui elements
import { SelectField, TextField }           from 'redux-form-material-ui';
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import MenuItem                             from 'material-ui/MenuItem';
import RaisedButton                         from 'material-ui/RaisedButton';

import validate from '../helpers/validate';

// class RGBSensorSize extends React.Component {
//   handleChange(event) {
//     // convert sensor size width and height from inch to millimeter
//     // and vice versa when the unit select field changes
//     const conversionUnit = event.target.value;
//     const convertedWidth = conversionUnit === 1 ? this.props.width * 0.0393701 : this.props.width * 25.4;
//     const convertedHeight = conversionUnit === 1 ? this.props.height * 0.0393701 : this.props.height * 25.4;
//     // update sensor size width and height values in redux store
//     this.props.change(this.props.widthFieldName, convertedWidth);
//     this.props.change(this.props.heightFieldName, convertedHeight);
//   }
//
//   render() {
//     return (
//       <div>
//         Sensor size<br />
//         <Field
//           name={this.props.widthFieldName}
//           component={TextField}
//           floatingLabelText="Width"
//           type="number"
//           step="0.1"
//         />
//         <Field
//           name={this.props.heightFieldName}
//           component={TextField}
//           floatingLabelText="Height"
//           type="number"
//           step="0.1"
//         />
//         <Field
//           name={this.props.unitFieldName}
//           component={SelectField}
//           floatingLabelText="Unit"
//           onChange={this.handleChange}
//         >
//           <MenuItem value={1} primaryText="in" />
//           <MenuItem value={2} primaryText="mm" />
//         </Field>
//       </div>
//     )
//   }
// }
//
// class RGBSensor extends React.Component {
//   render() {
//     return (
//       <div>
//         <RGBSensorSize
//           change={this.props.change}
//           width={this.props.rgbSensorSizeWidth}
//           height={this.props.rgbSensorSizeHeight}
//         />
//         <RGBLensType />
//         <RGBWeight />
//         <RGBPixelCount />
//         <RGBPixelPitch />
//       </div>
//     )
//   }
// }

class Payload extends React.Component {
  render() {
    const { handleSubmit, previousPage, sensors } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Payload Metadata" />
        <CardText>
          {sensors &&
            <div></div>
          }
          {!sensors ? <span>Please <strong>add at least one sensor</strong> during the Planning phase.</span> : null}
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
            backgroundColor="#FFD100"
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
})(Payload);

const selector = formValueSelector('logbook');
export default connect(
  state => {
    const sensors = selector(state, 'sensors');

    return {
      sensors,
    }
  }
)(myReduxForm);
