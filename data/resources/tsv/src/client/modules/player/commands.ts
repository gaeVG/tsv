// Declarations
import { CommandType } from '@declares/command';
// Module
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Player module commands descriptions
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
