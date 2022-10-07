// Native wrapper
import { Vec4 } from '@native/utils/Vector4';
// Declarations
import { InventoryType } from '@declares/inventory';
import { PlayerStatusType } from '@declares/status';
import { IZone } from '@declares/zone';
import { SkinCharacter } from '@declares/user';
//import { AccountType } from '@declares/account';

type PlayerData = {
  isDead: boolean;
  skin?: SkinCharacter;
  inventories?: Array<InventoryType>;
  //accounts?: Array<AccountType>;
  activities?: { for: string; job: string; role: string }[];
  status?: PlayerStatusType[];
  position: Vec4;
  currentZone?: IZone;
  licenses?: [];
};

export { PlayerData };
