import { Entity, Prop, Vector3 } from '../../../core/libs';
import { ISociety, SocietyType } from '../../../core/declares/society';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { PolyZoneType } from '../../../core/declares/zone';
import {
  DoorType,
  EntranceStateEnum,
  IEntrance,
  EntranceToogleStateError,
} from '../../../core/declares/entrance';
import { User } from '../../../core/libs/user';
import moduleConfig from './config';
import appConfig from '../../../config';
import { tsv } from '../..';
import { IUser } from '../../../core/declares/user';

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

/**
 * Find the prop inside the GamePool
 * @param {DoorType} door
 * @returns The found prop
 */
async function getTargetProp(door: DoorType, user: IUser): Promise<Prop | Error> {
  try {
    const pedGamePool = await (tsv.events.trigger({
      name: 'getGamePool',
      module: 'entity',
      target: user.source,
      data: ['CPed'],
    }) as Promise<{ handle: number }[] | Error>);

    if (pedGamePool instanceof Error) {
      throw pedGamePool;
    }

    let targetProp: Prop;

    pedGamePool.every((pedPool) => {
      const prop = Entity.fromHandle(pedPool.handle) as Prop;

      if (prop.Position === new Vector3(door.coords.x, door.coords.y, door.coords.z)) {
        targetProp = prop;
        return false;
      }
    });

    return targetProp;
  } catch (error) {
    return error;
  }
}
function onEnterBuilding(user: User, society: SocietyType) {
  tsv.threads.createThread({
    name: 'activity-onEnterBuilding-getDoorProps',
    timer: 1000,
    callback: () => {
      // Recover all the entrances of the society
      const societyEntrances = tsv.entrances.All.reduce((entrances, entrance) => {
        society.entrances.forEach((societyEntrance) => {
          if (entrance.doors === societyEntrance.doors) {
            entrances.push(entrance);
          }
        });

        return entrances;
      }, [] as IEntrance[]);

      if (societyEntrances.filter((entrance) => entrance.target === undefined).length === 0) {
        // All the targets are filled in, now apply states lock

        try {
          societyEntrances.forEach(
            (entrance) =>
              entrance.state === EntranceStateEnum.CLOSE &&
              entrance.lock(user).then((entranceState) => {
                if (entranceState === EntranceStateEnum.CLOSE) {
                  throw new EntranceToogleStateError(entrance);
                }
              }),
          );
        } catch (error) {
          if (error instanceof Error) {
            tsv.log.error({
              ...log,
              message: error.message,
            });
          }
        }

        return false;
      }

      societyEntrances.forEach(async (entrance) => {
        if (entrance.target === undefined) {
          let targetProps: Prop | Prop[];

          if (Array.isArray(entrance.doors)) {
            entrance.doors.forEach(async (door) => {
              (targetProps as Prop[]).push((await getTargetProp(door, user)) as Prop);
            });
          } else {
            targetProps = (await getTargetProp(entrance.doors, user)) as Prop;
          }

          tsv.entrances.updateOne({
            ...entrance,
            target: targetProps,
          });
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
