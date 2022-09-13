import { Player } from '../../../libs';

class UserAlreadyExistError extends Error {
  constructor(player: Player) {
    super(`User ${player.Name} (source: ${player.ServerId}) already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}

export { UserAlreadyExistError };
