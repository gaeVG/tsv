import { Player } from '../../../libs';

class UserMissingIdentifierError extends Error {
  constructor(player: Player) {
    super(`Missing identifiers for player ${player.Name}`);
    this.name = 'UserNotMissingIdentifierError';
  }
}

export { UserMissingIdentifierError };
