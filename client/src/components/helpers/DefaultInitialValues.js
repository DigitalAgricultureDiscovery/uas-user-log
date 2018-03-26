const initialValues = {
  'mission_Type': 2,

  'crop_LifeCycle': 1,

  'hardware_Type': 1,
  'hardware_RemoteControlChargeTarget': 100.00,
  'hardware_RemoteControlChargeMinimum': 70.00,
  'hardware_GroundControlChargeTarget': 100.00,
  'hardware_GroundControlChargeMinimum': 70.00,

  'flightOperation_Mode': 1,

  'dataCollection_ChemicalType': 1,
  'dataCollection_ApplicationRateUnit': 1,
  'dataCollection_ChemicalRateUnit': 1,
  'dataCollection_StartingVolumeUnit': 1,
  'dataCollection_PressureUnit': 1,
  'dataCollection_SwathDistanceUnit': 1,
  'dataCollection_SwathAreaUnit': 1,
  'dataCollection_ApplicationType': 1,

  'b4ufly_Status': 1,
  'b4ufly_Preflight': 'yes',
  'b4ufly_Permission': 'notRequired',

  'flightParameters_AGLMaximum': 400,
  'flightParameters_AGLUnit': 1,
  'flightParameters_LookAngle': 'vertical',
  'flightParameters_MaximumGroundSpeed': 'no',

  'people_PeoplePresent': 'no',

  'processed_NIIRS': 1,
}

module.exports = initialValues;
