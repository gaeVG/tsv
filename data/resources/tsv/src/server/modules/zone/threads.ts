import { ThreadModule } from '../../../core/declares/threads';
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { IUser } from '../../../core/declares/user';
import moduleConfig from './config';
import { tsv } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Thread,
  isModuleDisplay: moduleConfig.debug,
};

const zoneThreads: ThreadModule[] = [
  {
    name: 'zoneTick',
    timer: 1000,
    callback: () => {
      log.location = 'zoneTick()';
      try {
        tsv.zones.All.map((zone) =>
          tsv.users.All.map((user) => {
            if (user.currentZone !== zone.id && zone.isInsidePolygon(user.Ped.Position)) {
              zone.onEnter(user);
              tsv.users.updateOne({
                ...user,
                currentZone: zone.id,
              });

              if (zone.bucket) {
                tsv.buckets.getOne(zone.bucket).addUser(user);
              }
            }
          }),
        );
      } catch (error) {
        tsv.log.error({
          namespace: 'status',
          container: EnumLogContainer.Thread,
          location: 'statusTick()',
          message: error instanceof Error ? error.message : error,
        });
      }

      return true;
    },
  },
];

export { zoneThreads };
