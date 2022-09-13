import { ActivityMissionStateEnum } from '..';

type ActivityMissionStateType =
  | ActivityMissionStateEnum.PENDING
  | ActivityMissionStateEnum.ONGOING
  | ActivityMissionStateEnum.CANCELED;

export { ActivityMissionStateType };
