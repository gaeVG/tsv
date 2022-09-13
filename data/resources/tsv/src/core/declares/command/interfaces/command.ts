import { UserGroup } from '../../../declares/user';
import { ICommandArgument } from '.';

interface ICommand {
  id?: string;
  name: string;
  module: string;
  group: UserGroup | UserGroup[];
  allowConsole?: boolean;
  arguments?: ICommandArgument[];
  handler: () => void;
  suggestions?: unknown;
  keyMapper?: 'keyboard' | 'controler';
  key?: string;
}

export { ICommand };
