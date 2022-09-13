/* eslint-disable no-undef */
import { EntityBoneCollection, PedBone } from './';
export class PedBoneCollection extends EntityBoneCollection {
  constructor(owner) {
    super(owner);
  }
  get Core() {
    return new PedBone(this.owner, -1);
  }
  get LastDamaged() {
    const [, outBone] = GetPedLastDamageBone(this.owner.Handle, 0);
    return PedBone[outBone];
  }
  clearLastDamaged() {
    ClearPedLastDamageBone(this.owner.Handle);
  }
  getBone(boneIndex, boneName) {
    return new PedBone(
      this.owner,
      boneIndex ? boneIndex : GetEntityBoneIndexByName(this.owner.Handle, boneName ?? ''),
    );
  }
}
