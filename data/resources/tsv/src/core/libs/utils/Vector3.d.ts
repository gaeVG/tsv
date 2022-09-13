export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
export declare type Vector = Vector3 | Vec3;
export declare class Vector3 implements Vec3 {
  static readonly Zero: Vector3;
  x: number;
  y: number;
  z: number;
  static create(v1: Vec3 | number): Vector3;
  /**
   * Creates a vector from an array of numbers
   * @param primitive An array of numbers (usually returned by a native)
   * @example ```ts
   * const entityPos = Vector3.fromArray(GetEntityCoords(entity))
   * ```
   */
  static fromArray(primitive: [number, number, number] | number[]): Vector3;
  /**
   * Creates an array of vectors from an array number arrays
   * @param primitives A multi-dimensional array of number arrays
   * @example ```ts
   * const [forward, right, up, position] = Vector3.fromArrays(GetEntityMatrix(entity))
   * ```
   */
  static fromArrays(primitives: [number, number, number][] | number[][]): Vector3[];
  static clone(v1: Vec3): Vector3;
  static add(v1: Vector, v2: Vector | number): Vector3;
  static subtract(v1: Vector, v2: Vector | number): Vector3;
  static multiply(v1: Vector, v2: Vector | number): Vector3;
  static divide(v1: Vector, v2: Vector | number): Vector3;
  static dotProduct(v1: Vector, v2: Vector): number;
  static crossProduct(v1: Vector, v2: Vector): Vector3;
  static normalize(v: Vector3): Vector3;
  constructor(x: number, y: number, z: number);
  clone(): Vector3;
  /**
   * The product of the Euclidean magnitudes of this and another Vector3.
   *
   * @param v Vector3 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  distanceSquared(v: Vector): number;
  /**
   * The distance between two Vectors.
   *
   * @param v Vector3 to find distance between.
   * @returns Distance between this and another vector.
   */
  distance(v: Vector): number;
  get normalize(): Vector3;
  crossProduct(v: Vector): Vector3;
  dotProduct(v: Vector): number;
  add(v: Vector | number): Vector3;
  subtract(v: Vector): Vector3;
  multiply(v: Vector | number): Vector3;
  divide(v: Vector | number): Vector3;
  toArray(): [number, number, number];
  replace(v: Vector): void;
  get Length(): number;
}
