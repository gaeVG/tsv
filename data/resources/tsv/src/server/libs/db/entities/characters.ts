// Native wrapper
import { Vec4 } from '@native/utils/Vector4';
// Dependencies
import { Column, Entity } from 'typeorm';
// Entities
import { Accounts } from './accounts';
// Declarations
import { CharacterDescription, SkinCharacter, UserCharacter } from '@declares/user';

@Entity()
class UserCharacters {
  @Column()
  description: CharacterDescription;

  @Column()
  skin?: SkinCharacter;

  @Column()
  position: Vec4;

  @Column()
  isDead: boolean;

  @Column()
  status: UserCharacter['status'];

  @Column()
  inventories?: UserCharacter['inventories'];

  @Column()
  licenses?: UserCharacter['licenses'];

  @Column()
  activities?: UserCharacter['activities'];

  @Column(() => Accounts)
  accounts?: Accounts[];

  @Column()
  experiences?: UserCharacter['experiences'];
}

export { UserCharacters };
