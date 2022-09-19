import { Event } from './event';
import {
  IEventListener,
  EnumEventTarget,
  IEventTrigger,
  SharedEventNativeEnum,
  ServerEventNativeEnum,
  ClientEventNativeEnum,
} from '../../declares/events';
import { Log } from '../log';
import { AES } from '../aes';
import { EnumLogContainer, LogData } from '../../declares/log';
import { Env } from '../../utils/env';
import _t from '../../../config/i18n';

const log: LogData = {
  namespace: 'CoreEvent',
  container: EnumLogContainer.Manager,
};

class EventManager {
  private manager: Event[];

  private emit(emitEvent: IEventTrigger): void {
    log.location = 'emit()';

    Env.client(() => {
      this.manager.map((event) => {
        if (event.name === emitEvent.name) {
          if (emitEvent.module && event.module !== emitEvent.module) {
            return;
          }

          if (event.isLocal) {
            emit(event.name, emitEvent.data);
          } else {
            event.addEventHandler(128, ...emitEvent.data);
          }
        }
      });
    });
    Env.server(() => emit(emitEvent.name, ...(emitEvent.data as unknown[])));
  }
  private emitNet(emitEventNet: IEventTrigger): void {
    log.location = 'emitNet()';
    const eventHashName = AES.encrypt(emitEventNet.name);
    const eventHashData =
      emitEventNet.data !== undefined && emitEventNet.data.length > 0
        ? AES.encrypt(JSON.stringify(emitEventNet.data))
        : null;

    Env.client(() => emitNet('eventParadise', eventHashName, eventHashData));
    Env.server(() => emitNet(
      'eventParadise',
      emitEventNet.target !== undefined ? emitEventNet.target : -1,
      eventHashName,
      eventHashData,
    ));
  }
  private on(newEvent: IEventListener): void {
    log.location = 'on()';
    Log.safemode({
      ...log,
      message: _t('core.event.manager.on.creatingEvent', { eventName: newEvent.name }),
    });

    const event = this.addOne(newEvent);
    if (!event) {
      Log.error({
        ...log,
        message: _t('core.event.manager.on.alreadyExist', { eventName: newEvent }),
      });
      return;
    }

    Log.debug({
      ...log,
      message: `${event.name} (${event.hashName}) a bien été enregistré`,
      isChild: true,
      isLast: true,
    });

    on(newEvent.name, (...args: unknown[]) => newEvent.handler(...args));
  }
  private onNet(newEvent: IEventListener): void {
    log.location = 'onNet()';
    Log.safemode({
      ...log,
      message: _t('core.event.manager.onNet.creatingEvent', { eventName: newEvent.name }),
    });

    this.addOne(newEvent);
  }
  private onNative(nativeEvent: IEventListener) {
    log.location = 'onNative()';
    on(nativeEvent.name, (...args: unknown[]) => nativeEvent.handler(source.toString(), ...args));
  }

  private addOne(newEvent: IEventListener): Event | null {
    log.location = 'addOne()';
    Log.safemode({
      ...log,
      message: _t('core.event.manager.searchEvent', { eventName: newEvent.name }),
    });
    if (!this.manager.find((event) => event.name === newEvent.name)) {
      const event = new Event(newEvent);
      this.manager.push(event);
      Log.safemode({
        ...log,
        message: _t('core.event.manager.addOne.eventAdded', { eventName: event.name }),
        isChild: true,
        isLast: true,
      });
      return event;
    }

    return null;
  }
  private getOne(eventName: string): Event | undefined {
    log.location = 'getOne()';
    Log.safemode({
      ...log,
      message: `Recherche de l'évènement ${eventName}`,
    });

    return this.manager.find((event: Event) => {
      if (eventName === event.name) {
        Log.safemode({
          ...log,
          message: _t('core.event.manager.eventFound', { eventName: event.name }),
        });
        return event;
      }
    });
  }

  constructor() {
    log.location = 'constructor()';
    this.manager = [];

    Log.safemode({
      ...log,
      message: _t('core.event.manager.constructor.createManager'),
    });

    onNet('eventParadise', (eventHashName: string, eventHashData: string) => {
      log.location = `onNet('eventParadise')`;
      const eventSource = source.toString();
      const event = this.manager.find((eventManager) => AES.decrypt(eventHashName) === eventManager.name);

      if (event === undefined) {
        return;
      }

      const data = eventHashData !== null ? AES.decrypt(eventHashData) : undefined;
      const dataParsed: unknown[] = data !== undefined ? JSON.parse(data) : [];
      const eventHandler = event.addEventHandler(eventSource, ...dataParsed);

      if (event.isCallback) {
        this.emitNet({
          name: event.name,
          onNet: true,
          target: eventSource,
          data: [eventHandler],
        });
      }
    });

    Log.debug({
      ...log,
      message: _t('core.event.manager.constructor.complete'),
      isChild: true,
      isLast: true,
    });
  }

  listen(listenEvent: IEventListener) {
    log.location = 'listen()';
    Log.safemode({
      ...log,
      message: _t('core.event.manager.listen.listenEvent', { eventName: listenEvent.name }),
    });

    if (listenEvent.onNet) {
      Log.safemode({
        ...log,
        message: _t('core.event.manager.listen.isNetworkEvent', { eventName: listenEvent.name }),
        isChild: true,
        isLast: true,
      });

      this.onNet(listenEvent);
    } else {
      Log.safemode({
        ...log,
        message: _t('core.event.manager.listen.isLocalEvent', { eventName: listenEvent.name }),
        isChild: true,
        isLast: true,
      });

      const nativeEvents = {
        ...SharedEventNativeEnum,
        ...ServerEventNativeEnum,
        ...ClientEventNativeEnum,
      };
      if (Object.values(nativeEvents).find((nativeEvent) => listenEvent.name === nativeEvent)) {
        this.onNative(listenEvent);
      } else {
        switch (GetGameName()) {
          case EnumEventTarget.SERVER:
            this.on(listenEvent);
            break;
          case EnumEventTarget.CLIENT:
            listenEvent.isLocal ? this.on(listenEvent) : this.onNet(listenEvent);
            break;
          default:
            Log.error({
              ...log,
              message: _t('core.event.manager.listen.unknownGame'),
            });
        }
      }
    }
  }
  trigger(triggerEvent: IEventTrigger): void {
    log.location = 'trigger()';
    
    if (triggerEvent.callback) {
      this.onNet({
        name: triggerEvent.name,
        module: triggerEvent.module,
        onNet: true,
        handler: (eventSource: string, ...args: unknown[]) => {
          triggerEvent.callback(eventSource, ...args);
          this.manager = this.manager.filter((event) => event.name !== triggerEvent.name);
        },
      });
    }

    if (triggerEvent.onNet) {
      if (GetGameName() === EnumEventTarget.SERVER && triggerEvent.target == undefined) {
        Log.error({
          ...log,
          message: _t('core.event.manager.trigger.noTargetEvent'),
        });

        return;
      }
      this.emitNet(triggerEvent);
    } else {
      this.emit(triggerEvent);
    }
  }
}

export { EventManager };
