const validate = values => {
  const errors = {};

  const isRequired = (fieldName) => {
    !values[fieldName] ? errors[fieldName] = 'Required' : null;
  }

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
  isRequired('battery_Used');
  isRequired('battery_OnUAS');
  if (!values.battery_Batteries || !values.battery_Batteries.length) {
    errors.battery_Batteries = { _error: 'At least one battery must be entered'}
  } else {
    const batteriesArrayErrors = [];
    values.battery_Batteries.forEach((battery, batteryIndex) => {
      const batteryErrors = {};
      if (!battery || !battery.SerialNumber) {
        batteryErrors.SerialNumber = 'Required';
        batteriesArrayErrors[batteryIndex] = batteryErrors;
      }
      if (!battery || !battery.Weight) {
        batteryErrors.Weight = 'Required';
        batteriesArrayErrors[batteryIndex] = batteryErrors;
      }
      if (!battery || !battery.FullChargeVoltage) {
        batteryErrors.FullChargeVoltage = 'Required';
        batteriesArrayErrors[batteryIndex] = batteryErrors;
      }
      if (!battery || !battery.DischargeVoltage) {
        batteryErrors.DischargeVoltage = 'Required'
        batteriesArrayErrors[batteryIndex] = batteryErrors;
      }
    });
    if (batteriesArrayErrors.length) {
      errors.battery_Batteries = batteriesArrayErrors;
    }
  }
  // Number of batteries used must match number of added batteries
  if (values.battery_Used && values.battery_Batteries) {
    if (parseInt(values.battery_Used, 10) !== values.battery_Batteries.length) {
      errors.battery_Batteries = { _error: 'Must add the same number of batteries as entered in the "Number of batteries used" field before proceeding.'}
    }
  }
  //
  // // flight operation
  // isRequired('flightModeSelect');
  //
  // data collection
  isRequired('dataCollection_SensorsUsed');
  if (!values.dataCollection_Sensors || !values.dataCollection_Sensors.length) {
    errors.dataCollection_Sensors = { _error: 'At least one sensor must be entered'};
  } else {
    const sensorsArrayErrors = [];
    values.dataCollection_Sensors.forEach((sensor, sensorIndex) => {
      const sensorErrors = {};
      if (!sensor || !sensor.Type) {
        sensorErrors.Type = 'Required';
        sensorsArrayErrors[sensorIndex] = sensorErrors;
      }
      if (sensor.Type) {
        if (sensor.Type === 5 && !sensorErrors.Other) {
          sensorErrors.Other = 'Required';
          sensorsArrayErrors[sensorIndex] = sensorErrors;
        }
      }
      if (!sensor || !sensor.Make) {
        sensorErrors.Make = 'Required';
        sensorsArrayErrors[sensorIndex] = sensorErrors;
      }
      if (!sensor || !sensor.Model) {
        sensorErrors.Model = 'Required';
        sensorsArrayErrors[sensorIndex] = sensorErrors;
      }
      if (!sensor || !sensor.OperationMode) {
        sensorErrors.OperationMode = 'Required';
        sensorsArrayErrors[sensorIndex] = sensorErrors;
      }
      if (sensor.OperationMode) {
        if (sensor.OperationMode === 2 && !sensor.TimeInterval) {
          sensorErrors.TimeInterval = 'Required';
          sensorsArrayErrors[sensorIndex] = sensorErrors;
        }
      }
      if (!sensor || !sensor.EndLap) {
        sensorErrors.EndLap = 'Required';
        sensorsArrayErrors[sensorIndex] = sensorErrors;
      }
      if (!sensor || !sensor.SideLap) {
        sensorErrors.SideLap = 'Required';
        sensorsArrayErrors[sensorIndex] = sensorErrors;
      }
      if (!sensor || !sensor.DataFormat) {
        sensorErrors.DataFormat = 'Required';
        sensorsArrayErrors[sensorIndex] = sensorErrors;
      }
      if (sensor.DataFormat) {
        if (sensor.DataFormat === 5 && !sensor.OtherDataFormat) {
          sensorErrors.OtherDataFormat = 'Required';
          sensorsArrayErrors[sensorIndex] = sensorErrors;
        }
      }
    });
    if (sensorsArrayErrors.length) {
      errors.dataCollection_Sensors = sensorsArrayErrors;
    }
  }
  // Number of sensors used must match number of added sensors
  if (values.dataCollection_SensorsUsed && values.dataCollection_Sensors) {
    if (parseInt(values.dataCollection_SensorsUsed, 10) !== values.dataCollection_Sensors.length) {
      errors.dataCollection_Sensors = { _error: 'Must add the same number of sensors as entered in the "Number of sensors used" field before proceeding.'}
    }
  }
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
