// Dependencies
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
// Native wrapper
import { Vector4 } from '@native/utils';
// Vehicle entity
import { Vehicles } from './vehicles';

@Entity()
class ParkingSpaces {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  coords: Vector4;

  @Column(() => Vehicles)
  vehicle: Vehicles;

  @Column()
  time: Date;
}

export { ParkingSpaces };
