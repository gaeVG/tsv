// Native wrapper
import { Vector4 } from '@native/utils';
// Declarations
import { CharacterDescription, UserIdentifier } from '@declares/user';
import { UserGroup } from '@declares/user';
import { UserActivityType } from '@declares/activity';
// Managers
import { StatusManager } from '@libs/status';
import { InventoryManager } from '@libs/inventory';
import { AccountManager } from '@libs/account';

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
  accounts?: AccountManager;
  activities?: UserActivityType[];
  isReady?: boolean;
  currentBucket?: number;
  currentZone?: string;
}

export { IUser };
