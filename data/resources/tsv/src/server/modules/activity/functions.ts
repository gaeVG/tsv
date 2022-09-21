import { ISociety, SocietyType } from '../../../core/declares/society';
import { EnumLogContainer } from '../../../core/declares/log';
import appConfig from '../../../config';
import moduleConfig from './config';
import { LogData } from '../../../core/declares/log';
import { tsv } from '../..';
import { PolyZoneType } from '../../../core/declares/zone';
import { User } from '../../../core/libs/user';
import { EntranceStateEnum, IEntrance } from '../../../core/declares/entrance';
import { Wait } from '../../../core/libs';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

async function loadingActivities(): Promise<Error> {
  log.location = 'loadingActivities()';

  try {
    appConfig.societies.forEach((society) => {
      const societyManager = tsv.societies.addOne(society) as ISociety;

      if (societyManager.isCompagny) {
        society.societies.forEach((society) => {
          tsv.zones.addOne({
            name: `building-${society.name}`,
            module: 'activity',
            polygon: society.building,
            onEnter: (user: User) => onEnterBuilding(user, society),
            onLeave: onLeaveBuilding,
          } as PolyZoneType);

          society.entrances.forEach((entrance) => tsv.entrances.addOne(entrance));
        });
      }

      tsv.zones.addOne({
        name: `building-${societyManager.name}`,
        module: 'activity',
        polygon: societyManager.building,
      } as PolyZoneType);
    });
  } catch (error) {
    return error;
  }

  // (await tsv.orm.dataSource.manager.find(SocietiesEntity)).map((societyEntity) => {
  //   const society = {
  //     id: societyEntity.id.toString(),
  //     owner: societyEntity.owner.toString(),
  //     name: societyEntity.name,
  //     label: societyEntity.label,
  //     activities: societyEntity.activites.reduce((activities, activity) => {
  //       activities.push({
  //         ...activity,
  //         id: activity.id.toString(),
  //         roles: activity.roles.reduce((roles, role) => {
  //           roles.push({
  //             ...role,
  //             id: role.id.toString(),
  //           });
  //           return roles;
  //         }, [] as ActivityRoleType[]),
  //       });
  //       return activities;
  //     }, []),
  //     building: societyEntity.building,
  //     isCompagny: societyEntity.isCompagny,
  //     societies:
  //       societyEntity.societies &&
  //       societyEntity.societies.reduce((societiesCompagny, societyCompagny) => {
  //         societiesCompagny.push({
  //           id: societyCompagny.id.toString(),
  //           owner: societyCompagny.owner.toString(),
  //           name: societyCompagny.name,
  //           label: societyCompagny.label,
  //           building: societyCompagny.building,
  //           activities: societyCompagny.activites.reduce((activities, activity) => {
  //             activities.push({
  //               ...activity,
  //               id: activity.id.toString(),
  //               roles: [],
  //             });
  //             return activities;
  //           }, [] as ActivityType[]),
  //           isCompagny: false,
  //         });

  //         return societiesCompagny;
  //       }, []),
  //   } as SocietyType;

  //   try {
  //     tsv.societies.addOne(society);
  //   } catch (error) {
  //     if (error instanceof AddOneSocietyError) {
  //       try {
  //         tsv.societies.updateOne({
  //           ...tsv.societies.getOneByName(society.name),
  //           ...Object.entries(society),
  //         });
  //       } catch (error) {
  //         if (error instanceof UpdateOneSocietyError) {
  //           tsv.log.error({
  //             ...log,
  //             message: error.message,
  //           });
  //           return;
  //         }
  //       }
  //     } else {
  //       tsv.log.error({
  //         ...log,
  //         message: error.message,
  //       });
  //     }
  //   }
  // });
}

function onEnterBuilding(user: User, society: SocietyType) {
  tsv.threads.createThread({
    name: 'activity-onEnterBuilding-getDoorProps',
    timer: 1000,
    callback: () => {
      const societyEntrances = tsv.entrances.All.reduce((entrances, entrance) => {
        society.entrances.forEach((societyEntrance) => {
          if (entrance.doors === societyEntrance.doors) {
            entrances.push(entrance);
          }
        });

        return entrances;
      }, [] as IEntrance[]);

      if (
        societyEntrances.filter((entrance) => {
          return entrance.target === undefined;
        }).length === 0
      ) {
        societyEntrances.forEach(
          (entrance) => entrance.state === EntranceStateEnum.CLOSE && entrance.lock(user),
        );
        return false;
      }

      societyEntrances.forEach((entrance) => {
        if (entrance.target === undefined) {
          entrance.getTargetPropsFromClient(user);
          Wait(500);
        }
      });

      return true;
    },
  });
}
function onLeaveBuilding(user: User, society: SocietyType) {
  tsv.events.trigger({
    name: 'removeEntrances',
    module: 'entrance',
    target: user.source,
    data: society.entrances,
  });
}

export { loadingActivities };
