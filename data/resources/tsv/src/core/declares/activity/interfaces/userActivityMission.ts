// Native wrapper
import { Ped } from '@native/models/ped';
import { Vec3 } from '@native/utils/vector3';
// Declarations
import { IUser } from '@declares/user';
// Activity declarations
import { ActivityMissionStateType } from '..';

interface IUserActivityMission {
  config: any;
  name: string;
  target: Ped | IUser;
  targetPed: Ped;
  location: Vec3;
  time: Date;
  payload: unknown;
  state: ActivityMissionStateType;
  available: boolean;

  tick(): void;
}

export { IUserActivityMission };
