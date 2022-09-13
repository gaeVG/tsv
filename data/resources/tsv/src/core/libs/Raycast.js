/* eslint-disable no-undef */
import { Game } from './Game';
import { Vector3 } from './utils';
/**
 * Class that represents the result of a raycast.
 */
export class RaycastResult {
  // FIXME: This only works with StartExpensiveSynchronousShapeTestLosProbe, this should have some getter you have to await afterwards for all of the data
  /**
   * Create a RaycastResult object that gets the results from a StartShapeTestRay()
   *
   * @param handle The handle returned from StartShapeTestRay()
   */
  constructor(handle) {
    this.handle = handle;
    this.hitPositionArg = new Vector3(0, 0, 0);
    this.hitSomethingArg = false;
    this.entityHandleArg = null;
    this.surfaceNormalArg = new Vector3(0, 0, 0);
    this.materialArg = 0;
    const [result, hit, endCoords, surfaceNormal, materialHash, entityHit] =
      GetShapeTestResultIncludingMaterial(this.handle);
    this.hitSomethingArg = hit;
    this.hitPositionArg = Vector3.fromArray(endCoords);
    this.surfaceNormalArg = Vector3.fromArray(surfaceNormal);
    this.materialArg = materialHash;
    this.entityHandleArg = Game.entityFromHandle(entityHit);
    this.result = result;
  }
  /**
   * Return the entity that was hit.
   */
  get HitEntity() {
    return this.entityHandleArg;
  }
  /**
   * Get the position of the entity that was hit.
   */
  get HitPosition() {
    return this.hitPositionArg;
  }
  /**
   * Return the vector perpendicular to the tangent plane.
   */
  get SurfaceNormal() {
    return this.surfaceNormalArg;
  }
  /**
   * Whether we hit anything.
   */
  get DidHit() {
    return this.hitSomethingArg;
  }
  /**
   * Whether the entity hit exists.
   */
  get DidHitEntity() {
    return this.entityHandleArg?.Handle !== 0;
  }
  /**
   * Material type that was hit.
   */
  get Material() {
    return this.materialArg;
  }
  /**
   * Raycast result's handle.
   */
  get Result() {
    return this.result;
  }
}
