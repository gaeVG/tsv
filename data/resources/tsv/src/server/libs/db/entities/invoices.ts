// Dependencies
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
class Invoices {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  biller: ObjectID;

  @ObjectIdColumn()
  recipient: ObjectID;

  @Column()
  meta: any;
}

export { Invoices };
