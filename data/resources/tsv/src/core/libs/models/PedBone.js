import { EntityBone, Ped } from './';
export class PedBone extends EntityBone {
  constructor(owner, boneId) {
    // eslint-disable-next-line no-undef
    super(owner, GetPedBoneIndex(owner.Handle, Number(boneId)));
  }
  get IsValid() {
    return Ped.exists(this.Owner) && this.Index !== -1;
  }
}
