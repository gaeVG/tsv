import { tsp } from '../../';
import { IUser } from '../../../core/declares/user';
import { EnumLogContainer } from '../../../core/declares/log';
import { LogData } from '../../../core/declares/log';
import moduleConfig from './config';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
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
