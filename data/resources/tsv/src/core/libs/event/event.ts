import { uuid } from '../../utils/uuid';
import { IEventListener } from '../../declares/events';
import { Log } from '../log';
import { EnumLogContainer, LogData } from '../../declares/log';
import { AES } from '../aes';
import locale from '../../../config/i18n';

const log: LogData = {
  namespace: 'CoreEvent',
  container: EnumLogContainer.Class,
};

class Event {
  identifier: string;
  name: string;
  hashName: string;
  module: string;
  target: number | undefined;
  onNet: boolean;
  isCallback: boolean;
  isLocal: boolean;
  private handler: (...args: unknown[]) => any;
  private callback?: (...args: unknown[]) => void;

  constructor(event: IEventListener) {
    this.identifier = uuid();
    this.name = event.name;
    this.hashName = AES.encrypt(this.name);
    this.module = event.module;
    this.handler = event.handler;
    this.onNet = event.onNet ? true : false;
    this.isCallback = event.isCallback ? true : false;
    this.isLocal = event.isLocal ? true : false;
    this.target = event.target ? (this.onNet ? event.target : -1) : undefined;
  }

  addEventHandler(source?: string | number, ...args: unknown[]): any {
    return this.handler(source, ...args);
  }
}

export { Event };
