/* eslint-disable no-undef */
import { Vector3 } from './utils';
/**
 * The current rendering gameplay camera
 */
export class GameplayCamera {
  /**
   * Get the world position of gameplay camera.
   */
  static get Position() {
    return Vector3.fromArray(GetGameplayCamCoords());
  }
  /**
   * Get the rotation of gameplay camera.
   */
  static get Rotation() {
    return Vector3.fromArray(GetGameplayCamRot(2));
  }
  /**
   * Get the forward vector of gameplay camera.
   */
  static get ForwardVector() {
    const rotation = Vector3.multiply(this.Rotation, Math.PI / 180);
    return Vector3.normalize(
      new Vector3(
        -Math.sin(rotation.z) * Math.abs(Math.cos(rotation.x)),
        Math.cos(rotation.z) * Math.abs(Math.cos(rotation.x)),
        Math.sin(rotation.x),
      ),
    );
  }
  /**
   * Get the pitch of the gameplay camera relative to player.
   */
  static get RelativePitch() {
    return GetGameplayCamRelativePitch();
  }
  /**
   * Set gameplay camera pitch relative to player.
   */
  static set RelativePitch(pitch) {
    SetGameplayCamRelativePitch(pitch, 1);
  }
  /**
   * Get heading of gameplay camera.
   */
  static get RelativeHeading() {
    return GetGameplayCamRelativeHeading();
  }
  /**
   * Get heading of gameplay camera.
   */
  static set RelativeHeading(heading) {
    SetGameplayCamRelativeHeading(heading);
  }
}
