import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { ActivityRoleType } from '../../../../core/declares/activity';

@Entity()
class Roles {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  payAmount?: number;

  constructor(role: ActivityRoleType) {
    this.id = new ObjectID();
    this.name = role.name;
    this.label = role.label;
    this.payAmount = role.payAmount;
  }
}

export { Roles };
