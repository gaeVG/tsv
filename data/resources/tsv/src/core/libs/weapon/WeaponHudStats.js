/* eslint-disable no-undef */
import { enumValues } from '../utils';
import { WeaponHash } from '../hashes';
import { getUInt32FromUint8Array } from '../utils';
/**
 * Mapping of WeaponHash -> WeaponHudStats
 *
 */
export const WeaponHudStats = new Map();
/**
 * Initialize WeaponHudStats, avoid calling expansive native repeatedly
 *
 */
function initializeOnce() {
  let isInitialized = false;
  return function () {
    if (isInitialized || IsDuplicityVersion()) {
      return;
    }
    // magic number based on struct WeaponHudStats
    const intLength = 4;
    for (const hash of enumValues(WeaponHash)) {
      const buffer = new Uint8Array(0x28);
      // https://docs.fivem.net/natives/?_0xD92C739EE34C9EBA
      Citizen.invokeNative('0xD92C739EE34C9EBA', hash, buffer, Citizen.returnResultAnyway());
      // noinspection PointlessArithmeticExpressionJS
      const weaponHudStats = {
        hudDamage: getUInt32FromUint8Array(buffer, 0 * intLength, 1 * intLength),
        hudSpeed: getUInt32FromUint8Array(buffer, 2 * intLength, 3 * intLength),
        hudCapacity: getUInt32FromUint8Array(buffer, 4 * intLength, 5 * intLength),
        hudAccuracy: getUInt32FromUint8Array(buffer, 6 * intLength, 7 * intLength),
        hudRange: getUInt32FromUint8Array(buffer, 8 * intLength, 9 * intLength),
      };
      WeaponHudStats.set(hash, weaponHudStats);
    }
    isInitialized = true;
  };
}
initializeOnce()();
