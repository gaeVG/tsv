// Declarations
import { IUser } from '@declares/user';
import { EnumLogContainer } from '@declares/log';
import { LogData } from '@declares/log';
// Module
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.name.charAt(0).toUpperCase() + config.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: config.debug,
};

function basicNeeds(user: IUser) {
  log.location = 'basicNeeds()';

  tsv.threads.createThread({
    name: `${user.id}-basic-needs`,
    timer: 4000,
    callback: () => {
      try {
        if (tsv.users.getOnebyId(user.id) === undefined) {
          return false;
        }
        user.status.getAll().map((status) => {
          user.status.updateOne({
            ...status,
            value: (status.value as number) - status.consume,
          });

          tsv.events.trigger({
            name: 'statusUpdate',
            module: 'status',
            onNet: true,
            target: user.source,
            data: [user.status.getAll()],
          });
        });
      } catch (error) {
        tsv.log.error({
          ...log,
          message: error instanceof Error ? error.message : error,
        });
      }

      return true;
    },
  });
}

export { basicNeeds };
