import { Log } from '../log';
import {
  CommandAlreadyExistsError,
  CommandNotFoundError,
  CommandType,
  ICommand,
} from '../../declares/command';
import { Command } from './command';
import { LogData, EnumLogContainer } from '../../declares/log';

const log: LogData = {
  namespace: 'CoreCommand',
  container: EnumLogContainer.Event,
};

class CommandManager {
  manager: Command[];

  private addOne(addCommand: CommandType): ICommand | Error {
    try {
      if (this.manager.find((c) => c.name === addCommand.name)) {
        throw new CommandAlreadyExistsError(addCommand.name);
      }

      const command = new Command(addCommand);
      this.manager.push(command);

      return command;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }
  private removeOne(removeCommand: ICommand): Error {
    try {
      if (!this.manager.find((c) => c.name === removeCommand.name)) {
        throw new CommandNotFoundError(removeCommand.name);
      }

      this.manager = this.manager.reduce((manager, command) => {
        if (removeCommand.id !== command.id) {
          manager.push(command);
        }

        return manager;
      }, [] as Command[]);
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }

  constructor() {
    this.manager = [];
  }

  get All() {
    return this.manager;
  }

  register(registerCommand: CommandType | CommandType[]) {
    try {
      if (registerCommand instanceof Array) {
        registerCommand.map((r) => this.register(r));
      } else {
        (this.addOne(registerCommand) as ICommand).handler();
      }
    } catch (error) {
      if (error instanceof CommandAlreadyExistsError) {
        Log.error({
          ...log,
          message: error.message,
        });
      }
    }
  }
}

export { CommandManager };
