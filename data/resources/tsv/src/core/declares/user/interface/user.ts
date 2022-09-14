import { CharacterDescription, UserIdentifier } from '../';
import { StatusManager } from '../../../libs/status';
import { InventoryManager } from '../../../libs/inventory';
import { UserGroup } from '../../../declares/user';
import { UserActivityType } from '../../activity';
import { Vector4 } from '../../../libs/utils/Vector4';

interface IUser {
  id: string;
  source?: string;
  serverId?: number;
  Name?: string;
  identifiers?: UserIdentifier;
  group?: UserGroup;
  position?: Vector4;
  characterDescription?: CharacterDescription;
  status?: StatusManager;
  inventories?: InventoryManager;
  activities?: UserActivityType[];
  isReady?: boolean;
  currentBucket?: number;
  currentZone?: string;
}

export { IUser };
