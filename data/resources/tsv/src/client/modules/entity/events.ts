import { IEventListener } from '../../../core/declares/events';
import { IUser } from '../../../core/declares/user';
import { Player } from '../../../core/libs';

const entityEvents: IEventListener[] = [
  {
    name: 'setEntityHealth',
    module: 'entity',
    onNet: true,
    handler: (_, user: IUser, health: number) => (new Player().Ped.Health = health),
  },
  {
    name: 'setEntityArmor',
    module: 'entity',
    onNet: true,
    handler: (_, user: IUser, armor: number) => (new Player().Ped.Armor = armor),
  },
];

export { entityEvents };
