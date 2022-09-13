import { EnumEventTarget } from '../declares/events';
import _t from '../../config/i18n';

class EnvUnknownError extends Error {
  constructor() {
    super('Environnement inconnu');
    this.name = 'EnvUnknownError';
  }
}
class EnvError extends Error {
  constructor(envName: string, message: string, name: string) {
    let errorMessage: string;
    let errorName: string;

    try {
      if (GetGameName() !== envName) throw new EnvUnknownError();

      errorMessage = message;
      errorName = name;
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
        errorName = error.name;
      }
    } finally {
      super(errorMessage);
      this.name = errorName;
    }
  }
}
class EnvClientError extends EnvError {
  constructor() {
    super(
      EnumEventTarget.CLIENT,
      `Environnement ${EnumEventTarget.CLIENT} non supporté`,
      'EnvClientError',
    );
  }
}
class EnvServerError extends EnvError {
  constructor() {
    super(
      EnumEventTarget.SERVER,
      `Environnement ${EnumEventTarget.SERVER} non supporté`,
      'EnvServerError',
    );
  }
}

class Env {
  static client(handler: () => void) {
    try {
      if (GetGameName() !== EnumEventTarget.CLIENT) {
        throw new EnvClientError();
      }

      handler();
    } catch (error) {
      if (!(error instanceof EnvClientError) && error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  static server(handler: () => void) {
    try {
      if (GetGameName() !== EnumEventTarget.SERVER) {
        throw new EnvServerError();
      }

      handler();
    } catch (error) {
      if (!(error instanceof EnvServerError) && error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export { Env };
