import { EnumLogContainer, LogData } from '../../declares/log';
import { SocietyType, ISociety, AddOneSocietyError } from '../../declares/society';
import { Log } from '../log';
import config from '../../../config';
import { Compagny, Society } from '.';

const _t = config.locale;

const log: LogData = {
  namespace: 'CoreCompagnies',
  container: EnumLogContainer.Manager,
};

class SocietiesManager {
  private manager: Society[];

  constructor() {
    log.location = 'constructor()';
    Log.safemode({
      ...log,
      message: _t('core.user.manager.constructor.creating'),
    });
    this.manager = [];
    Log.safemode({
      ...log,
      message: _t('core.user.manager.constructor.complete'),
    });
  }

  get All(): Compagny[] {
    return this.manager;
  }
  addOne(addSociety: SocietyType): ISociety | Error {
    if (
      (addSociety.id ? this.getOnebyId(addSociety.id) : this.getOneByName(addSociety.name)) !==
      undefined
    ) {
      return new AddOneSocietyError(addSociety);
    }
    const society = addSociety.isCompagny ? new Compagny(addSociety) : new Society(addSociety);
    this.manager.push(society);

    return society;
  }
  getOnebyId(id: string): Society | Error {
    try {
      const society = this.manager.find((societyManager) => id === societyManager.id);
      if (society === undefined) {
        throw new Error('Society not found');
      }

      return society;
    } catch (error) {
      return error;
    }
  }
  getOneByName(societyName: string): Society | undefined {
    return this.manager.find((society) => societyName === society.name);
  }
  removeOne(removeSociety: ISociety): [ISociety, number] | Error {
    const manager = this.manager.filter((user) => user.id !== removeSociety.id);

    if (manager.length === this.manager.length) {
      new Error(_t('core.user.manager.removeOne.userNotFound', { userId: removeSociety.id }));
    }

    this.manager = manager;
    return [removeSociety, manager.length];
  }
  updateOne(updateSociety: ISociety): [ISociety, number] | Error {
    try {
      const societyManager = this.getOnebyId(updateSociety.id);
      if (societyManager instanceof Error) {
        throw societyManager;
      }

      Object.entries(updateSociety).forEach(
        ([activityKey, activityVal]) => (societyManager[activityKey] = activityVal),
      );

      this.manager = this.manager.reduce((manager, activity) => {
        if (updateSociety.id === activity.id) {
          manager.push(societyManager);
        } else {
          manager.push(activity);
        }
        return manager;
      }, []);

      return [societyManager, this.manager.length];
    } catch (error) {
      return error;
    }
  }
}

export { SocietiesManager };
