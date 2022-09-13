import { Log } from '../log';
import { Callback } from './callback';
import { ICallback } from '../../declares/callback';
import { EnumLogContainer, LogData } from '../../declares/log';

const log: LogData = {
  namespace: 'CoreCallback',
  container: EnumLogContainer.Manager,
};

class CallbackManager {
  manager: Callback[];

  constructor() {
    this.manager = [];
  }

  addOne(addCallback: ICallback): Callback | null {
    if (!this.manager.find((callbackManager) => addCallback.name === callbackManager.name)) {
      const callback = new Callback(addCallback);
      Log.debug({
        ...log,
        location: 'addOne',
        message: 'Callback added',
      });

      this.manager.push(callback);
      return callback;
    }

    return null;
  }

  getOne(getCallback: string): Callback | null {
    const callback = this.manager.find((callbackManager) =>
      [callbackManager.name, callbackManager.identifier].includes(getCallback),
    );
    if (!callback) {
      //debug.warning(`Callback ${getCallback.name} not found on ${getCallback.module} module`);
      return null;
    }

    return callback;
  }

  getAll(): Callback[] {
    return this.manager;
  }
  registerCallback(callbackRegister: ICallback[] | ICallback): Callback[] | Callback | null {
    const registeredCallback = Array.isArray(callbackRegister)
      ? (callbackRegister.map((callback) => this.addOne(callback)) as Callback[])
      : this.addOne(callbackRegister);

    return registeredCallback;
  }
  triggerCallback(name: string): void {
    if (GetGameName() === 'fxserver') {
      return;
    }

    // eventManager.trigger({ name: 'serverCallback' });
  }
}

export { CallbackManager };
