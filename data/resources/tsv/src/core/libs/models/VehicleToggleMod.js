/* eslint-disable no-undef */
export class VehicleToggleMod {
  constructor(owner, modType) {
    this._owner = owner;
    this._modType = modType;
  }
  get ModType() {
    return this._modType;
  }
  set ModType(modType) {
    this._modType = modType;
  }
  get IsInstalled() {
    return IsToggleModOn(this._owner.Handle, this.ModType);
  }
  set IsInstalled(value) {
    ToggleVehicleMod(this._owner.Handle, this.ModType, value);
  }
  get LocalizedModTypeName() {
    return GetModSlotName(this._owner.Handle, this.ModType);
  }
  get Vehicle() {
    return this._owner;
  }
  remove() {
    RemoveVehicleMod(this._owner.Handle, this.ModType);
  }
}
