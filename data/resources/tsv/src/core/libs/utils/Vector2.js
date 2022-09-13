export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static create(v1) {
    if (typeof v1 === 'number') return new Vector2(v1, v1);
    return new Vector2(v1.x, v1.y);
  }
  /**
   * Creates a vector from an array of numbers
   * @param primitive An array of numbers (usually returned by a native)
   * ```
   */
  static fromArray(primitive) {
    return new Vector2(primitive[0], primitive[1]);
  }
  /**
   * Creates an array of vectors from an array number arrays
   * @param primitives A multi-dimensional array of number arrays
   * ```
   */
  static fromArrays(primitives) {
    return primitives.map((prim) => new Vector2(prim[0], prim[1]));
  }
  static clone(v1) {
    return Vector2.create(v1);
  }
  static add(v1, v2) {
    if (typeof v2 === 'number') return new Vector2(v1.x + v2, v1.y + v2);
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  static subtract(v1, v2) {
    if (typeof v2 === 'number') return new Vector2(v1.x - v2, v1.y - v2);
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }
  static multiply(v1, v2) {
    if (typeof v2 === 'number') return new Vector2(v1.x * v2, v1.y * v2);
    return new Vector2(v1.x * v2.x, v1.y * v2.y);
  }
  static divide(v1, v2) {
    if (typeof v2 === 'number') return new Vector2(v1.x / v2, v1.y / v2);
    return new Vector2(v1.x / v2.x, v1.y / v2.y);
  }
  static dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static normalize(v) {
    return Vector2.divide(v, v.Length);
  }
  clone() {
    return new Vector2(this.x, this.y);
  }
  /**
   * The product of the Euclidean magnitudes of this and another Vector2.
   *
   * @param v Vector2 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  distanceSquared(v) {
    const w = this.subtract(v);
    return Vector2.dotProduct(w, w);
  }
  /**
   * The distance between two Vectors.
   *
   * @param v Vector2 to find distance between.
   * @returns Distance between this and another vector.
   */
  distance(v) {
    return Math.sqrt(this.distanceSquared(v));
  }
  get normalize() {
    return Vector2.normalize(this);
  }
  dotProduct(v) {
    return Vector2.dotProduct(this, v);
  }
  add(v) {
    return Vector2.add(this, v);
  }
  subtract(v) {
    return Vector2.subtract(this, v);
  }
  multiply(v) {
    return Vector2.multiply(this, v);
  }
  divide(v) {
    return Vector2.divide(this, v);
  }
  toArray() {
    return [this.x, this.y];
  }
  replace(v) {
    this.x = v.x;
    this.y = v.y;
  }
  get Length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
