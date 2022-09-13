/* eslint-disable no-undef */
import { EntityBone } from './';
export class EntityBoneCollection {
  constructor(owner) {
    this._currentIndex = -1;
    this.owner = owner;
  }
  hasBone(name) {
    return GetEntityBoneIndexByName(this.owner.Handle, name) !== -1;
  }
  getBone(boneIndex, boneName) {
    return new EntityBone(
      this.owner,
      boneIndex ? boneIndex : GetEntityBoneIndexByName(this.owner.Handle, boneName ?? ''),
    );
  }
  get Core() {
    return new EntityBone(this.owner, -1);
  }
}
