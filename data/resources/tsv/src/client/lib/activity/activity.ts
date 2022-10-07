// Declarations
import {
  ActivityProductionType,
  IUserActivity,
  IUserActivityMission,
  UserActivityType,
} from '@declares/activity';
// Core utils
import { uuid } from '@utils';

abstract class Activity implements IUserActivity {
  id: string;
  job: string;
  society: string;
  role: string;
  production: ActivityProductionType;
  onDuty: boolean;
  currentMission: IUserActivityMission;

  constructor(activity: UserActivityType) {
    this.id = uuid();
    this.job = activity.job;
    this.society = activity.for;
    this.role = activity.role;
  }

  abstract init(): void;
}

export { Activity };
