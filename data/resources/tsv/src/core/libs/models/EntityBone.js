/* eslint-disable no-undef */
import { Vector3 } from '../utils';
export class EntityBone {
  constructor(owner, boneIndex, boneName) {
    this.owner = owner;
    this.index = boneIndex
      ? boneIndex
      : GetEntityBoneIndexByName(this.owner.Handle, boneName ?? '');
  }
  get Index() {
    return this.index;
  }
  get Owner() {
    return this.owner;
  }
  get Position() {
    return Vector3.fromArray(GetWorldPositionOfEntityBone(this.owner.Handle, this.index));
  }
  get IsValid() {
    return this.owner.exists() && this.index !== -1;
  }
}
