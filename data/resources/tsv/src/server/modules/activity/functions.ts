import { ISociety } from '../../../core/declares/society';
import { EnumLogContainer } from '../../../core/declares/log';
import appConfig from '../../../config';
import moduleConfig from './config';
import { LogData } from '../../../core/declares/log';
import { tsp } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

async function loadingActivities(): Promise<Error> {
  log.location = 'loadingActivities()';
  try {
    appConfig.societies.map((society) => {
      const societyManager = tsv.societies.addOne(society) as ISociety;
      tsv.zones.addOne({
        name: `building-${societyManager.name}`,
        module: 'activity',
        points: societyManager.building,
      });
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

export { loadingActivities };
