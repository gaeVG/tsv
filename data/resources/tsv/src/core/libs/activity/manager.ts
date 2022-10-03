import { Activity } from './activity';
import { EnumLogContainer, LogData } from '../../declares/log';
import { SocietiesManager } from '../society';
import { Log } from '../log';
import config from '../../../config';
import { IActivity, ActivityType } from '../../declares/activity';

const _t = config.locale;

const log: LogData = {
  namespace: 'CoreUser',
  container: EnumLogContainer.Manager,
};

class ActivitiesManager {
  private manager: Activity[];

  constructor(activities: ActivityType[]) {
    log.location = 'constructor()';
    Log.safemode({
      ...log,
      message: _t('core.user.manager.constructor.creating'),
    });
    this.manager = [];

    try {
      activities.map((activities) => this.addOne(activities));
    } catch (error) {
      Log.debug({
        ...log,
        message: _t('core.user.manager.constructor.error', { error: error.message }),
      });
    }
    Log.safemode({
      ...log,
      message: _t('core.user.manager.constructor.complete'),
    });
  }

  get All(): Activity[] {
    return this.manager;
  }

  addOne(addActivity: ActivityType): Activity | Error {
    try {
      if (addActivity.id && this.getOnebyId(addActivity.id) !== undefined) {
        throw new Error(`Activity ID ${addActivity.id} already exists`);
      } else {
        if (this.getOneByName(addActivity.name) !== undefined) {
          throw new Error(`Activity ${addActivity.name} already exists`);
        }
      }

      const activity = new Activity(addActivity);
      this.manager.push(activity);
      return activity;
    } catch (error) {
      return error;
    }
  }
  getOnebyId(id: string): Activity | undefined {
    return this.manager.find((user) => user.id === id);
  }
  getOneByName(name: string): Activity | undefined {
    return this.manager.find((activity) => activity.name === name);
  }
  removeOne(removeActivity: IActivity): [IActivity, number] | Error {
    const manager = this.manager.filter((user) => user.id !== removeActivity.id);

    if (manager.length === this.manager.length) {
      new Error(_t('core.user.manager.removeOne.userNotFound', { userId: removeActivity.id }));
    }

    this.manager = manager;
    return [removeActivity, manager.length];
  }
  updateOne(updateActivity: IActivity): [IActivity, number] | Error {
    try {
      const activityManager = this.getOnebyId(updateActivity.id);
      if (activityManager === undefined) {
        throw Error(_t('core.user.manager.updateOne.userNotFound', { userId: updateActivity.id }));
      }

      Object.entries(updateActivity).forEach(
        ([activityKey, activityVal]) => (activityManager[activityKey] = activityVal),
      );

      this.manager = this.manager.reduce((manager: Activity[], activity: Activity) => {
        if (activityManager.id === activity.id) {
          manager.push(activityManager);
        } else {
          manager.push(activity);
        }
        return manager;
      }, []);
      return [activityManager, this.manager.length];
    } catch (error) {
      return error;
    }
  }
}

export { ActivitiesManager };
