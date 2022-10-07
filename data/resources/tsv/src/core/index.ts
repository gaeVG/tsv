// Dependencies
import { TFunction } from 'i18next';
// Declarations
import { EnumLogContainer, LogData } from '@declares/log';
// Managers
import { EventManager } from '@libs/event';
import { ModuleManager } from '@libs/module';
import { ThreadManager } from '@libs/thread';
import { CallbackManager } from '@libs/callback';
import { CommandManager } from '@libs/command';
// Log
import { Log } from '@libs/log';
// Locale import
import _t from '@config/i18n';

// Log variable
const log: LogData = {
  namespace: 'MainCore',
  container: EnumLogContainer.Class,
};

class Core {
  locale: TFunction;
  readonly log: typeof Log;
  readonly events: EventManager;
  readonly modules: ModuleManager;
  readonly threads: ThreadManager;
  readonly callbacks: CallbackManager;
  readonly commands = new CommandManager();

  constructor() {
    this.locale = _t;
    this.log = Log;
    this.events = new EventManager();
    this.modules = new ModuleManager();
    this.threads = new ThreadManager();
    this.callbacks = new CallbackManager();
    this.commands = new CommandManager();

    this.log.debug({
      ...log,
      location: this.locale('global.location.constructor'),
      message: this.locale('core.main.constructor.creating'),
    });
  }
}

export { Core };
