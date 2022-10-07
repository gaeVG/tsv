// Dependencies
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
// Declarations
import { UserIdentifier, UserGroup } from '@declares/user';
// User character entity
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
