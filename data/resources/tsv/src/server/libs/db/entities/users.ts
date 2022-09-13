import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { UserIdentifier, UserGroup } from '../../../../core/declares/user';
import { UserCharacters } from './characters';

@Entity()
class Users {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  auth: UserIdentifier;

  @Column()
  group: UserGroup;

  @Column(() => UserCharacters)
  characters: UserCharacters[];
}

export { Users };
