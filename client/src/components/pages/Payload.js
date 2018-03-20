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

class PayloadTextField extends React.Component {
  render() {
    const form = this.props.type ? <Field name={this.props.fieldName} component={TextField} floatingLabelText={this.props.fieldLabel} type={this.props.type} step={this.props.step} /> : <Field name={this.props.fieldName} component={TextField} floatingLabelText={this.props.fieldLabel} />;
    return (
      <div style={{display: 'inline-block'}}>{form}</div>
    )
  }
}

class PayloadSelectField extends React.Component {
  componentWillMount() {
    this.props.change(this.props.fieldName, 1);
  }

  menuItems(items) {
    return items.map((item) => (
      <MenuItem
        key={item.value}
        value={item.value}
        primaryText={item.name}
      />
    ))
  }
  render() {
    return (
      <Field
        name={this.props.fieldName}
        component={SelectField}
        floatingLabelText={this.props.fieldLabel}
      >
        {this.menuItems(this.props.items)}
      </Field>
    )
  }
}

const IN_MM_UNITS = [
  {value: 1, name: 'in'},
  {value: 2, name: 'mm'},
];

const IN_CM_UNITS = [
  {value: 1, name: 'in'},
  {value: 2, name: 'cm'},
];

const FT_M_UNITS = [
  {value: 1, name: 'ft'},
  {value: 2, name: 'm'},
];

const OZ_G_UNITS = [
  {value: 1, name: 'oz'},
  {value: 2, name: 'g'},
];

const G_KG_UNITS = [
  {value: 1, name: 'g'},
  {value: 2, name: 'kg'},
];

const LB_KG_UNITS = [
  {value: 1, name: 'lb'},
  {value: 2, name: 'kg'},
];

const TRIGGERING_OPTIONS = [
  {value: 1, name: 'Timer mode'},
  {value: 2, name: 'Overlap mode'},
  {value: 3, name: 'External trigger mode (PWM, GPIO, serial, and Ethernet options)'},
  {value: 4, name: 'Manual capture mode'}
];

const OPERATION_MODES = [
  {value: 1, name: 'Push-broom'},
  {value: 2, name: 'Snapshot'},
];

class RGBForm extends React.Component {
  render() {
    return (
      <div>
        <strong>Sensor #{this.props.index + 1} - RGB</strong><br /><br />
        Sensor size<br />
        <PayloadTextField
          fieldName={`${this.props.index}.rgbSensorWidthText`}
          fieldLabel="Width"
        />&nbsp;
        <PayloadTextField
          fieldName={`${this.props.index}.rgbSensorHeightText`}
          fieldLabel="Height"
        /><br />
        <PayloadSelectField
          fieldName={`${this.props.index}.rgbSensorSizeSelect`}
          fieldLabel="Unit"
          items={IN_MM_UNITS}
          change={this.props.change}
        /><br />
        <PayloadTextField
          fieldName={`${this.props.index}.rgbLensTypeText`}
          fieldLabel="Lens type"
        /><br />
        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.rgbWeightText`}
            fieldLabel="Weight"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.rgbWeightUnitSelect`}
            fieldLabel="Unit"
            items={OZ_G_UNITS}
            change={this.props.change}
          />
        </div><br />
        <PayloadTextField
          fieldName={`${this.props.index}.rgbPixelCountText`}
          fieldLabel="Pixel count"
          type="number"
          step="1"
        /><br />
        <PayloadTextField
          fieldName={`${this.props.index}.rgbPixelPitchText`}
          fieldLabel="Pixel pitch (microns)"
          type="number"
          step="0.1"
        />
        <br /><br />
      </div>
    )
  }
}

