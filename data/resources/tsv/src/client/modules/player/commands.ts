import { tsv } from '../..';
import { CommandType } from '../../../core/declares/command';
import moduleConfig from './config';

const playerCommands = [
  {
    name: 'open-personnal-menu',
    module: moduleConfig.name,
    description: 'module.player.commmands.openPersonnalMenu.description',
    handler: () => tsv.menus.openOne('personnal'),
    key: 'i',
  },
] as CommandType[];

export { playerCommands };
