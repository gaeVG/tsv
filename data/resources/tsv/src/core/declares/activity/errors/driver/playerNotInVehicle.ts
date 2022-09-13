import { ErrorCodeEnum } from '../../../../declares/errors';
import { Player } from '../../../../libs';

class DriverActivityPlayerNotInVehicleError extends Error {
  constructor(player: Player) {
    super(`Le joueur ${player.Name} doit être dans un véhicule`, {
      cause: { code: ErrorCodeEnum.DriverActivityPlayerNotInVehicleError, player },
    });
  }
}

export { DriverActivityPlayerNotInVehicleError };
