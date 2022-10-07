// Native wrapper
import { Ped, Player } from '@native/models';
import { Vec3 } from '@native/utils/Vector3';
// Declarations
import { IUser } from '@declares/user';
import {
  ActivityMissionStateEnum,
  ActivityMissionType,
  IUserActivityMission,
  ActivityMissionStateType,
} from '@declares/activity';
/**
 * Abstract class to describe all activities missions
 * @implements {IUserActivityMission}
 */
abstract class ActivityMission implements IUserActivityMission {
  name: string;
  private _state: ActivityMissionStateType;
  target: Ped | IUser;
  location: Vec3;
  time: Date;
  payload: unknown;
  config: any;

  /**
   * Create a new activity mission
   * @param {ActivityMissionType} mission The mission to create
   */
  constructor(mission: ActivityMissionType) {
    this.name = mission.name;
    this.target = mission.target;
    this.location = mission.location;
    this.time = mission.time;
    this.payload = mission.payload;
  }

  /**
   * Tick to run mission
   */
  abstract tick(): void;

  /**
   * Get the mission state if player is avaiblable
   * @returns {boolean} The mission state
   */
  get available(): boolean {
    return ![ActivityMissionStateEnum.PENDING, ActivityMissionStateEnum.ONGOING].includes(
      this.state,
    );
  }
  /**
   * Get the mission state
   * @returns {ActivityMissionStateType} The mission state
   */
  get state(): ActivityMissionStateType {
    return this._state;
  }
  /**
   * Set the mission state
   * @param {ActivityMissionStateType} state The mission state
   */
  set state(state: ActivityMissionStateType) {
    this._state = state;
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
