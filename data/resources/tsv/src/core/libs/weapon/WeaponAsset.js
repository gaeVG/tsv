/* eslint-disable no-undef */
import { Weapon } from './Weapon';
import { Game } from '../Game';
import { Wait } from '../utils';
/**
 * weapon asset
 *
 */
export class WeaponAsset {
  constructor(hash) {
    this.hash = hash;
  }
  /**
   * get weapon hash
   *
   * @constructor
   */
  get Hash() {
    return this.hash;
  }
  /**
   * check weapon is valid
   *
   * @constructor
   */
  get IsValid() {
    return IsWeaponValid(this.hash);
  }
  /**
   * check weapon assets is loaded
   *
   * @constructor
   */
  get IsLoaded() {
    return HasWeaponAssetLoaded(this.hash);
  }
  /**
   * request weapon asset
   *
   */
  request() {
    RequestWeaponAsset(this.hash, 31, 0);
  }
  /**
   * request weapon asset async
   *
   * @param timeout
   */
  async requestAsync(timeout) {
    this.request();
    const start = GetGameTimer();
    while (!this.IsLoaded) {
      await Wait(100);
      const now = GetGameTimer();
      if (now - start >= timeout) {
        return false;
      }
    }
    return true;
  }
  /**
   * unload weapon asset
   *
   */
  dismiss() {
    RemoveWeaponAsset(this.hash);
  }
  /**
   * get weapon display name / label
   *
   * @constructor
   */
  get DisplayName() {
    return Weapon.getDisplayNameFromHash(this.hash);
  }
  /**
   * get weapon localized name
   *
   * @constructor
   */
  get LocalizedName() {
    return Game.getGXTEntry(this.DisplayName);
  }
}
