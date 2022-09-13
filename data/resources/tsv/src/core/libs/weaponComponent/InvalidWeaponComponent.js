import { WeaponComponent } from './WeaponComponent';
import { WeaponComponentHash } from './WeaponComponentHash';
import { ComponentAttachmentPoint } from './ComponentAttachmentPoint';
import { Game } from '../Game';
export class InvalidWeaponComponent extends WeaponComponent {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    super(null, null, WeaponComponentHash.Invalid);
  }
  get Active() {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set Active(value) {}
  get DisplayName() {
    return 'WCT_INVALID';
  }
  get LocalizedName() {
    return Game.getGXTEntry(this.DisplayName);
  }
  static getAttachmentPoint(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hash,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentHash,
  ) {
    return ComponentAttachmentPoint.Invalid;
  }
}
