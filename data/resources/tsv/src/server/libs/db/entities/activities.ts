import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { ActivityType, ActivityProductionType } from '../../../../core/declares/activity';
import { Roles } from './roles';

@Entity()
class Activities {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  isMain: boolean;

  @Column(() => Roles)
  roles: Roles[];

  @Column()
  production: ActivityProductionType;

  constructor(activity: ActivityType) {
    this.id = new ObjectID();
    this.name = activity.name;
    this.label = activity.label;
    this.isMain = activity.isMain;
    this.roles = activity.roles.reduce((roles, role) => {
      return [
        ...roles,
        new Roles({
          name: role.name,
          label: role.label,
          payAmount: role.payAmount,
        }),
      ];
    }, []);
    this.production = activity.production;
  }
}

export { Activities };
