// Declarations
import { NUIListener, NUIMessage } from '@declares/nui';

class NUIManager {
  private manager: NUIListener[];

  private on() {
    RegisterNuiCallbackType('listener');
    on('__cfx_nui:listener', async (data: any, callback: (...args: unknown[]) => void) => {
      const event = this.manager.find((listener) => data.name === listener.name);

      if (event) {
        const eventHandler = await event.handler(data.payload);
        callback(eventHandler);

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
