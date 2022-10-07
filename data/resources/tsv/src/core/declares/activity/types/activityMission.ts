// Native wrapper
import { Ped } from '@native/models/Ped';
import { Vec3 } from '@native/utils/Vector3';
// Declarations
import { IUser } from '@declares/user';

type ActivityMissionType = {
  name: string;
  target: Ped | IUser;
  location: Vec3;
  time: Date;
  payload?: unknown;
};

export { ActivityMissionType };