class MultispectralForm extends React.Component {
  render() {
    return (
      <div>
        <strong>Sensor #{this.props.index + 1} - Multispectral</strong><br /><br />
        Sensor size<br />
        <PayloadTextField
          fieldName={`${this.props.index}.multiSensorHorizontalText`}
          fieldLabel="Horizontal"
        />&nbsp;
        <PayloadTextField
          fieldName={`${this.props.index}.multiSensorVerticalText`}
          fieldLabel="Vertical"
        /><br />
        <PayloadSelectField
          fieldName={`${this.props.index}.multiSensorSizeUnitSelect`}
          fieldLabel="Unit"
          items={IN_MM_UNITS}
          change={this.props.change}
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.multiNumOfBandsText`}
          fieldLabel="Number of spectral bands"
          type="number"
          step="1"
        /><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.multiGSDText`}
            fieldLabel="Ground sample distance"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.multiGSDUnitSelect`}
            fieldLabel="Unit"
            items={IN_CM_UNITS}
            change={this.props.change}
          />
        </div><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.multiFOVText`}
            fieldLabel="Field of View"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.multiFOVUnitSelect`}
            fieldLabel="Unit"
            items={IN_CM_UNITS}
            change={this.props.change}
          />
        </div><br />

        <PayloadSelectField
          fieldName={`${this.props.index}.multiTriggeringOptionSelect`}
          fieldLabel="Triggering option"
          items={TRIGGERING_OPTIONS}
          change={this.props.change}
        /><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.multiWeightText`}
            fieldLabel="Weight"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.multiWeightUnitSelect`}
            fieldLabel="Unit"
            items={OZ_G_UNITS}
            change={this.props.change}
          />
        </div><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.multiPixelSizeText`}
            fieldLabel="Pixel size (microns)"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadTextField
            fieldName={`${this.props.index}.multiPixelDepthText`}
            fieldLabel="Pixel depth"
            type="number"
            step="0.1"
          />
        </div><br />

        <PayloadTextField
          fieldName={`${this.props.index}.multiFrameRateText`}
          fieldLabel="Frame rate (hertz)"
          type="number"
          step="0.1"
        /><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.multiImageFormatText`}
            fieldLabel="Image data format"
          />&nbsp;
          <PayloadTextField
            fieldName={`${this.props.index}.multiVideoFormatText`}
            fieldLabel="Video data format"
          />
        </div><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.multiShutterText`}
            fieldLabel="Electronic shutter"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadTextField
            fieldName={`${this.props.index}.multiGainText`}
            fieldLabel="Gain selection"
            type="number"
            step="0.1"
          />
        </div><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.multiVoltageText`}
            fieldLabel="Voltage requirement"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadTextField
            fieldName={`${this.props.index}.multiPowerText`}
            fieldLabel="Power consumption"
            type="number"
            step="0.1"
          />
        </div>
        <br /><br />
      </div>
    )
  }
}

class HyperspectralForm extends React.Component {
  render() {
    return (
      <div>
        <strong>Sensor #{this.props.index + 1} - Hyperspectral</strong><br /><br />
        Sensor size<br />
        <PayloadSelectField
          fieldName={`${this.props.index}.hyperOperationModeSelect`}
          fieldLabel="Operation mode"
          items={OPERATION_MODES}
          change={this.props.change}
        /><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.hyperWeightText`}
            fieldLabel="Weight"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.hyperWeightUnitSelect`}
            fieldLabel="Unit"
            items={OZ_G_UNITS}
            change={this.props.change}
          />
        </div>

        <PayloadTextField
          fieldName={`${this.props.index}.hyperSpatialBandsText`}
          fieldLabel="Spatial bands"
        />&nbsp;

        <PayloadTextField
          fieldName={`${this.props.index}.hyperSpectralBandsText`}
          fieldLabel="Spectral bands"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.hyperFrameRateText`}
          fieldLabel="Frame rate (hertz)"
          type="number"
          step="0.1"
        />&nbsp;

        <PayloadTextField
          fieldName={`${this.props.index}.hyperDispersionText`}
          fieldLabel="Dispersion per pixel"
          type="number"
          step="0.1"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.hyperFWHMText`}
          fieldLabel="FWHM slit image"
          type="number"
          step="0.1"
        />&nbsp;

        <PayloadTextField
          fieldName={`${this.props.index}.hyperLensText`}
          fieldLabel="Lens"
          type="number"
          step="0.1"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.hyperStorageText`}
          fieldLabel="Storage"
        />&nbsp;

        <PayloadTextField
          fieldName={`${this.props.index}.hyperInterfaceText`}
          fieldLabel="Interface"
        /><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.hyperSizeText`}
            fieldLabel="Size (exclusive of GPS unit)"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.hyperSizeUnitSelect`}
            fieldLabel="Unit"
            items={IN_MM_UNITS}
            change={this.props.change}
          />
        </div><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.hyperWeightText`}
            fieldLabel="Weight (without lens)"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.hyperWeightUnitSelect`}
            fieldLabel="Unit"
            items={G_KG_UNITS}
            change={this.props.change}
          />
        </div>
        <br /><br />
      </div>
    )
  }
}

class LidarForm extends React.Component {
  render() {
    return (
      <div>
        <strong>Sensor #{this.props.index + 1} - LiDAR</strong><br /><br />
        Sensor size<br />
        <PayloadTextField
          fieldName={`${this.props.index}.lidarManufacturerText`}
          fieldLabel="Manufacturer"
        />&nbsp;
        <PayloadTextField
          fieldName={`${this.props.index}.lidarModelText`}
          fieldLabel="Model"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.lidarHFOVText`}
          fieldLabel="Horizontal FOV (degree)"
        />&nbsp;
        <PayloadTextField
          fieldName={`${this.props.index}.lidarVFOVText`}
          fieldLabel="Vertical FOV (degree)"
        /><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.lidarMinRangeText`}
            fieldLabel="Minimum range"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.lidarMinRangeUnitSelect`}
            fieldLabel="Unit"
            items={FT_M_UNITS}
            change={this.props.change}
          />
        </div><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.lidarMaxRangeText`}
            fieldLabel="Maximum range"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.lidarMaxRangeUnitSelect`}
            fieldLabel="Unit"
            items={FT_M_UNITS}
            change={this.props.change}
          />
        </div><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.lidarDistanceText`}
            fieldLabel="Distance resolution"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.lidarDistanceUnitSelect`}
            fieldLabel="Unit"
            items={IN_CM_UNITS}
            change={this.props.change}
          />
        </div><br />

        <PayloadTextField
          fieldName={`${this.props.index}.lidarScanRateText`}
          fieldLabel="Scan rate (hertz)"
          type="number"
          step="0.1"
        />&nbsp;

        <PayloadTextField
          fieldName={`${this.props.index}.lidarAngularText`}
          fieldLabel="Angular resolution (hertz)"
          type="number"
          step="0.1"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.lidarPowerText`}
          fieldLabel="Power unit (watt)"
          type="number"
          step="0.1"
        />&nbsp;

        <PayloadTextField
          fieldName={`${this.props.index}.lidarVoltageText`}
          fieldLabel="Voltage"
          type="number"
          step="0.1"
        /><br />

        <div style={{display: 'flex'}}>
          <PayloadTextField
            fieldName={`${this.props.index}.lidarWeightText`}
            fieldLabel="Weight"
            type="number"
            step="0.1"
          />&nbsp;
          <PayloadSelectField
            fieldName={`${this.props.index}.lidarWeightUnitSelect`}
            fieldLabel="Unit"
            items={LB_KG_UNITS}
            change={this.props.change}
          />
        </div>
        <br /><br />
      </div>
    )
  }
}

