/* eslint-disable no-undef */
import { getStringFromUInt8Array, getUInt32FromUint8Array } from '../utils';
/**
 * DlcWeaponComponentData
 *
 */
export const DlcWeaponComponentData = new Map();
/**
 * Initialize DlcWeaponComponentData, avoid calling expansive native repeatedly
 *
 */
function initializeOnce() {
  let isInitialized = false;
  return function () {
    if (isInitialized || IsDuplicityVersion()) {
      return;
    }
    // magic number based on struct DlcWeaponData
    const intLength = 4;
    const strLength = 64;
    const weaponCount = GetNumDlcWeapons();
    for (let i = 0; i < weaponCount; i++) {
      const componentCount = GetNumDlcWeaponComponents(i);
      for (let j = 0; j < componentCount; j++) {
        const buffer = new Uint8Array(14 * intLength + 4 * strLength);
        // https://docs.fivem.net/natives/?_0x6CF598A2957C2BF8
        Citizen.invokeNative('0x6CF598A2957C2BF8', i, j, buffer, Citizen.returnResultAnyway());
        // noinspection PointlessArithmeticExpressionJS
        const dlcWeaponComponentData = {
          attachBone: getUInt32FromUint8Array(buffer, 0 * intLength, 1 * intLength),
          bActiveByDefault: getUInt32FromUint8Array(buffer, 2 * intLength, 3 * intLength),
          unk: getUInt32FromUint8Array(buffer, 4 * intLength, 5 * intLength),
          componentHash: getUInt32FromUint8Array(buffer, 6 * intLength, 7 * intLength),
          unk2: getUInt32FromUint8Array(buffer, 8 * intLength, 9 * intLength),
          componentCost: getUInt32FromUint8Array(buffer, 10 * intLength, 11 * intLength),
          name: getStringFromUInt8Array(buffer, 12 * intLength, 12 * intLength + strLength),
          desc: getStringFromUInt8Array(
            buffer,
            12 * intLength + strLength,
            12 * intLength + 2 * strLength,
          ),
        };
        DlcWeaponComponentData.set(dlcWeaponComponentData.componentHash, dlcWeaponComponentData);
      }
    }
    isInitialized = true;
  };
}
initializeOnce()();
