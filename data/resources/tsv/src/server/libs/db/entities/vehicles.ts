import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { Vector4 } from '../../../../core/libs';
import { Invoices } from './invoices';

@Entity()
class Vehicles {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  owner: ObjectID;

  @Column()
  props: string; // TODO : Passer une interface correspondant aux props du véhicule

  @Column(() => Invoices)
  invoice?: Invoices;

  @Column()
  position: Vector4;
}

export { Vehicles };
