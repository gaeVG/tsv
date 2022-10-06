import { EntityBoneCollection, Ped, PedBone } from '.';

export class PedBoneCollection extends EntityBoneCollection {
  constructor(owner: Ped) {
    super(owner);
  }

  public get Core(): PedBone {
    return new PedBone(this.owner as Ped, -1);
  }

  public get LastDamaged(): PedBone {
    const [, outBone] = global.GetPedLastDamageBone(this.owner.Handle, 0);
    return (PedBone as never)[outBone];
  }

  public clearLastDamaged(): void {
    global.ClearPedLastDamageBone(this.owner.Handle);
  }

  public getBone(boneIndex?: number, boneName?: string): PedBone {
    return new PedBone(
      this.owner as Ped,
      boneIndex ? boneIndex : global.GetEntityBoneIndexByName(this.owner.Handle, boneName ?? ''),
    );
  }
}
