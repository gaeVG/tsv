import { IUser } from '../../user';
import { Ped } from '../../../libs';
import { Vec3 } from '../../../libs/utils/Vector3';

type ActivityMissionType = {
  name: string;
  target: Ped | IUser;
  location: Vec3;
  time: Date;
  payload?: unknown;
};

export { ActivityMissionType };
