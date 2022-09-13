import { Character, UserIdentifier } from '../';
import { StatusManager } from '../../../libs/status';
import { InventoryManager } from '../../../libs/inventory';
import { UserGroup } from '../../../declares/user';
import { UserActivityType } from '../../activity';

interface IUser {
  id: string;
  source?: string;
  serverId?: number;
  Name?: string;
  identifiers?: UserIdentifier;
  group?: UserGroup;
  character?: Character;
  status?: StatusManager;
  inventories?: InventoryManager;
  activities?: UserActivityType[];
  isReady?: boolean;
  currentBucket?: number;
  currentZone?: string;
}

export { IUser };
