import { Crypto, World, Model, Prop, Vector3, Entity } from '../../../core/libs';
import {
  EntranceType,
  DoorType,
  IEntrance,
  EntranceStateStype,
  EntranceStateEnum,
} from '../../../core/declares/entrance';
import { IUser } from '../../../core/declares/user';
import { tsv } from '../..';

abstract class Entrance implements IEntrance {
  id: string;
  doors: DoorType | DoorType[];
  target: Prop | Prop[];
  distanceMax?: number;
  isRemote?: boolean;
  state: EntranceStateStype;

  constructor(entrance: EntranceType) {
    this.doors = entrance.doors;
    this.distanceMax = entrance.distanceMax || 2.0;
    this.isRemote = entrance.isRemote || false;
    this.state = entrance.state || EntranceStateEnum.CLOSE;
  }

  getTargetPropsFromClient(user: IUser) {
    tsv.events.trigger({
      name: 'getEntranceDoors',
      module: 'entrance',
      onNet: true,
      target: user.source,
      data: [this.doors],
      callback: (_, props: { handle: number } | { handle: number }[]) => {
        if (Array.isArray(props)) {
          this.target = props.map((prop) => new Prop(prop.handle));
        } else {
          this.target = new Prop(props.handle);
        }
      },
    });
  }

  lock() {
    Array.isArray(this.target)
      ? this.target.forEach((door) => (door.IsPositionFrozen = true))
      : (this.target.IsPositionFrozen = true);
    this.state !== EntranceStateEnum.CLOSE && EntranceStateEnum.CLOSE;
  }
  unlock() {
    Array.isArray(this.target)
      ? this.target.forEach((door) => (door.IsPositionFrozen = false))
      : (this.target.IsPositionFrozen = false);
    this.state !== EntranceStateEnum.OPEN && EntranceStateEnum.OPEN;
  }
}

class Door extends Entrance {
  door: DoorType;

  constructor(entrance: EntranceType) {
    super(entrance);
    this.door = entrance.doors as DoorType;
  }

  lock() {
    super.lock();
  }

  unlock() {
    super.unlock();
  }
}
class DoubleDoor extends Entrance {
  doors: DoorType[];

  constructor(entrance: EntranceType) {
    super(entrance);
    this.doors = entrance.doors as DoorType[];
  }

  lock() {
    super.lock();
  }

  unlock() {
    super.unlock();
  }
}
class Gate extends Entrance {
  gate: DoorType;

  constructor(entrance: EntranceType) {
    super(entrance);
    this.gate = entrance.doors as DoorType;
  }

  lock() {
    const target = this.target as Prop;
    target.IsPositionFrozen = true;
    console.log('freeze ?');
    console.log(target.IsPositionFrozen);
  }

  unlock() {
    console.log('open');
  }
}

export { Entrance, Door, DoubleDoor, Gate };
