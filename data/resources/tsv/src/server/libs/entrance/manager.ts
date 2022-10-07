// Declarations
import { EnumLogContainer, LogData } from '@declares/log';
import {
  EntranceNotFoundError,
  DoorsMustBeTwoError,
  EntranceType,
  IEntrance,
} from '@declares/entrance';
// Entrance classes
import { Entrance, Door, DoubleDoor, Gate } from './entrance';
// Core
import { tsv } from '@tsv';

// Log variable
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
  updateOne(entrance: IEntrance): IEntrance | Error {
    try {
      let entranceFound: Entrance;

      this.manager = this.manager.reduce((entrances, currentEntrance) => {
        if (currentEntrance.id === entrance.id) {
          Object.entries(entrance).forEach(([entranceKey, entranceVal]) => {
            currentEntrance[entranceKey] = entranceVal;
          });
          entranceFound = currentEntrance;
        }

        return [...entrances, currentEntrance];
      }, []);

      if (!entranceFound) {
        throw new EntranceNotFoundError(entrance.id);
      }

      return entranceFound;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
      tsv.log.error({ ...log, message: error.message });
    }
  }
}

export { EntranceManager };
