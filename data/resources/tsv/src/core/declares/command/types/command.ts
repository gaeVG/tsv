import { UserGroup } from '../../user';
import { CommandArgumentType } from '.';

type CommandType = {
  name: string;
  module: string;
  description?: string;
  group?: UserGroup;
  arguments?: CommandArgumentType;
  handler(...args: unknown[]): void;
  allowConsole?: boolean;
  suggestion?: unknown;
  keyMapper?: 'keyboard' | 'controler';
  key?: string;
};

export { CommandType };
