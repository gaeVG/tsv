import { AccountStateType } from '@declares/account';

type AccountType = {
  id?: unknown;
  from: 'mzb' | 'flc' | 'pcf';
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  state: AccountStateType;
};

export { AccountType };
