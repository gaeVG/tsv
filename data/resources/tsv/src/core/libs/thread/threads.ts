// Native wrapper
import { Wait } from '@native//';
// Declarations
import { ThreadModule as ThreadModuleType } from '@declares/threads';
import { EnumLogContainer, LogData } from '@declares/log';
// Core utils
import { uuid } from '../../utils/uuid';
// Core libs
import { Benchmark } from '@libs/benchmark';
import { Log } from '@libs/log';
// Locale import
import _t from '@config/i18n';

// Log variable
const log: LogData = {
  namespace: _t('CoreThread'),
  container: EnumLogContainer.Class,
};

class ThreadModule {
  identifier: string;
  name: string;
  timer: number;
  callback: (identifier: string, name: string, timer: number) => boolean;

  constructor(module: ThreadModuleType) {
    this.identifier = uuid();
    this.name = module.name;
    this.timer = module.timer;
    this.callback = module.callback;
  }
}

class Thread {
  identifier: string;
  modules: ThreadModule[];
  frequency: number;
  timer = -1;
  isDUIThread = false;
  isFull = false;

  constructor(frequency?: number, isDUIThread?: boolean) {
    log.location = _t('global.location.constructor');
    this.identifier = uuid();
    this.modules = [];
    this.frequency = frequency;
    this.isDUIThread = isDUIThread || false;

    Log.safemode({
      ...log,
      message: _t('core.thread.class.constructor.create'),
    });
    log.isChild = true;
    Log.safemode({
      ...log,
      message: `Identifiant : ${this.identifier}`,
    });
    log.isLast = true;
    this.isDUIThread
      ? Log.safemode({
          ...log,
          message: `Thread FiveM`,
          isLast: true,
        })
      : Log.safemode({
          ...log,
          message: `Fréquence : "${frequency} ms"`,
          isLast: true,
        });
  }

  private async tick(): Promise<void> {
    log.location = 'tick()';
    log.isChild = true;

    if (!this.isDUIThread) {
      await Wait(this.frequency);
    }

    const threadBenchmark = new Benchmark();
    this.modules = this.modules.filter((module: ThreadModule) => {
      return module.callback(module.identifier, module.name, this.frequency);
    });
    if (!this.isFull && threadBenchmark.grab() > 8) {
      this.isFull = true;
      Log.warning({
        ...log,
        message: _t('core.thread.class.tick.isFull', {
          threadIdentifier: this.identifier,
          threadFrequency: this.frequency,
        }),
      });
    }

    if (this.modules.length === 0) {
      Log.warning({
        ...log,
        message: _t('core.thread.class.tick.endOfThread', { threadIdentifier: this.identifier }),
        isChild: true,
        isLast: true,
      });
      clearTick(this.timer);
    }
  }

  addOne(addModule: ThreadModuleType): Thread {
    log.location = 'addOne()';
    Log.safemode({ ...log });
    log.isChild = true;

    if (this.modules.length === 0) {
      Log.safemode({
        ...log,
        message: `Le thread "${this.identifier}" est vide, intialisation du timer`,
      });
      this.timer = setTick(this.tick.bind(this));
    }

    if (this.timer > 8) {
      Log.debug({
        ...log,
        message: `Le thread "${this.identifier}" est plein`,
      });
      this.isFull = true;
    }

    Log.safemode({
      ...log,
      message: `Ajout du module "${addModule.name}" au thread "${this.identifier}"`,
      isLast: true,
    });
    this.modules.push(new ThreadModule(addModule));

    return this;
  }
  removeOne(putModuleIdentifier: string): boolean {
    const modules = this.modules.filter((module) => putModuleIdentifier !== module.identifier);

    if (modules.length === this.modules.length) {
      //debug.error(`Module ${putModule.name} not found in thread ${this.identifier}`);
      return false;
    }

    this.modules = modules;

    // debug.confirm(
    //     `Module ${putModule.name} (ID: ${putModule.identifier}) removed from thread ${this.identifier}`
    // );

    return true;
  }
}

export { Thread };
