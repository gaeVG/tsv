import { Player, Model, Vector3, World } from '../../../../core/libs';
import { ItemType } from '../../../../core/declares/item';
import { EnumLogContainer, LogData } from '../../../../core/declares/log';
import { UsableItem } from './usableItem';
import moduleConfig from '../config';
import { tsv } from '../../..';

const log: LogData = {
  namespace: moduleConfig.name,
  container: EnumLogContainer.Class,
  isModuleDisplay: moduleConfig.debug,
};

type MetadataKey = {
  targetHash: number;
  targetPosition: Vector3;
};

class Key extends UsableItem {
  metadata?: MetadataKey;

  constructor(item: ItemType) {
    super(item);
    this.metadata = item.metadata as MetadataKey;
  }

  use() {
    console.log('use');
    try {
      const metadata = {
        targetHash: this.metadata.targetHash as number,
        targetPosition: new Vector3(
          this.metadata.targetPosition.x as number,
          this.metadata.targetPosition.y as number,
          this.metadata.targetPosition.z as number,
        ),
      } as MetadataKey;

      const player = new Player();
      const model = new Model('prop_bin_01a');

      if (!metadata.targetHash) {
        throw new Error('No target hash');
      }
      const target = World.getClosestObject(model, player.Ped.Position, 3, false);

      console.log(target.Position.distance(metadata.targetPosition));
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
