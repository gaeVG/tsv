import { Model, Vector3, World } from '../../../../core/libs';
import { ItemType } from '../../../../core/declares/item';
import { EnumLogContainer, LogData } from '../../../../core/declares/log';
import { DoorType, EntranceStateStype } from '../../../../core/declares/entrance';
import { UsableItem } from './usableItem';
import moduleConfig from '../config';
import { tsv } from '../../..';

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

  use() {
    try {
      const toggleEntrance = tsv.events.trigger({
        name: 'toggleEntrance',
        module: 'entrance',
        onNet: true,
        isCallback: true,
        data: Array.isArray(this.metadata)
          ? this.metadata.map((door) =>
              World.getClosestObject(
                new Model(door.hash),
                new Vector3(door.coords.x, door.coords.y, door.coords.z),
                3,
                false,
              ),
            )
          : [
              World.getClosestObject(
                new Model(this.metadata.hash),
                new Vector3(this.metadata.coords.x, this.metadata.coords.y, this.metadata.coords.z),
                3,
                false,
              ),
            ],
      }) as Promise<[boolean, EntranceStateStype]>;

      toggleEntrance.then(([isEntranceStateChange, entranceState]) => {
        if (isEntranceStateChange) {
          console.log(entranceState);
        }
      });
    } catch (error) {
      console.log(error.message);
      tsv.log.error({
        ...log,
        message: error.message,
      });
    }
  }
}

export { Key };
