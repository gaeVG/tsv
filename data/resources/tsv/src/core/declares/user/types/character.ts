import { SkinCharacter } from '.';
import { Vec4 } from '../../../libs/utils/Vector4';
import { InventoryType } from '../../inventory';

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
  licenses?: [];
  activities?: { for: string; job: string; role: string }[];
  experiences?: [];
};

export { UserCharacter, CharacterDescription };
