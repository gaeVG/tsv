import { CommandType, ICommand, CommandConsoleNotAllowedError } from '../../declares/command';
import { Crypto } from '../';
import { UserGroup } from '../../declares/user';

class Command implements ICommand{
  id: string;
  name: string;
  description: string;
  module: string;
  group: UserGroup | UserGroup[];
  handler: (...args: unknown[]) => void;
  allowConsole?: boolean;
  suggestions?: unknown;
  keyMapper?: 'keyboard' | 'controler';
  key?: string;

  constructor(command: CommandType) {
    this.id = Crypto.uuidv4();
    this.name = command.name;
    this.description = command.description || '';
    this.module = command.module;
    this.group = command.group;
    this.handler = () => this.handle(command.handler);
    this.suggestions = command.suggestion;
    this.keyMapper = command.keyMapper;
    this.key = command.key
  }

  private handle = (handler: (args: unknown[]) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    global.RegisterCommand(this.name, (playerId: number, commandArgs: unknown[], _) => {
      try {
        if (global.IsDuplicityVersion()) {
          if (this.allowConsole === undefined && playerId === 0) {
            throw new CommandConsoleNotAllowedError(this.name);
          }
        }

        handler(commandArgs);
      } catch (error) {
        if (error instanceof Error) {
          return error;
        }
      }
    }, true);

    if (this.keyMapper !== undefined) {
      global.RegisterKeyMapping(this.name, this.description, this.keyMapper, this.key);
    }

    if (this.group instanceof Array) {
      this.group.map((group) => global.ExecuteCommand(`add_ace group.${group} command.${this.name} allow`));
    } else {
      global.ExecuteCommand(`add_ace group.${this.group} command.${this.name} allow`);
    }
  }
}

export { Command };
