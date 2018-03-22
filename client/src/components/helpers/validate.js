const validate = values => {
  const errors = {};

  // const isRequired = (fieldName) => {
  //   !values[fieldName] ? errors[fieldName] = 'Required' : null;
  // }

  // // mission
  // isRequired('typeSelect');
  //
  // // crop
  // isRequired('lifeCycleSelect');
  // isRequired('cropNameText');
  // isRequired('growthStageText');
  // isRequired('varietyText');
  // isRequired('seedSourceText');
  // isRequired('seedStockText');
  //
  // // general
  // isRequired('flightDatePicker');
  //
  // if (!values.flights || !values.flights.length) {
  //   errors.flights = { _error: 'At least one flight must be entered'}
  // } else {
  //   const flightsArrayErrors = [];
  //   values.flights.forEach((flight, flightIndex) => {
  //     const flightErrors = {};
  //     if (!flight || !flight.flightTimeStart) {
  //       flightErrors.flightTimeStart = 'Required';
  //       flightsArrayErrors[flightIndex] = flightErrors;
  //     }
  //     if (!flight || !flight.flightTimeEnd) {
  //       flightErrors.flightTimeEnd = 'Required';
  //       flightsArrayErrors[flightIndex] = flightErrors;
  //     }
  //     if (!flight || !flight.flightLatLocation) {
  //       flightErrors.flightLatLocation = 'Required';
  //       flightsArrayErrors[flightIndex] = flightErrors;
  //     }
  //     if (!flight || !flight.flightLonLocation) {
  //       flightErrors.flightLonLocation = 'Required';
  //       flightsArrayErrors[flightIndex] = flightErrors;
  //     }
  //   });
  //   if (flightsArrayErrors.length) {
  //     errors.flights = flightsArrayErrors;
  //   }
  // }
  //
  // // team information
  // if (!values.remotePICs || !values.remotePICs.length) {
  //   errors.remotePICs = { _error: 'At least one remote PIC must be entered'}
  // } else {
  //   const remotePICsArrayErrors = [];
  //   values.remotePICs.forEach((remotePIC, remotePICIndex) => {
  //     const remotePICErrors = {};
  //     if (!remotePIC || !remotePIC.remotePicName) {
  //       remotePICErrors.remotePicName = 'Required';
  //       remotePICsArrayErrors[remotePICIndex] = remotePICErrors;
  //     }
  //     if (!remotePIC || !remotePIC.remotePicLicense) {
  //       remotePICErrors.remotePicLicense = 'Required';
  //       remotePICsArrayErrors[remotePICIndex] = remotePICErrors;
  //     }
  //   });
  //   if (remotePICsArrayErrors.length) {
  //     errors.remotePICs = remotePICsArrayErrors;
  //   }
  // }
  //
  // // hardware
  // isRequired('droneTypeSelect');
  // isRequired('droneMakeText');
  // isRequired('droneModelText');
  // isRequired('droneRegistrationText');
  // isRequired('remoteChargeTargetText');
  // isRequired('remoteChargeMinimumText');
  // isRequired('groundControlChargeTargetText');
  // isRequired('groundControlChargeMinimumText');
  //
  // // battery
  // isRequired('batteriesUsedText');
  // isRequired('batteriesUASText');
  // if (!values.batteries || !values.batteries.length) {
  //   errors.batteries = { _error: 'At least one battery must be entered'}
  // } else {
  //   const batteriesArrayErrors = [];
  //   values.batteries.forEach((battery, batteryIndex) => {
  //     const batteryErrors = {};
  //     if (!battery || !battery.batteryWeight) {
  //       batteryErrors.batteryWeight = 'Required';
  //       batteriesArrayErrors[batteryIndex] = batteryErrors;
  //     }
  //     if (!battery || !battery.batteryTarget) {
  //       batteryErrors.batteryTarget = 'Required';
  //       batteriesArrayErrors[batteryIndex] = batteryErrors;
  //     }
  //     if (!battery || !battery.batteryMinimum) {
  //       batteryErrors.batteryMinimum = 'Required'
  //       batteriesArrayErrors[batteryIndex] = batteryErrors;
  //     }
  //   });
  //   if (batteriesArrayErrors.length) {
  //     errors.batteries = batteriesArrayErrors;
  //   }
  // }
  //
  // // flight operation
  // isRequired('flightModeSelect');
  //
  // // data collection
  // isRequired('sensorsUsedText');
  // if (!values.sensors || !values.sensors.length) {
  //   errors.sensors = { _error: 'At least one sensor must be entered'};
  // } else {
  //   const sensorsArrayErrors = [];
  //   values.sensors.forEach((sensor, sensorIndex) => {
  //     const sensorErrors = {};
  //     if (!sensor || !sensor.sensorType) {
  //       sensorErrors.sensorType = 'Required';
  //       sensorsArrayErrors[sensorIndex] = sensorErrors;
  //     }
  //     if (!sensor || !sensor.sensorMake) {
  //       sensorErrors.sensorType = 'Required';
  //       sensorsArrayErrors[sensorIndex] = sensorErrors;
  //     }
  //     if (!sensor || !sensor.sensorModel) {
  //       sensorErrors.sensorModel = 'Required';
  //       sensorsArrayErrors[sensorIndex] = sensorErrors;
  //     }
  //     if (!sensor || !sensor.operationMode) {
  //       sensorErrors.operationMode = 'Required';
  //       sensorsArrayErrors[sensorIndex] = sensorErrors;
  //     }
  //     if (!sensor || !sensor.timeInterval) {
  //       sensorErrors.timeInterval = 'Required';
  //       sensorsArrayErrors[sensorIndex] = sensorErrors;
  //     }
  //   })
  // }
  //
  // // b4ufly status
  // isRequired('statusSelect');
  //
  // if (values.statusSelect && values.statusSelect == 2) {
  //   isRequired('airportOperatorContactText');
  //   isRequired('controlTowerContactText');
  // }
  //
  // isRequired('faaCertText');
  //
  // isRequired('preflightRadioButtonGroup');
  //
  // if (values.preflightRadioButtonGroup === 'no' && values.permissionRadioButtonGroup === 'permitted') {
  //   isRequired('permittedByText');
  // }
  //
  // // obstacles present
  // isRequired('obstaclesSelect');
  //
  // // people present
  // isRequired('peoplePresentRadioButtonGroup');
  //
  // if (values.peoplePresentRadioButtonGroup === 'faaCOA') {
  //   isRequired('faaCOA');
  // }
  //
  // // flight parameters
  // isRequired('maximumAGLText');
  // isRequired('minimumAGLText');
  // isRequired('lookAngleRadioButtonGroup');
  // isRequired('maximumGroundSpeedRadioButtonGroup');

  // payload

  // processed

  return errors;
}

export default validate;
