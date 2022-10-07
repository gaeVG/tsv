// Native wrapper
import { Prop, Crypto } from '@native//';
// Declarations
import {
  EntranceType,
  DoorType,
  IEntrance,
  EntranceStateStype,
  EntranceStateEnum,
} from '@declares/entrance';
import { EntranceToogleStateError } from '@declares/entrance/errors/entranceToggleState';
import { EntranceHeadingError } from '@declares/entrance/errors/entranceHeading';
import { IUser } from '@declares/user';
import { EnumLogContainer, LogData } from '@declares/log';
// Server libs
import { freezeTarget, getTargetHeading } from './function';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: 'entrance',
  container: EnumLogContainer.Class,
};

abstract class Entrance implements IEntrance {
  id: string;
  doors: DoorType | DoorType[];
  target: Prop | Prop[];
  distanceMax?: number;
  isRemote?: boolean;
  state: EntranceStateStype;

  constructor(entrance: EntranceType) {
    this.id = Crypto.uuidv4();
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
  /**
   * Unlocks the entrance
   * @param {IUser} user The user who triggers the entrance opening
   * @returns A promise of the updated entrance state
   */
  async unlock(user: IUser): Promise<EntranceStateStype> {
    try {
      if (Array.isArray(this.target)) {
        this.target.forEach(async (door) => {
          if (!(await freezeTarget(door, true, user))) {
            throw new EntranceToogleStateError(this);
          }
        });
      } else {
        if (!(await freezeTarget(this.target, true, user))) {
          throw new EntranceToogleStateError(this);
        }
      }

      this.state = EntranceStateEnum.OPEN;
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

    return this.state;
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
    log.location = 'lock(Gate)';
    try {
      if (!(await freezeTarget(this.target as Prop, true, user))) {
        throw new EntranceToogleStateError(this);
      }
      return (this.state = EntranceStateEnum.CLOSE);
    } catch (error) {
      if (error instanceof Error) {
        tsv.log.error({ ...log, message: error.message });
      }

      return (this.state = EntranceStateEnum.OPEN);
    }
  }

  async unlock(user: IUser): Promise<EntranceStateStype> {
    try {
      if (!(await freezeTarget(this.target as Prop, false, user))) {
        throw new EntranceToogleStateError(this);
      }

      return (this.state = EntranceStateEnum.OPEN);
    } catch (error) {
      tsv.log.error({ ...log, message: error.message });

      return (this.state = EntranceStateEnum.CLOSE);
    }
  }
}

export { Entrance, Door, DoubleDoor, Gate };
