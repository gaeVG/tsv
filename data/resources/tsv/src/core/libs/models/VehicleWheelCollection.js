import { VehicleWheel } from './VehicleWheel';
import { VehicleWheelIndex } from '../enums';
export class VehicleWheelCollection {
  constructor(owner) {
    this._vehicleWheels = new Map();
    this._owner = owner;
  }
  getWheel(index) {
    if (!this._vehicleWheels.has(index)) {
      this._vehicleWheels.set(index, new VehicleWheel(this._owner, index));
    }
    return this._vehicleWheels.get(index);
  }
  getAllWheels() {
    return Object.keys(VehicleWheelIndex)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => {
        const index = Number(key);
        if (this.hasWheel(index)) {
          return this.getWheel(index);
        }
        return null;
      })
      .filter((w) => w);
  }
  burstAllWheels() {
    this.getAllWheels().forEach((wheel) => {
      wheel?.burst();
    });
  }
  fixAllWheels() {
    this.getAllWheels().forEach((wheel) => {
      wheel?.fix();
    });
  }
  hasWheel(wheel) {
    if (this._owner.Bones === undefined) return false;
    switch (wheel) {
      case VehicleWheelIndex.FrontLeftWheel:
        return this._owner.Bones.hasBone('wheel_lf');
      case VehicleWheelIndex.FrontRightWheel:
        return this._owner.Bones.hasBone('wheel_rf');
      case VehicleWheelIndex.MidLeftWheel:
        return this._owner.Bones.hasBone('wheel_lm');
      case VehicleWheelIndex.MidRightWheel:
        return this._owner.Bones.hasBone('wheel_rm');
      case VehicleWheelIndex.RearLeftWheel:
        return this._owner.Bones.hasBone('wheel_lr');
      case VehicleWheelIndex.RearRightWheel:
        return this._owner.Bones.hasBone('wheel_rr');
      default:
        return false;
    }
  }
}
