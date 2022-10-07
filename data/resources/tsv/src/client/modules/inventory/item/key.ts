// Native wrapper
import { Model, Vector3, World } from '@native//';
// Declarations
import { ItemType } from '@declares/item';
import { EnumLogContainer, LogData } from '@declares/log';
import { DoorType, EntranceStateEnum, EntranceStateStype } from '@declares/entrance';
// Abstract class
import { UsableItem } from './usableItem';
// Module
import moduleConfig from '../config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: moduleConfig.name,
  container: EnumLogContainer.Class,
  isModuleDisplay: moduleConfig.debug,
};

class Key extends UsableItem {
  metadata?: DoorType | DoorType[];

  constructor(item: ItemType) {
    super(item);
    this.metadata = item.metadata as DoorType | DoorType[];
  }

  async use() {
    log.location = 'use(key)';

    try {
      tsv.log.debug({
        ...log,
        message: 'Trigger the server callback event to attempt to open a entrance',
      });
      log.isChild = true;

      let entranceState: EntranceStateStype;
      let entranceDoor: DoorType | DoorType[];

      if (Array.isArray(this.metadata)) {
        entranceDoor = this.metadata.reduce((entrance, currentData) => {
          const object = World.getClosestObject(
            new Model(currentData.hash),
            new Vector3(currentData.coords.x, currentData.coords.y, currentData.coords.z),
            3,
            false,
          );

          entranceState = object.IsPositionFrozen
            ? EntranceStateEnum.OPEN
            : EntranceStateEnum.CLOSE;

          return [...entrance, { hash: object.Model.Hash }];
        }, [] as DoorType[]);
      } else {
        const coords = new Vector3(
          this.metadata.coords.x,
          this.metadata.coords.y,
          this.metadata.coords.z,
        );
        const prop = World.getAllProps().find(
          (poolProp) => coords.distance(poolProp.Position) <= 1,
        );

        entranceState = prop.IsPositionFrozen ? EntranceStateEnum.OPEN : EntranceStateEnum.CLOSE;
        entranceDoor = { hash: prop.Model.Hash };
      }

      const isEntranceStateChange = await (tsv.events.trigger({
        name: 'toggleEntrance',
        module: 'entrance',
        onNet: true,
        isCallback: true,
        data: [entranceDoor, entranceState],
      }) as Promise<boolean | Error>);

      if (typeof isEntranceStateChange === 'object') {
        throw new Error('Unable to change the entrance state');
      }

      console.log(isEntranceStateChange);

      // if (isEntranceStateChange) {
      //   console.log(entranceState);
      // }
    } catch (error) {
      if (error instanceof Error) {
        tsv.log.error({
          ...log,
          message: error.message,
        });
      }
      return error;
    }
  }
}

export { Key };
