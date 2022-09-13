import { ActivityProductionType, IUserActivityMission } from '../';

interface IUserActivity {
  id: string;
  job: string;
  society: string;
  role: string;
  production: ActivityProductionType;
  onDuty: boolean;
  currentMission: IUserActivityMission;

  init(): void;
}

export { IUserActivity };
