import { Vector3 } from './utils';

export class Pickup {
  private handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  public get Position(): Vector3 {
    return Vector3.fromArray(global.GetPickupCoords(this.handle));
  }

  public get IsCollected(): boolean {
    return global.HasPickupBeenCollected(this.handle);
  }

  public delete(): void {
    global.RemovePickup(this.handle);
  }

  public exists(): boolean {
    return global.DoesPickupExist(this.handle);
  }
}
