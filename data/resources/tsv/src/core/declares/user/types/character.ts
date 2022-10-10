// Native wrapper
import { Vec4 } from '@native/utils/Vector4';
// Declarations
import { IAccount } from '@declares/account';
import { SkinCharacter } from '@declares/user';
import { InventoryType } from '@declares/inventory';

type CharacterDescription = {
  skin?: SkinCharacter;
  lastname: string;
  firstname: string;
  age: number;
  model: 'mp_m_freemode_01' | 'mp_f_freemode_01';
  sex: 'M' | 'F' | 'T';
};

type UserCharacter = {
  description: CharacterDescription;
  skin?: SkinCharacter;
  position: Vec4;
  isDead: boolean;
  status?: { name: string; value: unknown }[];
  inventories?: Array<InventoryType>;
  accounts: Array<IAccount>;
  licenses?: [];
  activities?: { for: string; job: string; role: string }[];
  experiences?: { name: string; total: number }[];
};

export { UserCharacter, CharacterDescription };
