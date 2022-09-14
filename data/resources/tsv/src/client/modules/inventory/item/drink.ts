import { ItemType } from '../../../../core/declares/item';
import { UsableItem } from './usableItem';
import { Player, World, Vector3, Bone, Model } from '../../../../core/libs';
import { Wait } from '../../../../core/libs';
import moduleConfig from '../config';
import { EnumLogContainer, LogData } from '../../../../core/declares/log';
import { tsv } from '../../..';

const log: LogData = {
  namespace: moduleConfig.name,
  container: EnumLogContainer.Class,
  isModuleDisplay: moduleConfig.debug,
};

class Drink extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  use() {
    try {
      const player = new Player();

      // TODO: Create a props to attach to the player to make him eat
      // Does not work at the moment
      World.createProp(
        new Model(this.props),
        player.Ped.Position.add(new Vector3(0, 0, 0.2)),
        true,
        false,
      ).then((props) => {
        props.attachToBone(
          player.Ped.Bones.getBone(Bone.SKEL_L_Hand),
          new Vector3(0.12, 0.028, 0.001),
          new Vector3(10.0, 175.0, 0.0),
        );
        player.Ped.Task.playAnimation(
          'mp_player_inteat@burger',
          'mp_player_int_eat_burger_fp',
          8,
          -8,
          -1,
          0,
          49,
        ).then(() => {
          Wait(3000).then(() => {
            // TODO: Update player status thirst
            tsv.events.trigger({
              name: 'statusUpdate',
              module: 'status',
            });
            props.delete();
            player.Ped.Task.clearSecondary();
          });
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

export { Drink };
