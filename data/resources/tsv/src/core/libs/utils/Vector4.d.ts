export interface Vec4 {
  x: number;
  y: number;
  z: number;
  w: number;
}
export declare type Vector4Type = Vector4 | Vec4;
export declare class Vector4 implements Vec4 {
  x: number;
  y: number;
  z: number;
  w: number;
  static create(v1: Vec4 | number): Vector4;
  /**
   * Creates a vector from an array of numbers
   * @param primitive An array of numbers (usually returned by a native)
   * ```
   */
  static fromArray(primitive: [number, number, number, number] | number[]): Vector4;
  /**
   * Creates an array of vectors from an array number arrays
   * @param primitives A multi-dimensional array of number arrays
   * ```
   */
  static fromArrays(primitives: [number, number, number, number][] | number[][]): Vector4[];
  static clone(v1: Vec4): Vector4;
  static add(v1: Vector4Type, v2: Vector4Type | number): Vector4;
  static subtract(v1: Vector4Type, v2: Vector4Type | number): Vector4;
  static multiply(v1: Vector4Type, v2: Vector4Type | number): Vector4;
  static divide(v1: Vector4Type, v2: Vector4Type | number): Vector4;
  static dotProduct(v1: Vector4Type, v2: Vector4Type): number;
  static crossProduct(v1: Vector4Type, v2: Vector4Type): Vector4;
  static normalize(v: Vector4): Vector4;
  constructor(x: number, y: number, z: number, w: number);
  clone(): Vector4;
  /**
   * The product of the Euclidean magnitudes of this and another Vector4.
   *
   * @param v Vector4 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  distanceSquared(v: Vector4Type): number;
  /**
   * The distance between two Vectors.
   *
   * @param v Vector4 to find distance between.
   * @returns Distance between this and another vector.
   */
  distance(v: Vector4Type): number;
  get normalize(): Vector4;
  crossProduct(v: Vector4Type): Vector4;
  dotProduct(v: Vector4Type): number;
  add(v: Vector4Type | number): Vector4;
  subtract(v: Vector4Type): Vector4;
  multiply(v: Vector4Type | number): Vector4;
  divide(v: Vector4Type | number): Vector4;
  toArray(): [number, number, number, number];
  replace(v: Vector4Type): void;
  get Length(): number;
}
