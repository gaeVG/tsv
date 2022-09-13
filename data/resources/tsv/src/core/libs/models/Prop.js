/* eslint-disable no-undef */
import { Entity } from './';
export class Prop extends Entity {
  static exists(prop) {
    return typeof prop !== 'undefined' && prop.exists();
  }
  constructor(handle) {
    super(handle);
  }
  exists() {
    return super.exists() && GetEntityType(this.handle) === 3;
  }
  placeOnGround() {
    PlaceObjectOnGroundProperly(this.handle);
  }
}
