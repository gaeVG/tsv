// Native wrapper
import { Crypto } from '@native/utils';
// Declarations
import { AccountType, IAccount } from '@declares/account';

class Account implements IAccount {
  id: unknown;
  from: "mzb" | "flc" | "pcf";
  amount: number;
  state: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(account: AccountType) {
    this.id = Crypto.uuidv4();
    this.from = account.from;
    this.amount = account.amount;
    this.state = account.state;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
export { Account };
