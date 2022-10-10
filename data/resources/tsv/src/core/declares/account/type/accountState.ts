import { AccountStateEnum } from '@declares/account';

type AccountStateType =
  | AccountStateEnum.INACTIVE
  | AccountStateEnum.ACTIVE
  | AccountStateEnum.BANNED;

export { AccountStateType };
