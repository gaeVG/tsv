import { Model, Player, Vector3, Wait, World } from '../../../../core/libs';
import { ItemType, IItem, ItemShouldNoLongerExistError } from '../../../../core/declares/item';
import { EnumLogContainer, LogData } from '../../../../core/declares/log';
import { UsableItem } from './usableItem';
import moduleConfig from '../config';
import { tsv } from '../../..';
import { Bone } from '../../../../core/libs/enums/Bone';
import { InventoryFromType } from '../../../../core/declares/inventory';

const log: LogData = {
  namespace: moduleConfig.name,
  container: EnumLogContainer.Class,
  isModuleDisplay: moduleConfig.debug,
};

class Food extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  async use(container: InventoryFromType): Promise<IItem | Error> {
    log.location = 'use(food)';

    try {
      const food = await this.consumeItem(container);
      if (food.name === 'ItemShouldNoLongerExistError') {
        throw new ItemShouldNoLongerExistError(this);
      }

      tsv.log.safemode({ ...log, message: `Consommation de la nouriture ${this.name}` });
      const player = new Player();

      // Create a props to attach to the player to make him eat
      const props = await World.createProp(
        new Model(this.props),
        player.Ped.Position.add(new Vector3(0, 0, 0.2)),
        true,
        false,
      );

      // Attach the props to the bone player
      props.attachToBone(
        player.Ped.Bones.getBone(Bone.SKEL_L_Hand),
        new Vector3(0.12, 0.028, 0.001),
        new Vector3(10.0, 175.0, 0.0),
      );
      // Play the animation
      await player.Ped.Task.playAnimation(
        'mp_player_inteat@burger',
        'mp_player_int_eat_burger_fp',
        8,
        -8,
        -1,
        0,
        49,
      );
      await Wait(3000);
      // TODO: Update player status hunger
      props.delete();
      player.Ped.Task.clearSecondary();

      return food;
    } catch (error) {
      return error;
    }
  }
}

export { Food };
