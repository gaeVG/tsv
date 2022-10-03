import { Column, Entity } from 'typeorm';
import { Vec4 } from '../../../../core/libs/utils/Vector4';
import { CharacterDescription, PlayerData, SkinCharacter } from '../../../../core/declares/user';
import { InventoryType } from '../../../../core/declares/inventory';

@Entity()
class UserCharacters {
  @Column()
  description?: CharacterDescription;

  @Column()
  skin?: SkinCharacter;

  @Column()
  position: Vec4;

  @Column()
  isDead: boolean;

  @Column()
  status: { name: string; value: unknown }[];

  @Column()
  inventories?: Array<InventoryType>;

  @Column()
  licenses?: [];

  @Column()
  activities?: PlayerData['activities'];

  @Column()
  experiences?: { name: string; total: number }[];
}

export { UserCharacters };
