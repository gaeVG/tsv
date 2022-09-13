import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
class Accounts {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  owner: ObjectID;

  @Column()
  from: ObjectID;

  @Column()
  amount: number;
}

export { Accounts };
