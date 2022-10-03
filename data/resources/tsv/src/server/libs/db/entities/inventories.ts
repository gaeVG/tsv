import { Column, Entity } from 'typeorm';
import { InventoryType, InventoryContainerType } from '../../../../core/declares/inventory';
import { ItemType } from '../../../../core/declares/item';

@Entity()
class Inventories {
  @Column()
  container: InventoryContainerType;

  @Column()
  items: ItemType[];

  constructor(inventory: InventoryType) {
    this.container = inventory.container;
    this.items = inventory.items.map((item) => item);
  }
}

export { Inventories };
