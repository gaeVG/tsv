import { SkinCharacter } from '.';
import { Vec4 } from '../../../libs/utils/Vector4';
import { InventoryType } from '../../inventory';

type CharacterDescription = {
  lastname: string;
  firstname: string;
  age: number;
  sex: 'M' | 'F' | 'T';
};

type Character = {
  description: CharacterDescription;
  model: 'mp_m_freemode_01' | 'mp_f_freemode_01';
  hashModel?: number;
  skin?: SkinCharacter;
  position: Vec4;
  isDead: boolean;
  status?: { name: string; value: unknown }[];
  inventories?: Array<InventoryType>;
  licenses?: [];
  activities?: { for: string; job: string; role: string }[];
  experiences?: [];
};

export { Character, CharacterDescription };
