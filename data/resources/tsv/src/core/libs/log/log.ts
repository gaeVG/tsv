// import { default as config } from '../../../config';
import { ColorClientConsoleEnum, ColorServerConsoleEnum } from '../../declares/colors';
import { LogData } from '../../declares/log';
import { Env } from '../env'

const formatMessage = (log: LogData): string => {
  let sepEnv = '';
  let sufEnv = '';

  Env.client(() => sepEnv = log.isChild ? (log.isLast ? '\tL' : '\tI') : '\tF');
  Env.server(() => {
    sepEnv = log.isChild ? (log.isLast ? '\tâ' : '\tâ') : '\tâ';
    sufEnv = ColorServerConsoleEnum.RESET;
  });

  return `${log.namespace}::${log.container}:${
    log.location !== undefined ? log.location : ''
  }${sepEnv} ${log.message}${sufEnv}`;
};

class Log {
  static debug(log: LogData): void {
    let preEnv = '';

    Env.client(() => (preEnv = `${ColorClientConsoleEnum.BLUE}[DEBUG] `));
    Env.server(() => (preEnv = `ğ${ColorServerConsoleEnum.BLUE}\t`));

    (log.isModuleDisplay === undefined || log.isModuleDisplay === true) &&
      process.env.NODE_ENV === 'development' &&
      console.log(`${preEnv} ${formatMessage(log)}`);
  }
  static error(log: LogData): void {
    let preEnv = '';
    Env.client(() => preEnv = `${ColorClientConsoleEnum.RED}[ERROR] `);
    Env.server(() => preEnv = `ğ¥${ColorServerConsoleEnum.RED}\t`);

    (log.isModuleDisplay == undefined || log.isModuleDisplay) &&
      process.env.NODE_ENV === 'development' &&
      console.log(`${preEnv} ${formatMessage(log)}`);
  }
  static warning(log: LogData): void {
    let preEnv = '';
    Env.client(() => preEnv = `${ColorClientConsoleEnum.YELLOW}[WARNING] `);
    Env.server(() => preEnv = `ğ§­${ColorServerConsoleEnum.YELLOW}\t`);

    (log.isModuleDisplay == undefined || log.isModuleDisplay) &&
      process.env.NODE_ENV === 'development' &&
      console.log(`${preEnv} ${formatMessage(log)}`);
  }
  static confirm(log: LogData): void {
    let preEnv = '';
    Env.client(() => preEnv = `${ColorClientConsoleEnum.GREEN}[CONFIRM] `);
    Env.server(() => preEnv = `ğ${ColorServerConsoleEnum.GREEN}\t`);

    (log.isModuleDisplay == undefined || log.isModuleDisplay) &&
      process.env.NODE_ENV === 'development' &&
      console.log(`${preEnv} ${formatMessage(log)}`);
  }
  static safemode(log: LogData): void {
    let preEnv = '';
    Env.client(() => preEnv = `[SAFEMODE] `);
    Env.server(() => preEnv = `ğ½\t`);

    (log.isModuleDisplay == undefined || log.isModuleDisplay) &&
      process.env.EXECUTION_MODE === 'safemode' &&
      console.log(`${preEnv} ${formatMessage(log)}`);
  }
}

export { Log };
