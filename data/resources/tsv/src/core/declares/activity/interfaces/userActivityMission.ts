import { IUser } from '../../user';
import { Ped } from '../../../libs';
import { Vec3 } from '../../../libs/utils/Vector3';
import { ActivityMissionStateType } from '../types';

interface IUserActivityMission {
  config: any;
  name: string;
  state: ActivityMissionStateType;
  target: Ped | IUser;
  targetPed: Ped;
  location: Vec3;
  time: Date;
  payload: unknown;
  available: boolean;

  tick(): void;
}

export { IUserActivityMission };
