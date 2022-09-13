import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { ZoneType } from '../../../../core/declares/zone';

@Entity()
class Compagnies {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  society: ObjectID;

  @Column()
  manager: ObjectID;

  @Column()
  building: ZoneType;

  @Column()
  inventory: ObjectID[];
}

export { Compagnies };
