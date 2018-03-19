const validate = values => {
  const errors = {};
  // console.log('errors', errors);
  // // mission
  // if (!values.categorySelect) {
  //   errors.categorySelect = 'Required';
  // }
  // if (!values.typeSelect) {
  //   errors.typeSelect = 'Required';
  // }
  //
  // // crop
  // if (!values.lifeCycleSelect) {
  //   errors.lifeCycleSelect = 'Required';
  // }
  // if (!values.cropNameText) {
  //   errors.cropNameText = 'Required';
  // }
  // if (!values.growthStageText) {
  //   errors.growthStageText = 'Required';
  // }
  // if (!values.varietyText) {
  //   errors.varietyText = 'Required';
  // }
  // if (!values.seedSourceText) {
  //   errors.seedSourceText = 'Required';
  // }
  // if (!values.seedStockText) {
  //   errors.seedStockText = 'Required';
  // }
  //
  // // general
  // if (!values.flightDatePicker) {
  //   errors.flightDatePicker = 'Required';
  // }
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
  // if (!values.droneTypeSelect) {
  //   errors.droneTypeSelect = 'Required';
  // }
  // if (!values.droneMakeText) {
  //   errors.droneMakeText = 'Required';
  // }
  // if (!values.droneModelText) {
  //   errors.droneModelText = 'Required';
  // }
  // if (!values.droneRegistrationText) {
  //   errors.droneRegistrationText = 'Required';
  // }
  // if (!values.remoteChargeTargetText) {
  //   errors.remoteChargeTargetText = 'Required';
  // }
  // if (!values.remoteChargeMinimumText) {
  //   errors.remoteChargeMinimumText = 'Required';
  // }
  // if (!values.groundControlChargeTargetText) {
  //   errors.groundControlChargeTargetText = 'Required';
  // }
  // if (!values.groundControlChargeMinimumText) {
  //   errors.groundControlChargeMinimumText = 'Required';
  // }
  //
  // // battery
  // if (!values.batteriesUsedText) {
  //   errors.batteriesUsedText = 'Required';
  // }
  // if (!values.batteriesUASText) {
  //   errors.batteriesUASText = 'Required';
  // }
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

  // flight operation

  // data collection

  // b4ufly status

  // obstacles present

  // people present

  // flight parameters

  // weather

  return errors;
}

export default validate;
