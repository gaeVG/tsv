import { Crypto, World, Model, Prop } from '..';
import { EntranceType, DoorType, IEntrance, EntranceStateStype, EntranceStateEnum } from '../../declares/entrance';

abstract class Entrance implements IEntrance {
  id: string;
  target: Prop | Prop[];
  distanceMax?: number;
  isRemote?: boolean;
  state: EntranceStateStype;

  constructor(entrance: EntranceType) {
    this.id = Crypto.uuidv4();
    this.distanceMax= entrance.distanceMax || 2.0;
    this.isRemote = entrance.isRemote || false;
    
    if (entrance.state || EntranceStateEnum.CLOSE) {
      this.state = entrance.state;
      this.lock();
    }
  }

  abstract lock(): void;
  abstract unlock(): void;
}

class Door extends Entrance {
  target: Prop;

  constructor(entrance: EntranceType) {
    super(entrance);

    const door = entrance.doors as DoorType;
    this.target = World.getClosestObject(new Model(door.hash), door.coords);
  }

  lock() {
    console.log('close')
  }

  unlock() {
    console.log('open')
  }
}
class DoubleDoor extends Entrance {
  target: Prop[];

  constructor(entrance: EntranceType) {
    super(entrance);

    const doors = entrance.doors as DoorType[];
    this.target = doors.map((door) => World.getClosestObject(new Model(door.hash), door.coords));
  }

  lock() {
    console.log('close')
  }

  unlock() {
    console.log('open')
  }
}
class Gate extends Entrance {
  target: Prop;

  constructor(entrance: EntranceType) {
    super(entrance);

    const gate = entrance.doors as DoorType;
    this.target = World.getClosestObject(new Model(gate.hash), gate.coords);
  }

  lock() {
    console.log('close')
  }

  unlock() {
    console.log('open')
  }
}

export { Entrance, Door, DoubleDoor, Gate };
