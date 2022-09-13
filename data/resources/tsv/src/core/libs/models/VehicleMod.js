/* eslint-disable no-undef */
export class VehicleMod {
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
  get Index() {
    return GetVehicleMod(this._owner.Handle, this.ModType);
  }
  set Index(value) {
    SetVehicleMod(this._owner.Handle, this.ModType, value, this.Variation);
  }
  get Variation() {
    return GetVehicleModVariation(this._owner.Handle, this.ModType);
  }
  set Variation(value) {
    SetVehicleMod(this._owner.Handle, this.ModType, this.Index, value);
  }
  get ModCount() {
    return GetNumVehicleMods(this._owner.Handle, this.ModType);
  }
  get Vehicle() {
    return this._owner;
  }
  remove() {
    RemoveVehicleMod(this._owner.Handle, this.ModType);
  }
}
