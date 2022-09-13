import { Vector3 } from './Vector3';
export class Quaternion {
  constructor(valueXOrVector, yOrW, z, w) {
    if (valueXOrVector instanceof Vector3) {
      this.x = valueXOrVector.x;
      this.y = valueXOrVector.y;
      this.z = valueXOrVector.z;
      this.w = yOrW ?? 0;
    } else if (yOrW === undefined) {
      this.x = valueXOrVector;
      this.y = valueXOrVector;
      this.z = valueXOrVector;
      this.w = valueXOrVector;
    } else {
      this.x = valueXOrVector;
      this.y = yOrW;
      this.z = z ?? 0;
      this.w = w ?? 0;
    }
  }
}
