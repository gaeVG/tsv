import { VehicleWindowIndex } from '../enums';
import { VehicleWindow } from './VehicleWindow';
export class VehicleWindowCollection {
  constructor(owner) {
    this._vehicleWindows = new Map();
    this._owner = owner;
  }
  getWindow(index) {
    if (!this._vehicleWindows.has(index)) {
      this._vehicleWindows.set(index, new VehicleWindow(this._owner, index));
    }
    return this._vehicleWindows.get(index);
  }
  getAllWindows() {
    return Object.keys(VehicleWindowIndex)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => {
        const index = Number(key);
        if (this.hasWindow(index)) {
          return this.getWindow(index);
        }
        return null;
      })
      .filter((w) => w);
  }
  get AreAllWindowsIntact() {
    // eslint-disable-next-line no-undef
    return AreAllVehicleWindowsIntact(this._owner.Handle);
  }
  rollDownAllWindows() {
    this.getAllWindows().forEach((window) => {
      window?.rollDown();
    });
  }
  rollUpAllWindows() {
    this.getAllWindows().forEach((window) => {
      window?.rollUp();
    });
  }
  hasWindow(window) {
    if (this._owner.Bones === undefined) return false;
    switch (window) {
      case VehicleWindowIndex.FrontLeftWindow:
        return this._owner.Bones.hasBone('window_lf');
      case VehicleWindowIndex.FrontRightWindow:
        return this._owner.Bones.hasBone('window_rf');
      case VehicleWindowIndex.BackLeftWindow:
        return this._owner.Bones.hasBone('window_lr');
      case VehicleWindowIndex.BackRightWindow:
        return this._owner.Bones.hasBone('window_rr');
      default:
        return false;
    }
  }
}
