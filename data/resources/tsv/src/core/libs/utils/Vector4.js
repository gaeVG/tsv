export class Vector4 {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  static create(v1) {
    if (typeof v1 === 'number') return new Vector4(v1, v1, v1, v1);
    return new Vector4(v1.x, v1.y, v1.z, v1.w);
  }
  /**
   * Creates a vector from an array of numbers
   * @param primitive An array of numbers (usually returned by a native)
   * ```
   */
  static fromArray(primitive) {
    return new Vector4(primitive[0], primitive[1], primitive[2], primitive[3]);
  }
  /**
   * Creates an array of vectors from an array number arrays
   * @param primitives A multi-dimensional array of number arrays
   * ```
   */
  static fromArrays(primitives) {
    return primitives.map((prim) => new Vector4(prim[0], prim[1], prim[2], prim[3]));
  }
  static clone(v1) {
    return Vector4.create(v1);
  }
  static add(v1, v2) {
    if (typeof v2 === 'number') return new Vector4(v1.x + v2, v1.y + v2, v1.z + v2, v1.w + v2);
    return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
  }
  static subtract(v1, v2) {
    if (typeof v2 === 'number') return new Vector4(v1.x - v2, v1.y - v2, v1.z - v2, v1.w - v2);
    return new Vector4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
  }
  static multiply(v1, v2) {
    if (typeof v2 === 'number') return new Vector4(v1.x * v2, v1.y * v2, v1.z * v2, v1.w * v2);
    return new Vector4(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z, v1.w * v2.w);
  }
  static divide(v1, v2) {
    if (typeof v2 === 'number') return new Vector4(v1.x / v2, v1.y / v2, v1.z / v2, v1.w / v2);
    return new Vector4(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z, v1.w / v2.w);
  }
  static dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
  }
  static crossProduct(v1, v2) {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x;
    return new Vector4(x, y, z, v1.w);
  }
  static normalize(v) {
    return Vector4.divide(v, v.Length);
  }
  clone() {
    return new Vector4(this.x, this.y, this.z, this.w);
  }
  /**
   * The product of the Euclidean magnitudes of this and another Vector4.
   *
   * @param v Vector4 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  distanceSquared(v) {
    const w = this.subtract(v);
    return Vector4.dotProduct(w, w);
  }
  /**
   * The distance between two Vectors.
   *
   * @param v Vector4 to find distance between.
   * @returns Distance between this and another vector.
   */
  distance(v) {
    return Math.sqrt(this.distanceSquared(v));
  }
  get normalize() {
    return Vector4.normalize(this);
  }
  crossProduct(v) {
    return Vector4.crossProduct(this, v);
  }
  dotProduct(v) {
    return Vector4.dotProduct(this, v);
  }
  add(v) {
    return Vector4.add(this, v);
  }
  subtract(v) {
    return Vector4.subtract(this, v);
  }
  multiply(v) {
    return Vector4.multiply(this, v);
  }
  divide(v) {
    return Vector4.divide(this, v);
  }
  toArray() {
    return [this.x, this.y, this.z, this.w];
  }
  replace(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w;
  }
  get Length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
}
