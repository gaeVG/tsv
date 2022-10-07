// Dependencies
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

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
  id: ObjectID;

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
}

export { Accounts };
