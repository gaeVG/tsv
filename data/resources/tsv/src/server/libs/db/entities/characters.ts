// Dependencies
import { Column, Entity } from 'typeorm';
// Native wrapper
import { Vec4 } from '@native/utils/Vector4';
// Declarations
import { CharacterDescription, PlayerData, SkinCharacter } from '@declares/user';
import { InventoryType } from '@declares/inventory';

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
