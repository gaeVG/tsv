import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { Vector4 } from '../../../../core/libs';
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
