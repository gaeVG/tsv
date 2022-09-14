import { EnumLogContainer, LogData } from '../../../core/declares/log';
import {
  UserActivityDuplicateError,
  UserActivityType,
  ActivityEnum,
  UnknownActivityError,
  IUserActivity,
} from '../../../core/declares/activity';
import { Activity } from './activity';
import { Security, Driver } from '.';
import { tsv } from '../..';

const log: LogData = {
  namespace: 'Actvitiy',
  container: EnumLogContainer.Manager,
};

class ActivityManager {
  manager: Activity[];

  constructor() {
    this.manager = [];
  }

  private addOne(addActivity: UserActivityType): IUserActivity | Error {
    try {
      let newActivity: IUserActivity;
      if (this.manager.find((userActivity) => userActivity.id === addActivity.job)) {
        throw new UserActivityDuplicateError(addActivity);
      }

      // We'll check among the available activities if the player's activity matches
      switch (addActivity.job) {
        case ActivityEnum.SECURITY:
          newActivity = new Security(addActivity);
          break;
        case ActivityEnum.DRIVER:
          newActivity = new Driver(addActivity);
          break;
        default:
          throw new UnknownActivityError(addActivity);
      }

      // Add activity in the list
      this.manager.push(newActivity);

      return newActivity;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }

      tsv.log.error({
        ...log,
        message: error instanceof Error ? error.message : error,
      });
    }
  }
  getOneById(id: string): Activity {
    return this.manager.find((userActivity) => userActivity.id === id);
  }
  getOneByJobName(jobName: string): Activity {
    return this.manager.find((userActivity) => userActivity.job === jobName);
  }

  addActivity(addActivity: UserActivityType | UserActivityType[]) {
    try {
      if (addActivity instanceof Array) {
        addActivity.forEach((activity) => this.addActivity(activity));
      } else {
        if (
          !Object.values(ActivityEnum).find(
            (activity) => activity === (addActivity as UserActivityType).job,
          )
        ) {
          throw new UnknownActivityError(addActivity as UserActivityType);
        }

        const newActivity = this.addOne(addActivity as UserActivityType);
        if (newActivity instanceof Error) {
          throw newActivity;
        }

        newActivity.init();
      }
    } catch (error) {
      if (error instanceof Error) {
        tsv.log.error({
          ...log,
          message: tsv.locale('module.global.setActivity.error', { errorMessage: error.message }),
        });
      }
    }
  }
}

export { ActivityManager };
