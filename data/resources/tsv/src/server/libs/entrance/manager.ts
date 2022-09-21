import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { Entrance, Door, DoubleDoor, Gate } from './entrance';
import {
  EntranceNotFoundError,
  DoorsMustBeTwoError,
  EntranceType,
  IEntrance,
} from '../../../core/declares/entrance';
import { tsv } from '../../../server';

const log: LogData = {
  namespace: 'CoreEntrance',
  container: EnumLogContainer.Manager,
};

class EntranceManager {
  manager: Entrance[];

  constructor() {
    this.manager = [];
  }

  get All() {
    return this.manager;
  }

  addOne(addEntrance: EntranceType): IEntrance | Error {
    try {
      let newEntrance: Entrance;

      if (addEntrance.doors instanceof Array) {
        if (addEntrance.doors.length === 2) {
          newEntrance = new DoubleDoor(addEntrance);
        } else {
          throw new DoorsMustBeTwoError(addEntrance);
        }
      } else if (addEntrance.isGate) {
        newEntrance = new Gate(addEntrance);
      } else {
        newEntrance = new Door(addEntrance);
      }

      this.manager.push(newEntrance);

      return newEntrance;
    } catch (error) {
      if (error instanceof Error) {
        tsv.log.error({
          ...log,
          message: error.message,
        });

        return error;
      }
    }
  }
  removeOne(door: IEntrance): void | Error {
    try {
      const manager = this.manager.filter((d) => d.id !== door.id);

      if (manager.length === this.manager.length) {
        throw new Error('The door was not found');
      }

      this.manager = manager;
    } catch (error) {
      if (error instanceof Error) {
        tsv.log.error({
          ...log,
          message: error.message,
        });
      }

      return error;
    }
  }
  getOne(id: string): IEntrance | Error {
    try {
      const entranceManager = this.manager.find((d) => d.id === id);

      if (!entranceManager) {
        return new EntranceNotFoundError(id);
      }
    } catch (error) {
      if (error instanceof Error) {
        tsv.log.error({ ...log, message: error.message });
        return error;
      }
    }
  }
  updateOne(door: IEntrance) {
    const index = this.manager.findIndex((d) => d.id === door.id);
    if (index === -1) return;
    this.manager[index] = door;
  }
}

export { EntranceManager };
