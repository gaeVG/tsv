import { NUIListener, NUIMessage } from '../../../core/declares/nui';
class NUIManager {
  private manager: NUIListener[];

  private on() {
    RegisterNuiCallbackType('listener');
    on('__cfx_nui:listener', (data: any, callback: (...args: unknown[]) => void) => {
      const event = this.manager.find((listener) => {
        return data.name === listener.name;
      });

      if (event) {
        const eventHandle = event.handler(data.payload);

        if (callback) {
          callback({ eventHandle });
        }

        if (event.removeAfterTriggered) {
          this.manager = this.manager.filter((listener) => listener !== event);
        }
      }
    });
  }

  constructor() {
    this.manager = [];
    this.on();
  }

  trigger(message: NUIMessage) {
    SendNUIMessage(message);
  }
  listen(newListener: NUIListener) {
    if (
      !this.manager.find(
        (listener) => listener.name === newListener.name && listener.module === newListener.module,
      )
    ) {
      this.manager.push(newListener);
    }
  }
}

export { NUIManager };
