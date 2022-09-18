import { Entrance, Door, DoubleDoor, Gate } from './entrance';
import { EntranceType, DoorType, DoubleDoorType, GateType, IEntrance } from '../../declares/entrance';

class EntranceManager {
  manager: Entrance[];

  constructor() {
    this.manager = []
  }

  get All() {
    return this.manager;
  }
  
  addOne(addEntrance: EntranceType): IEntrance {
    let newEntrance: Entrance;

    if (addEntrance.props instanceof Array) {
      newEntrance = new DoubleDoor(addEntrance);
    } else if (addEntrance.isRemote !== undefined) {
      newEntrance = new Gate(addEntrance);
    } else {
      newEntrance = new Door(addEntrance);
    }

    this.manager.push(newEntrance);

    return newEntrance;
  }
  removeOne(door: IEntrance) {
    this.manager = this.manager.filter((d) => d.id !== door.id);
  }
  getOne(id: string) {
    return this.manager.find((d) => d.id === id);
  }
  updateOne(door: IEntrance) {
    const index = this.manager.findIndex((d) => d.id === door.id);
    if (index === -1) return;
    this.manager[index] = door;
  }
}

export { EntranceManager };
