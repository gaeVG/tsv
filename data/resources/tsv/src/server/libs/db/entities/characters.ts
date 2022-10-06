import { Column, Entity } from 'typeorm';
import { Vec4 } from '../../../../core/libs/utils/Vector4';
import { CharacterDescription, PlayerData, SkinCharacter } from '../../../../core/declares/user';
import { Accounts } from './accounts';
import { UserCharacter } from '../../../../core/declares/user';
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
