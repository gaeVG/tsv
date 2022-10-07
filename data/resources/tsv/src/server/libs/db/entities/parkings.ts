// Dependencies
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
// Native wrapper
import { Vector4 } from '@native/utils';
// Parking entity
import { ParkingSpaces } from './parkingSpaces';

@Entity()
class Parkings {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  owner: ObjectID;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  position: Vector4;

  @Column(() => ParkingSpaces)
  spaces: ParkingSpaces[];
}

export { Parkings };
