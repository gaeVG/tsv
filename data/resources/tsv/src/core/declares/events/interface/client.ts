import { IEventListener } from './listener';

interface IClientEvent extends IEventListener {
  playerId: string;
}

export { IClientEvent };
