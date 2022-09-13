export interface Vec2 {
  x: number;
  y: number;
}
export declare type Vector2Type = Vector2 | Vec2;
export declare class Vector2 implements Vec2 {
  x: number;
  y: number;
  static create(v1: Vec2 | number): Vector2;
  /**
   * Creates a vector from an array of numbers
   * @param primitive An array of numbers (usually returned by a native)
   * ```
   */
  static fromArray(primitive: [number, number] | number[]): Vector2;
  /**
   * Creates an array of vectors from an array number arrays
   * @param primitives A multi-dimensional array of number arrays
   * ```
   */
  static fromArrays(primitives: [number, number][] | number[][]): Vector2[];
  static clone(v1: Vec2): Vector2;
  static add(v1: Vector2Type, v2: Vector2Type | number): Vector2;
  static subtract(v1: Vector2Type, v2: Vector2Type | number): Vector2;
  static multiply(v1: Vector2Type, v2: Vector2Type | number): Vector2;
  static divide(v1: Vector2Type, v2: Vector2Type | number): Vector2;
  static dotProduct(v1: Vector2Type, v2: Vector2Type): number;
  static normalize(v: Vector2): Vector2;
  constructor(x: number, y: number);
  clone(): Vector2;
  /**
   * The product of the Euclidean magnitudes of this and another Vector2.
   *
   * @param v Vector2 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  distanceSquared(v: Vector2Type): number;
  /**
   * The distance between two Vectors.
   *
   * @param v Vector2 to find distance between.
   * @returns Distance between this and another vector.
   */
  distance(v: Vector2Type): number;
  get normalize(): Vector2;
  dotProduct(v: Vector2Type): number;
  add(v: Vector2Type | number): Vector2;
  subtract(v: Vector2Type): Vector2;
  multiply(v: Vector2Type | number): Vector2;
  divide(v: Vector2Type | number): Vector2;
  toArray(): [number, number];
  replace(v: Vector2Type): void;
  get Length(): number;
}
