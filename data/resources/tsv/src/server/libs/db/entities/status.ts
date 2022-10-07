// Dependencies
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ObjectID as ObjectId } from 'mongodb';
// Declarations
import { PlayerStatusType } from '@declares/status';

@Entity()
class Status {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  value: unknown;

  constructor(status: PlayerStatusType) {
    this.id = new ObjectId();
    this.name = status.name;
    this.value = status.value;
  }
}

export { Status };
