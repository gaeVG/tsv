/* eslint-disable no-undef */
export class VehicleWheel {
  constructor(owner, index) {
    this._owner = owner;
    this._index = index;
  }
  get Index() {
    return this._index;
  }
  set Index(index) {
    this._index = index;
  }
  get Vehicle() {
    return this._owner;
  }
  burst() {
    SetVehicleTyreBurst(this._owner.Handle, this.Index, true, 1000);
  }
  fix() {
    SetVehicleTyreFixed(this._owner.Handle, this.Index);
  }
}
