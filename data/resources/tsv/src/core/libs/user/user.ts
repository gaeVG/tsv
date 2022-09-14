import { Player } from '..';
import { CharacterDescription, IUser, UserGroup, UserIdentifier, UserIdentifierEnum } from '../../declares/user';
import { StatusManager } from '../status';
import { InventoryManager } from '../inventory';
import { UserActivityType } from '../../declares/activity';

class User extends Player implements IUser {
  id: string;
  source: string;
  identifiers?: UserIdentifier;
  group: UserGroup;
  characterDescription: CharacterDescription;
  status?: StatusManager;
  inventories?: InventoryManager;
  activities? : UserActivityType[];
  currentBucket?: number;
  currentZone?: string;

  constructor(user: IUser) {
    super(GetGameName() === 'fxserver' ? parseInt(user.source) : -1);
    this.id = user.id;
    this.source = user.source;
  
    this.identifiers = getPlayerIdentifiers(this.source).reduce((identifiers, identifier) => {
      if (identifier.startsWith(UserIdentifierEnum.STEAM)) {
        identifiers.steam = identifier;
      } else if (identifier.startsWith(UserIdentifierEnum.FIVEM)) {
        identifiers.fivem = identifier;
      } else if (identifier.startsWith(UserIdentifierEnum.DISCORD)) {
        identifiers.discord = identifier;
      }

      return identifiers;
    }, {} as UserIdentifier);

    this.group = user.group;
    this.characterDescription = user.characterDescription;

    global.ExecuteCommand(`add_principal identifier.${process.env.IDENTIFIER_TYPE}:${this.identifiers[process.env.IDENTIFIER_TYPE]} group.${this.group}`);
  }

  isAdmin(): boolean {
    return this.group === 'admin';
  }
  showNotification(message: string): void {
    this.showNotification(message);
  }
  get Health() {
    return this.Health;
  }

  get CurrentBucket() {
    return this.currentBucket;
  }
}

export { User };
