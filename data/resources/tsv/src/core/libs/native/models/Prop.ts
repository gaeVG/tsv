import { Entity } from '.';

export class Prop extends Entity {
  public static exists(prop: Prop): boolean {
    return typeof prop !== 'undefined' && prop.exists();
  }

  constructor(handle: number) {
    super(handle);
  }

  public exists(): boolean {
    return super.exists() && global.GetEntityType(this.handle) === 3;
  }

  public placeOnGround(): void {
    global.PlaceObjectOnGroundProperly(this.handle);
  }
}
