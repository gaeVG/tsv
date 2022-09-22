enum ErrorCodeEnum {
  // Activities
  DriverActivityTargetTooFarAwayError = 0x5461726765745,
  DriverActivityPlayerNotInVehicleError = 0x506c617965724,
  // Entrances
  EntranceNotFoundError = 0x456e7472616e6,
  DoorsMustBeTwoError = 0x446f6f72734d7,
  EntranceToggleStateError = 0x456e7472616e7,
  EntranceHeadingError = 0x456e7472616e8,
}

export { ErrorCodeEnum };
