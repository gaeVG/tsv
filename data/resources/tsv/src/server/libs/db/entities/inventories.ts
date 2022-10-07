// Dependencies
import { Column, Entity } from 'typeorm';
// Declarations
import { InventoryType, InventoryContainerType } from '@declares/inventory';
import { ItemType } from '@declares/item';

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
