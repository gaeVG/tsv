import { Crypto } from '../../../core/libs';
import {
  ActivityProductionType,
  IUserActivity,
  IUserActivityMission,
  UserActivityType,
} from '../../../core/declares/activity';

abstract class Activity implements IUserActivity {
  id: string;
  job: string;
  society: string;
  role: string;
  production: ActivityProductionType;
  onDuty: boolean;
  currentMission: IUserActivityMission;

  constructor(activity: UserActivityType) {
    this.id = Crypto.uuidv4();
    this.job = activity.job;
    this.society = activity.for;
    this.role = activity.role;
  }

  abstract init(): void;
}

export { Activity };
