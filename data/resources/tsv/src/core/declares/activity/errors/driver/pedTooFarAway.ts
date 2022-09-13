import { Ped } from '../../../../libs';
import { ErrorCodeEnum } from '../../../errors';

class DriverActivityTargetTooFarAwayError extends Error {
  constructor(target: Ped, player: Ped) {
    super(`Le client est trop loin ${target.Position}`, {
      cause: { code: ErrorCodeEnum.DriverActivityTargetTooFarAwayError, target, player },
    });
    this.name = 'DriverActivityTargetTooFarAwayError';
  }
}

export { DriverActivityTargetTooFarAwayError };
