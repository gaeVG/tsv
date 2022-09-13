import { CheckpointIcon } from './enums';
import { Vector3 } from './utils';
export class Checkpoint {
  constructor(handle) {
    this.position = new Vector3(0, 0, 0);
    this.targetPosition = new Vector3(0, 0, 0);
    this.icon = CheckpointIcon.Empty;
    this.radius = 0;
    this.handle = handle;
  }
  get Position() {
    return this.position;
  }
  set Position(position) {
    this.position = position;
  }
  get TargetPosition() {
    return this.targetPosition;
  }
  set TargetPosition(targetPosition) {
    this.targetPosition = targetPosition;
  }
  get Icon() {
    return this.icon;
  }
  set Icon(icon) {
    this.icon = icon;
  }
  // TODO
  //   public get CustomIcon(): CheckpointIcon {
  //     return this.icon;
  //   }
  //     public set CustomIcon(icon: CheckpointIcon) {
  //     this.icon = icon;
  //   }
  get Radius() {
    return this.radius;
  }
  set Radius(radius) {
    this.radius = radius;
  }
}
