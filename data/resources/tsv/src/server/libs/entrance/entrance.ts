import { Prop } from '../../../core/libs';
import {
  EntranceType,
  DoorType,
  IEntrance,
  EntranceStateStype,
  EntranceStateEnum,
} from '../../../core/declares/entrance';
import { IUser } from '../../../core/declares/user';
import { tsv } from '../..';

function freezeDoor(door: Prop, freeze: boolean, user?: IUser) {
  try {
    tsv.events.trigger({
      name: 'setEntityFreezePosition',
      module: 'entity',
      onNet: true,
      target: -1,
      data: [door, true],
      callback: (_, isFreeze: boolean) => {
        if (isFreeze === false) {
          throw new Error('Impossible de fermer la porte');
        }
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (user === undefined) {
        tsv.events.trigger({
          name: 'sendNotification',
          module: 'notification',
          onNet: true,
          target: user.source,
          data: [error.message],
        });
      }
    }
  }
}

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
  lock(user: IUser) {
    if (Array.isArray(this.target)) {
      (this.target as Prop[]).forEach((door, i) => {
        const entranceDoor = this.doors as DoorType[];
        const doorHeading = entranceDoor[i].coords.w;

        tsv.events.trigger({
          name: 'getEntityHeading',
          module: 'entity',
          onNet: true,
          target: user.source,
          data: [door],
          callback: (_, heading: number) => {
            if (heading !== doorHeading) {
              // La porte n'est pas fermée
            } else {
              freezeDoor(door, true, user);
            }
          },
        });
      });
    } else {
      const entranceDoor = this.doors as DoorType;

      tsv.events.trigger({
        name: 'getEntityHeading',
        module: 'entity',
        onNet: true,
        target: user.source,
        data: [this.target],
        callback: (_, heading: number) => {
          console.log('ici');
          if (heading !== entranceDoor.coords.w) {
            console.log(`La porte n'est pas fermée`);
          } else {
            console.log('fermer la porte');
            global.FreezeEntityPosition((this.target as Prop).Handle, true);
          }
        },
      });
    }
    this.state = EntranceStateEnum.CLOSE;
  }
  unlock() {
    Array.isArray(this.target)
      ? this.target.forEach(
          (door) => (
            global.FreezeEntityPosition(door.Handle, false), (this.state = EntranceStateEnum.OPEN)
          ),
        )
      : global.FreezeEntityPosition((this.target as Prop).Handle, false);
    this.state = EntranceStateEnum.OPEN;
  }
}

class Door extends Entrance {
  door: DoorType;

  constructor(entrance: EntranceType) {
    super(entrance);
    this.door = entrance.doors as DoorType;
  }
}
class DoubleDoor extends Entrance {
  doors: DoorType[];

  constructor(entrance: EntranceType) {
    super(entrance);
    this.doors = entrance.doors as DoorType[];
  }
}
class Gate extends Entrance {
  gate: DoorType;

  constructor(entrance: EntranceType) {
    super(entrance);
    this.gate = entrance.doors as DoorType;
  }

  lock(user: IUser) {
    freezeDoor(this.target as Prop, true, user);
  }

  unlock() {
    console.log('open');
  }
}

export { Entrance, Door, DoubleDoor, Gate };
