import { Prop } from '../../../core/libs';
import {
  EntranceType,
  DoorType,
  IEntrance,
  EntranceStateStype,
  EntranceStateEnum,
} from '../../../core/declares/entrance';
import { IUser } from '../../../core/declares/user';
import { freezeTarget, getTargetHeading } from './function';
import { tsv } from '../..';
import { EntranceToogleStateError } from '../../../core/declares/entrance/errors/entranceToggleState';
import { EntranceHeadingError } from '../../../core/declares/entrance/errors/entranceHeading';

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

  /**
   * Locks the entrance
   * @param {IUser} user The user who triggers the entrance closure
   * @returns A promise of the updated entrance state
   */
  async lock(user: IUser): Promise<EntranceStateStype> {
    try {
      if (Array.isArray(this.target)) {
        this.target.forEach(async (prop, i) => {
          const targetHeading = await getTargetHeading(prop, user);
          if (targetHeading !== this.doors[i].coords.w) {
            throw new EntranceHeadingError();
          }

          if (!(await freezeTarget(prop, this.state === EntranceStateEnum.CLOSE, user))) {
            throw new EntranceToogleStateError(this);
          }
        });

        return (this.state = EntranceStateEnum.CLOSE);
      } else {
        const targetHeading = await getTargetHeading(this.target, user);
        if (targetHeading !== (this.doors as DoorType).coords.w) {
          throw new EntranceHeadingError();
        }

        if (!(await freezeTarget(this.target, this.state === EntranceStateEnum.CLOSE, user))) {
          throw new EntranceToogleStateError(this);
        }

        return (this.state = EntranceStateEnum.CLOSE);
      }
    } catch (error) {
      if (error instanceof Error) {
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

  /**
   * Lock the gate
   * @param user The user who triggers the entrance closure
   * @returns A promise of the updated entrance state
   */
  async lock(user: IUser): Promise<EntranceStateStype> {
    try {
      if (
        !(await freezeTarget(this.target as Prop, this.state !== EntranceStateEnum.CLOSE, user))
      ) {
        throw new EntranceToogleStateError(this);
      }

      return (this.state = EntranceStateEnum.CLOSE);
    } catch (error) {
      if (error instanceof Error) {
        tsv.log.error({
          namespace: 'entrance',
          container: 'Gate',
          message: error.message,
        });
      }
    }
  }

  unlock() {
    console.log('open');
  }
}

export { Entrance, Door, DoubleDoor, Gate };
