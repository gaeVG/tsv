// Dependencies
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { ObjectID as ObjectIDConstructor } from 'mongodb';
// Declarations
import { AccountType } from '@declares/account';
enum AccountStateEnum {
  INACTIVE = 0,
  ACTIVE = 1,
  BANNED = 2,
}

type AccountStateType =
  | AccountStateEnum.INACTIVE
  | AccountStateEnum.ACTIVE
  | AccountStateEnum.BANNED;

@Entity()
class Accounts {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  from: 'mzb' | 'flc' | 'pcf';

  @Column()
  amount: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  state: AccountStateType;

  constructor(account?: AccountType) {
    if (account) {
      this._id = new ObjectIDConstructor();
      this.from = account.from;
      this.amount = account.amount;
      this.createdAt = account.createdAt || new Date();
      this.updatedAt = account.updatedAt || new Date();
      this.state = account.state;
    }
  }
}

export { Accounts };
