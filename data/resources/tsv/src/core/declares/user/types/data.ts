// Native wrapper
import { Vec4 } from '@native/utils/Vector4';
// Declarations
import { InventoryType } from '@declares/inventory';
import { PlayerStatus } from '@declares/status';
import { IZone } from '@declares/zone';
import { SkinCharacter } from '@declares/user';

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
