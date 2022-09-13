import { Model, Player, Vector3, World } from '../../../../core/libs';
import { ItemType } from '../../../../core/declares/item';
import { EnumLogContainer, LogData } from '../../../../core/declares/log';
import { UsableItem } from './usableItem';
import moduleConfig from '../config';
import { tsp } from '../../..';

const log: LogData = {
  namespace: moduleConfig.name,
  container: EnumLogContainer.Class,
  isModuleDisplay: moduleConfig.debug,
};

class Food extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  use() {
    try {
      const player = new Player();

      // TODO: Create a props to attach to the player to make him eat
      // Does not work at the moment
      World.createProp(
        new Model('props'),
        player.Ped.Position.add(new Vector3(0, 0, 0.2)),
        true,
        false,
      ).then((props) => {
        props.attachTo(player.Ped, new Vector3(0.12, 0.028, 0.001), new Vector3(10.0, 175.0, 0.0));

        player.Ped.Task.playAnimation(
          'mp_player_inteat@burger',
          'mp_player_int_eat_burger',
          8.0,
          -8.0,
          -1,
          49,
          0,
        ).then(() => {
          props.delete();
          player.Ped.Task.clearSecondary();
        });
      });
    } catch (error) {
      tsv.log.error({
        ...log,
        message: error.message,
      });
    }
  }
}

export { Food };
