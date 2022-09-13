import { IUser } from '../../../core/declares/user';
import {
  ActivityMissionStateEnum,
  ActivityMissionType,
  IUserActivityMission,
} from '../../../core/declares/activity';
import { Ped, Player } from '../../../core/libs';
import { Vec3 } from '../../../core/libs/utils/Vector3';
import { ActivityMissionStateType } from '../../../core/declares/activity/types';

abstract class ActivityMission implements IUserActivityMission {
  name: string;
  state: ActivityMissionStateType;
  target: Ped | IUser;
  location: Vec3;
  time: Date;
  payload: unknown;
  config: any;

  constructor(mission: ActivityMissionType) {
    this.name = mission.name;
    this.target = mission.target;
    this.location = mission.location;
    this.time = mission.time;
    this.payload = mission.payload;
  }

  abstract tick(): void;

  get available(): boolean {
    return ![ActivityMissionStateEnum.PENDING, ActivityMissionStateEnum.ONGOING].includes(
      this.state,
    );
  }

  get targetPed(): Ped {
    if (this.target instanceof Ped) {
      return this.target;
    } else {
      return Player.fromServerId((this.target as IUser).serverId).Ped;
    }
  }
}

export { ActivityMission };