class ThermalForm extends React.Component {
  render() {
    return (
      <div>
        <strong>Sensor #{this.props.index + 1} - Thermal</strong><br /><br />
        Dimensions<br />
        <PayloadTextField
          fieldName={`${this.props.index}.thermalWidthText`}
          fieldLabel="Width"
          type="number"
          step="0.1"
        />&nbsp;
        <PayloadTextField
          fieldName={`${this.props.index}.thermalLengthText`}
          fieldLabel="Length"
          type="number"
          step="0.1"
        />&nbsp;
        <PayloadTextField
          fieldName={`${this.props.index}.thermalHeightText`}
          fieldLabel="Height"
          type="number"
          step="0.1"
        /><br />
        <PayloadSelectField
          fieldName={`${this.props.index}.thermalDimensionUnitSelect`}
          fieldLabel="Unit"
          items={IN_MM_UNITS}
          change={this.props.change}
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.thermalSpectralBandText`}
          fieldLabel="Spectral band (microns)"
        />&nbsp;

        <PayloadTextField
          fieldName={`${this.props.index}.thermalFrameRateText`}
          fieldLabel="Frame rate (hertz)"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.thermalImagerText`}
          fieldLabel="Imager"
        />&nbsp;

        <PayloadTextField
          fieldName={`${this.props.index}.thermalMeasurementAccText`}
          fieldLabel="Measurement accuracy"
        /><br />

        Sensor resolution<br />
        <PayloadTextField
          fieldName={`${this.props.index}.thermalWidthText`}
          fieldLabel="Width"
          type="number"
          step="0.1"
        />&nbsp;
        <PayloadTextField
          fieldName={`${this.props.index}.thermalHeightText`}
          fieldLabel="Height"
          type="number"
          step="0.1"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.thermalLensText`}
          fieldLabel="Lens"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.thermalFOVText`}
          fieldLabel="Visible camera FOV (degree)"
          type="number"
          step="0.1"
        /><br />

        Visible camera resolution<br />
        <PayloadTextField
          fieldName={`${this.props.index}.thermalVisWidthText`}
          fieldLabel="Width"
          type="number"
          step="0.1"
        />&nbsp;
        <PayloadTextField
          fieldName={`${this.props.index}.thermalVisHeightText`}
          fieldLabel="Height"
          type="number"
          step="0.1"
        /><br />

        <PayloadTextField
          fieldName={`${this.props.index}.thermalVoltageText`}
          fieldLabel="Input voltage"
        />
        <br /><br />
      </div>
    )
  }
}

class SensorForm extends React.Component {
  render() {
    let form = null;
    if (this.props.sensor.sensorType === 1) {
      form = <RGBForm index={this.props.index} sensor={this.props.sensor} change={this.props.change} />
    } else if (this.props.sensor.sensorType === 2) {
      form = <MultispectralForm index={this.props.index} sensor={this.props.sensor} change={this.props.change} />
    } else if (this.props.sensor.sensorType === 3) {
      form = <HyperspectralForm index={this.props.index} sensor={this.props.sensor} change={this.props.change} />
    } else if (this.props.sensor.sensorType === 4) {
      form = <LidarForm index={this.props.index} sensor={this.props.sensor} change={this.props.change} />
    } else if (this.props.sensor.sensorType === 5) {
      form = <ThermalForm index={this.props.index} sensor={this.props.sensor} change={this.props.change} />
    } else {
      form = <div><strong>Sensor #{this.props.index + 1} - Other</strong><br /><br /></div>;
    }
    return (
      <div>{form}</div>
    )
  }
}

const SensorComponents = (sensors, change) => (
  <div>
    {sensors.map((sensor, index) => (
      <SensorForm key={index} index={index} sensor={sensor} change={change} />
    ))}
  </div>
);

class Payload extends React.Component {
  render() {
    const { handleSubmit, previousPage, sensors } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Payload Metadata" />
        <CardText>
          {sensors ? SensorComponents(sensors, this.props.change) : null}
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
