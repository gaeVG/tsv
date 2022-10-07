// Native wrapper
import { Player } from '@native/models/Player';
// Declarations
import { ErrorCodeEnum } from '@declares/errors';

class DriverActivityPlayerNotInVehicleError extends Error {
  constructor(player: Player) {
    super(`Le joueur ${player.Name} doit être dans un véhicule`, {
      cause: { code: ErrorCodeEnum.DriverActivityPlayerNotInVehicleError, player },
    });
  }
}

export { DriverActivityPlayerNotInVehicleError };
