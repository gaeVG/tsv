// Native wrapper
import { Prop } from '@native/models';
// Declarations
import { IUser } from '@declares/user';
import { ISociety, SocietyType } from '@declares/society';
import { LogData, EnumLogContainer } from '@declares/log';
import { EntranceStateEnum, IEntrance } from '@declares/entrance';
// Module
import { getTargetProp, toggleEntrance } from '../entrance';
import config from './config';
// Societies config
import societies from '@config/societies';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.name.charAt(0).toUpperCase() + config.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: config.debug,
};

/**
 * Load all the societies
 * @returns
 */
async function loadingActivities(): Promise<Error> {
  log.location = 'loadingActivities()';

  try {
    societies.forEach((society) => {
      const societyManager = tsv.societies.addOne(society) as ISociety;

      if (societyManager.isCompagny && society.societies.length > 0) {
        society.societies.forEach((compagnySociety) => {
          tsv.zones.addOne({
            ...compagnySociety.building.zone,
            name: `building-${compagnySociety.building.zone.name}`,
            onEnter: (user: IUser) => onEnterBuilding(user, compagnySociety),
            onLeave: (user: IUser) => onLeaveBuilding(user, compagnySociety),
          });
          compagnySociety.building.entrances.forEach((entrance) => tsv.entrances.addOne(entrance));
        });
      } else {
        tsv.zones.addOne({
          ...societyManager.building.zone,
          name: `building-${societyManager.name}`,
          onEnter: (user: IUser) => onEnterBuilding(user, society),
          onLeave: (user: IUser) => onLeaveBuilding(user, society),
        });
        society.building.entrances.forEach((entrance) => tsv.entrances.addOne(entrance));
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      tsv.log.error({
        ...log,
        message: error.message,
      });
    }
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
/**
 * When player enter in a building
 * @param {IUser} user
 * @param {SocietyType} society
 */
function onEnterBuilding(user: IUser, society: SocietyType): void {
  // Recover all the entrances of the society
  const societyEntrances = tsv.entrances.All.reduce((entrances, entrance) => {
    society.building.entrances.forEach((societyEntrance) => {
      if (entrance.doors === societyEntrance.doors) {
        entrances.push(entrance);
      }
    });

    return entrances;
  }, [] as IEntrance[]);

  societyEntrances.forEach(async (entrance) => {
    try {
      if (entrance.target === undefined) {
        let targetProps: Prop | Prop[];

        if (Array.isArray(entrance.doors)) {
          const entranceProps = [] as Prop[];
          entrance.doors.forEach(async (door) => {
            const targetProp = await getTargetProp(door, user);
            if (targetProp instanceof Error) {
              throw targetProp;
            }
            entranceProps.push(targetProp);
          });
          targetProps = entranceProps;
        } else {
          targetProps = (await getTargetProp(entrance.doors, user)) as Prop;
        }
        const entranceManager = tsv.entrances.updateOne({ id: entrance.id, target: targetProps });
        if (entranceManager instanceof Error) {
          throw entranceManager;
        }

        const entranceState = await toggleEntrance(entranceManager, EntranceStateEnum.CLOSE, user);
        if (entranceState instanceof Error) {
          throw entranceState;
        }
      } else {
        //toggleEntrance(entrance, EntranceStateEnum.CLOSE, user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('une erreur est survenue');
        tsv.log.error({
          ...log,
          message: error.message,
        });
      }
    }
  });
}
/**
 * When player exit a building zone
 * @param {IUser} user
 * @param {SocietyType} society
 */
function onLeaveBuilding(user: IUser, society: SocietyType) {
  const societyEntrances = tsv.entrances.All.reduce((entrances, entrance) => {
    society.building.entrances.forEach((societyEntrance) => {
      if (entrance.doors === societyEntrance.doors) {
        entrances.push(entrance);
      }
    });

    return entrances;
  }, [] as IEntrance[]);

  societyEntrances.forEach(async (entrance) => {
    try {
      const entranceState = await toggleEntrance(entrance, EntranceStateEnum.OPEN, user);
      if (entranceState instanceof Error) {
        throw entranceState;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('une erreur est survenue');
        tsv.log.error({
          ...log,
          message: error.message,
        });
      }
    }
  });
}

export { loadingActivities };
