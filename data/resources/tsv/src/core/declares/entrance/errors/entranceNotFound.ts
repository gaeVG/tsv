// Declarations
import { ErrorCodeEnum } from '@declares/errors';

class EntranceNotFoundError extends Error {
  constructor(entranceId: string) {
    super(`Entrance ID "${entranceId}" not found`, {
      cause: { code: ErrorCodeEnum.EntranceNotFoundError },
    });
    this.name = 'EntranceNotFoundError';
  }
}

export { EntranceNotFoundError };
