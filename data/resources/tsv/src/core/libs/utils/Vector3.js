export class Vector3 {
  static Zero = new Vector3(0, 0, 0);
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static create(v1) {
    if (typeof v1 === 'number') return new Vector3(v1, v1, v1);
    return new Vector3(v1.x, v1.y, v1.z);
  }
  /**
   * Creates a vector from an array of numbers
   * @param primitive An array of numbers (usually returned by a native)
   * @example ```ts
   * const entityPos = Vector3.fromArray(GetEntityCoords(entity))
   * ```
   */
  static fromArray(primitive) {
    return new Vector3(primitive[0], primitive[1], primitive[2]);
  }
  /**
   * Creates an array of vectors from an array number arrays
   * @param primitives A multi-dimensional array of number arrays
   * @example ```ts
   * const [forward, right, up, position] = Vector3.fromArrays(GetEntityMatrix(entity))
   * ```
   */
  static fromArrays(primitives) {
    return primitives.map((prim) => new Vector3(prim[0], prim[1], prim[2]));
  }
  static clone(v1) {
    return Vector3.create(v1);
  }
  static add(v1, v2) {
    if (typeof v2 === 'number') return new Vector3(v1.x + v2, v1.y + v2, v1.z + v2);
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }
  static subtract(v1, v2) {
    if (typeof v2 === 'number') return new Vector3(v1.x - v2, v1.y - v2, v1.z - v2);
    return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }
  static multiply(v1, v2) {
    if (typeof v2 === 'number') return new Vector3(v1.x * v2, v1.y * v2, v1.z * v2);
    return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
  }
  static divide(v1, v2) {
    if (typeof v2 === 'number') return new Vector3(v1.x / v2, v1.y / v2, v1.z / v2);
    return new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
  }
  static dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }
  static crossProduct(v1, v2) {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x;
    return new Vector3(x, y, z);
  }
  static normalize(v) {
    return Vector3.divide(v, v.Length);
  }
  clone() {
    return new Vector3(this.x, this.y, this.z);
  }
  /**
   * The product of the Euclidean magnitudes of this and another Vector3.
   *
   * @param v Vector3 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  distanceSquared(v) {
    const w = this.subtract(v);
    return Vector3.dotProduct(w, w);
  }
  /**
   * The distance between two Vectors.
   *
   * @param v Vector3 to find distance between.
   * @returns Distance between this and another vector.
   */
  distance(v) {
    return Math.sqrt(this.distanceSquared(v));
  }
  get normalize() {
    return Vector3.normalize(this);
  }
  crossProduct(v) {
    return Vector3.crossProduct(this, v);
  }
  dotProduct(v) {
    return Vector3.dotProduct(this, v);
  }
  add(v) {
    return Vector3.add(this, v);
  }
  subtract(v) {
    return Vector3.subtract(this, v);
  }
  multiply(v) {
    return Vector3.multiply(this, v);
  }
  divide(v) {
    return Vector3.divide(this, v);
  }
  toArray() {
    return [this.x, this.y, this.z];
  }
  replace(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
  }
  get Length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}
