import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { ICommand } from '../../../core/declares/command';
import { Log } from '../../../core/libs/log';

import { tsv } from '../../../server';

const log: LogData = {
  namespace: 'CoreCommand',
  container: EnumLogContainer.Class,
};

class CommandManager {
  private manager: ICommand[];

  constructor() {
    this.manager = [];
  }

  registerOneCommand(registerCommand: ICommand): void {
    if (
      this.manager.find((commandManager) => {
        if (registerCommand.name === commandManager.name) {
          Log.warning({
            ...log,
            location: 'registerOneCommand()',
            message: `Command ^5"${registerCommand.name}" already registered, overriding command`,
          });

          if (commandManager.suggestions) {
            emitNet('chat:removeSuggestion', '-1', `/${commandManager.name}`);
            return true;
          }
        }
        return false;
      })
    ) {
      RegisterCommand(
        registerCommand.name,
        (source: string, args: string[], rawCommand: string) =>
          this.handleCommand(source, args, rawCommand),
        registerCommand.allowConsole,
      );

      this.manager.push(registerCommand);
    }
  }
  getOneCommand(getCommand: ICommand): ICommand | boolean {
    console.log(getCommand);
    return false;
  }
  updateOneCommand(updateCommand: ICommand): ICommand | boolean {
    console.log(updateCommand);
    return false;
  }
  deleteOneCommand(command: ICommand): boolean {
    const manager: ICommand[] = this.manager.filter(
      (commandManager) => command.name === commandManager.name,
    );

    if (manager.length === this.manager.length) {
      Log.error({
        ...log,
        location: 'deleteOneCommand',
        message: `Command ^5"${command.name}" not found`,
      });
      return false;
    }

    return true;
  }

  handleCommand(source: string, args: unknown[], rawCommand: string) {
    const player = tsv.users.getOneByIdentifier(source);
    Log.debug({
      ...log,
      location: 'handleCommand()',
      message: `Command ^5"${rawCommand}" called by ^5"${player.Name}"`,
    });
    console.log(args);

    // if (command.allowConsole && player.id) {
    //     debug.warning((`[^3WARNING^7] ^5${'commanderror_console'}`));
    // } else {
    //     const xPlayer = player.id; /* tsv.getPlayerFromId(player.id); */
    //     let error = null;

    //     if (command.arguments.length > 0) {
    //         // if (handleCommandArguments.length !== command.arguments.length) {
    //             // error ='commanderror_argumentmismatch', handleCommandArguments.length, command.arguments.length;
    //         // }
    //     }

    //     if (!error && command.arguments) {
    //         // let newArgs = {};

    //         command.arguments.map((argument) => {
    //             if (argument.type) {
    //                 if (typeof argument.type === 'number') {
    //                     const newArg = parseInt(args[k]);

    //                     if (newArg) {
    //                         // newArgs[v.name] = newArg;
    //                     } else {
    //                         // error =_U('commanderror_argumentmismatch_number', k)
    //                     }
    //                     // } else if (argument.type == ArgumentsType.PLAYER_ID) {
    //                     const targetPlayer = args[k] == 'me' ? playerId : parseInt(args[k])

    //                     if (targetPlayer) {
    //                         const xTargetPlayer = ESX.GetPlayerFromId(targetPlayer)

    //                         if (xTargetPlayer) {
    //                             if (v.type == 'player') {
    //                                 newArgs[v.name] = xTargetPlayer;
    //                             } else {
    //                                 newArgs[v.name] = targetPlayer;
    //                             }
    //                         } else {
    //                             error ='commanderror_invalidplayerid';
    //                         }
    //                     } else {
    //                         error ='commanderror_argumentmismatch_number';
    //                     }
    //                 } else if (argument.type == 'string') {
    //                     newArgs[argument.name] = args[k];
    //                 } else if (v.type == 'item') {
    //                     if (ESX.Items[args[k]]) {
    //                         newArgs[v.name] = args[k]
    //                     } else {
    //                         error = _U('commanderror_invaliditem')
    //                     }
    //                 } else if (v.type == 'weapon') {
    //                     if (ESX.GetWeapon(args[k])) {
    //                         newArgs[v.name] = string.upper(args[k])
    //                     } else {
    //                         error = _U('commanderror_invalidweapon')
    //                     }
    //                 } else if (v.type == 'any') {
    //                     newArgs[v.name] = args[k];
    //                 }
    //             }
    //         });

    //         args = newArgs;
    //     }

    //     if (error) {
    //         if (playerId == 0) {
    //             console.log((`[^3WARNING^7] ${error}^7`))
    //         } else {
    //             xPlayer.showNotification(error)
    //         }
    //     } else {
    //         command.handler(xPlayer || false, args, msg =>
    //             playerId == 0
    //                 ? console.log(`[^3WARNING^7] ${msg}^7`)
    //                 : xPlayer.showNotification(msg)
    //         )
    //     }
    // }
  }
}

export { CommandManager };
