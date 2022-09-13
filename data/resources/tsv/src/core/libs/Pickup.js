/* eslint-disable no-undef */
import { Vector3 } from './utils';
export class Pickup {
  constructor(handle) {
    this.handle = handle;
  }
  get Position() {
    return Vector3.fromArray(GetPickupCoords(this.handle));
  }
  get IsCollected() {
    return HasPickupBeenCollected(this.handle);
  }
  delete() {
    RemovePickup(this.handle);
  }
  exists() {
    return DoesPickupExist(this.handle);
  }
}
