// Native wrapper
import { Vector4 } from '@native/utils';
// Declarations
import { CharacterDescription, UserIdentifier } from '@declares/user';
import { UserGroup } from '@declares/user';
import { UserActivityType } from '@declares/activity';
// Core libs
import { StatusManager } from '@libs/status';
import { InventoryManager } from '@libs/inventory';

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
