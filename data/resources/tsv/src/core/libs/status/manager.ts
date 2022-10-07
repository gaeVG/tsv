// Declarations
import { IStatus, PlayerStatusType, StatusEnum } from '@declares/status';
import { LogData, EnumLogContainer } from '@declares/log';
// Status abstract class
import { Status } from './status';
// Status classes
import { Feed, Thrist, Health } from './needs';
// Core libs
import { Log } from '@libs/log';
import _t from '@config/i18n';

// Log variables
const log: LogData = {
  namespace: 'CoreStatus',
  container: EnumLogContainer.Manager,
};

class StatusManager {
  private manager: Status[];

  private newStatus(): void {
    log.location = 'newStatus()';
    Log.debug({
      ...log,
      message: 'Création du nouveau statut',
    });

    this.addOne(new Feed());
    this.addOne(new Thrist());
  }

  constructor(status: PlayerStatusType[]) {
    log.location = _t('global.location.constructor');

    this.manager = [];
    status.length > 0
      ? status.map((status) => {
          this.addOne(status) === null &&
            Log.error({
              ...log,
              message: `StatusManager: status ${status.name} not found`,
            });
        })
      : this.newStatus();
  }

  get All(): Status[] {
    return this.manager;
  }

  set All(manager: Status[]) {
    manager.map((status) => this.addOne(status));
  }

  get length(): number {
    return this.manager.length;
  }

  addOne(addStatus: PlayerStatusType): IStatus | null {
    let status: Status;
    Log.safemode({
      ...log,
      message: `Add status ${addStatus.name}`,
    });

    try {
      if (this.manager.find((statusManager) => addStatus.name === statusManager.name)) {
        throw new Error(`StatusManager: status ${addStatus.name} already exists`);
      }

      switch (addStatus.name) {
        case StatusEnum.HUNGER:
          status = new Feed(addStatus.value as number);
          break;
        case StatusEnum.THRIST:
          status = new Thrist(addStatus.value as number);
          break;
        case StatusEnum.HEALTH:
          status = new Health(addStatus.value as number);
          break;
        default:
          throw new Error(`Status ${addStatus.name} not found`);
      }

      this.manager.push(status);
      return status;
    } catch (error) {
      return null;
    }
  }
  getOne(statusName: string): Status | undefined {
    return this.manager.find((managerStatus) => statusName === managerStatus.name);
  }
  getAll(): IStatus[] {
    return this.manager;
  }
  updateOne(status: IStatus): boolean {
    log.location = 'updateOne()';
    let statusFound = false;
    try {
      this.manager = this.manager.map((currentStatus) => {
        if (status.identifier === currentStatus.identifier) {
          statusFound = true;
          currentStatus.value = status.value;
        }
        return currentStatus;
      });
    } catch (error) {
      Log.error({
        ...log,
        message: error instanceof Error ? error.message : (error as string),
        isLast: true,
      });
      return false;
    }

    if (!statusFound) {
      Log.error({
        ...log,
        message: `StatusManager: status ${status.name} not found`,
        isLast: true,
      });
    }

    return statusFound;
  }
  removeOne(userStatus: IStatus): boolean {
    let statusFound = false;

    try {
      const manager = this.manager.reduce((statusManager, userStatusManager) => {
        if (userStatus.name === userStatusManager.name) {
          statusFound = true;
          statusManager.push(userStatusManager);
        }

        return statusManager;
      }, [] as Status[]);

      if (!statusFound) {
        throw new Error(`StatusManager: status ${userStatus.name} not found`);
      }

      this.manager = manager;

      return true;
    } catch (error) {
      return false;
    }
  }
}

export { StatusManager };
