const validate = values => {
  const errors = {};

  const isRequired = (fieldName) => {
    if (!values[fieldName]) {
      errors[fieldName] = 'Required';
    }
  }

  // Mission
  isRequired('mission_Type');

  // Crop
  isRequired('crop_LifeCycle');
  isRequired('crop_Name');
  isRequired('crop_GrowthStage');
  isRequired('crop_Variety');
  isRequired('crop_SeedSource');
  isRequired('crop_SeedStock');
  isRequired('crop_YearDate');
  isRequired('crop_Rootstock');
  isRequired('crop_Scion');

  // General
  isRequired('general_FlightDate');
  if (!values.general_Flights || !values.general_Flights.length) {
    errors.general_Flights = { _error: 'At least one flight must be entered'}
  } else {
    const flightsArrayErrors = [];
    values.general_Flights.forEach((flight, flightIndex) => {
      const flightErrors = {};
      if (!flight || !flight.Start) {
        flightErrors.Start = 'Required';
        flightsArrayErrors[flightIndex] = flightErrors;
      }
      if (!flight || !flight.End) {
        flightErrors.End = 'Required';
        flightsArrayErrors[flightIndex] = flightErrors;
      }
      if (!flight || !flight.Latitude) {
        flightErrors.Latitude = 'Required';
        flightsArrayErrors[flightIndex] = flightErrors;
      }
      if (!flight || !flight.Longitude) {
        flightErrors.Longitude = 'Required';
        flightsArrayErrors[flightIndex] = flightErrors;
      }
    });
    if (flightsArrayErrors.length) {
      errors.general_Flights = flightsArrayErrors;
    }
  }

  // Team information
  if (!values.team_RemotePICs || !values.team_RemotePICs.length) {
    errors.team_RemotePICs = { _error: 'At least one remote PIC must be entered'}
  } else {
    const remotePICsArrayErrors = [];
    values.team_RemotePICs.forEach((remotePIC, remotePICIndex) => {
      const remotePICErrors = {};
      if (!remotePIC || !remotePIC.Name) {
        remotePICErrors.Name = 'Required';
        remotePICsArrayErrors[remotePICIndex] = remotePICErrors;
      }
      if (!remotePIC || !remotePIC.License) {
        remotePICErrors.License = 'Required';
        remotePICsArrayErrors[remotePICIndex] = remotePICErrors;
      }
    });
    if (remotePICsArrayErrors.length) {
      errors.team_RemotePICs = remotePICsArrayErrors;
    }
  }

  if (values.team_PICs !== undefined) {
    if (values.team_PICs.length > 0) {
      const picsArrayErrors = [];
      values.team_PICs.forEach((pic, picIndex) => {
        const picErrors = {};
        if (!pic || !pic.Name) {
          picErrors.Name = 'Required';
          picsArrayErrors[picIndex] = picErrors;
        }
      });
      if (picsArrayErrors.length) {
        errors.team_PICs = picsArrayErrors;
      }
    }
  }

  if (values.team_VOs !== undefined) {
    if (values.team_VOs.length > 0) {
      const vosArrayErrors = [];
      values.team_VOs.forEach((vo, voIndex) => {
        const voErrors = {};
        if (!vo || !vo.Name) {
          voErrors.Name = 'Required';
          vosArrayErrors[voIndex] = voErrors;
        }
      });
      if (vosArrayErrors.length) {
        errors.team_VOs = vosArrayErrors;
      }
    }
  }

  // Hardware
  isRequired('hardware_Type');
  isRequired('hardware_Registration');
  isRequired('hardware_RemoteControlChargeTarget');
  isRequired('hardware_RemoteControlChargeMinimum');
  isRequired('hardware_GroundControlChargeTarget');
  isRequired('hardware_GroundControlChargeMinimum');

  // Battery
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
      if (!battery || !battery.NumOfCells) {
        batteryErrors.NumOfCells = 'Required';
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

  // Flight operation
  isRequired('flightOperation_Mode');

  // Data collection - Research
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
        if (sensor.Type === 6 && !sensor.Other) {
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

  // Data collection - Research
  isRequired('dataCollection_ChemicalType');
  isRequired('dataCollection_ChemicalOther');
  isRequired('dataCollection_ApplicationRate');
  isRequired('dataCollection_ChemicalRate');
  isRequired('dataCollection_StartingVolume');
  isRequired('dataCollection_NozzleNumber');
  isRequired('dataCollection_NozzleType');
  isRequired('dataCollection_OrificeSize');
  isRequired('dataCollection_Pressure');
  isRequired('dataCollection_SwathDistance');
  isRequired('dataCollection_SwathArea');
  isRequired('dataCollection_ApplicationType');

  // B4UFLY status
  isRequired('b4ufly_Status');
  if (values.b4ufly_Status && values.b4ufly_Status === 2) {
    isRequired('b4ufly_AirportOperatorContact');
    isRequired('b4ufly_ControlTowerContact');
  }
  isRequired('b4ufly_Options');
  isRequired('b4ufly_FAACert');
  isRequired('b4ufly_Preflight');
  if (values.b4ufly_Preflight && values.b4ufly_Preflight === 'no') {
    isRequired('b4ufly_Permission');
    if (values.b4ufly_Permission && values.b4ufly_Permission === 'permitted') {
      isRequired('b4ufly_PermittedBy');
    }
  }

  // Obstacles present
  isRequired('obstacles_Obstacles');

  // People present
  isRequired('people_PeoplePresent');
  if (values.peoplePresentRadioButtonGroup === 'faaCOA') {
    isRequired('people_FAACOA');
  }

  // Flight parameters
  isRequired('flightParameters_AGLMaximum');
  isRequired('flightParameters_MaximumGroundSpeed');
  if (values.mission_Type === 2) {
    isRequired('flightParameters_LookAngle');
  }

  // Payload

  // Processed

  return errors;
}

export default validate;
