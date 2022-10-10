interface IAccount {
  id?: unknown;
  from: 'mzb' | 'flc' | 'pcf';
  amount: number;
  state: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IAccount };
