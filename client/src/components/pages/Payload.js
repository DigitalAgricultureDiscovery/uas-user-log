import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm, getFormValues } from 'redux-form';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import RaisedButton                         from 'material-ui/RaisedButton';

import RGBForm           from './payload/RGBForm';
import MultispectralForm from './payload/MultispectralForm';
import HyperspectralForm from './payload/HyperspectralForm';
import LidarForm         from './payload/LidarForm';
import ThermalForm       from './payload/ThermalForm';

import validate from '../helpers/validate';

const PAGE_NAME = 'payload_';

class RenderSensors extends React.Component {
  componentWillMount() {
    if (this.props.formValues.dataCollection_Sensors && this.props.formValues.dataCollection_Sensors.length > 0) {
      this.props.formValues.dataCollection_Sensors.forEach((sensor, index) => {
        this.props.fields.push({});
      });
    }
  }
  render() {
    const { fields, change, formValues } = this.props;
    return (
      <ul style={{listStyleType: "none", padding: 0}}>
        {fields.map((sensor, index) =>
          <li key={index}>
            {formValues.dataCollection_Sensors[index].Type === 1 &&
              <div>
                <strong>Sensor #{index + 1} - RGB</strong><br /><br />
                <RGBForm
                  sensorName={`${sensor}`}
                  index={index}
                  change={change}
                  formValues={formValues}
                />
              </div>
            }
            {formValues.dataCollection_Sensors[index].Type === 2 &&
              <div>
                <strong>Sensor #{index + 1} - Multispectral</strong><br /><br />
                <MultispectralForm
                  sensorName={`${sensor}`}
                  index={index}
                  change={change}
                  formValues={formValues}
                />
              </div>
            }
            {formValues.dataCollection_Sensors[index].Type === 3 &&
              <div>
                <strong>Sensor #{index + 1} - Hyperspectral</strong><br /><br />
                <HyperspectralForm
                  sensorName={`${sensor}`}
                  index={index}
                  change={change}
                  formValues={formValues}
                />
              </div>
            }
            {formValues.dataCollection_Sensors[index].Type === 4 &&
              <div>
                <strong>Sensor #{index + 1} - LiDAR</strong><br /><br />
                <LidarForm
                  sensorName={`${sensor}`}
                  index={index}
                  change={change}
                  formValues={formValues}
                />
              </div>
            }
            {formValues.dataCollection_Sensors[index].Type === 5 &&
              <div>
                <strong>Sensor #{index + 1} - Thermal</strong><br /><br />
                <ThermalForm
                  sensorName={`${sensor}`}
                  index={index}
                  change={change}
                  formValues={formValues}
                />
              </div>
            }
            {formValues.dataCollection_Sensors[index].Type > 5 &&
              <div><strong>Sensor #{index + 1} - Other</strong><br /><br /></div>
            }
          </li>
        )}
      </ul>
    )
  }

}

class Payload extends React.Component {
  render() {
    const { handleSubmit, previousPage, formValues } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Payload Metadata" />
        <CardText>
          {formValues.dataCollection_Sensors ?
            <FieldArray
              name={`${PAGE_NAME}Sensors`}
              component={RenderSensors}
              change={this.props.change}
              formValues={formValues}
            />
          : null}
          {!formValues.dataCollection_Sensors ? <span>Please <strong>add at least one sensor</strong> during the Planning phase.</span> : null}
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

export default connect(
  state => ({
    formValues: getFormValues('logbook')(state),
  })
)(myReduxForm);
