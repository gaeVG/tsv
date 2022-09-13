import { Vec4 } from '../../../libs/utils/Vector4';
import { InventoryType } from '../../inventory';
import { PlayerStatus } from '../../status';
import { IZone } from '../../zone';
import { SkinCharacter } from '.';

type PlayerData = {
  isDead: boolean;
  skin?: SkinCharacter;
  inventories?: Array<InventoryType>;
  accounts?: [];
  activities?: { for: string; job: string; role: string }[];
  status?: PlayerStatus[];
  position: Vec4;
  currentZone?: IZone;
  licenses?: [];
};

export { PlayerData };
