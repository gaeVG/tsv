// Native wrapper
import { Player, World, Vector3, Bone, Model, Wait } from '@native//';
// Declarations
import { ItemType, IItem, ItemShouldNoLongerExistError } from '@declares/item';
import { InventoryFromType } from '@declares/inventory';
import { EnumLogContainer, LogData } from '@declares/log';
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

class Drink extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  async use(container: InventoryFromType): Promise<IItem | Error> {
    log.location = 'use(drink)';

    try {
      const drink = await this.consumeItem(container);
      if (drink.name === 'ItemShouldNoLongerExistError') {
        throw new ItemShouldNoLongerExistError(this);
      }

      tsv.log.safemode({ ...log, message: `Consommation de la boisson ${this.name}` });
      log.isChild = true;

      const player = new Player();

      // TODO: Correct the rotation of the props
      const prop = await World.createProp(
        new Model(this.props),
        player.Ped.Position.add(new Vector3(0, 0, 0.2)),
        true,
        false,
      );
      prop.attachToBone(
        player.Ped.Bones.getBone(Bone.SKEL_L_Hand),
        new Vector3(0.12, 0.028, 0.001),
        new Vector3(10.0, 175.0, 0.0),
      );
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
      // Update player status thirst
      tsv.events.trigger({
        name: 'statusUpdate',
        module: 'status',
        onNet: true,
        isCallback: true,
        data: [this.effect],
      });
      prop.delete();
      player.Ped.Task.clearSecondary();

      return drink;
    } catch (error) {
      return error;
    }
  }
}

export { Drink };
