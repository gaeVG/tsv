import { Zone } from './zone';
import { ZoneType, IZone } from '../../../core/declares/zone';

class ZoneManager {
  manager: Zone[];

  constructor() {
    this.manager = [];
  }

  get All() {
    return this.manager;
  }

  getOne(name: string): IZone | null {
    const zone = this.manager.find((zone) => zone.name === name);

    if (zone === undefined) {
      return null;
    }

    return zone;
  }
  addOne(zone: ZoneType): IZone {
    const addZone = new Zone(zone);
    this.manager.push(addZone);

    return addZone;
  }
  removeOne(removeZone: IZone): boolean {
    const manager = this.manager.filter((zone) => removeZone.id !== zone.id);

    if (manager.length < this.manager.length) {
      this.manager = manager;
      return true;
    }

    return false;
  }
  updateOne(updateZone: IZone) {
    const zone = this.manager.find((zone) => zone.id === zone.id);

    if (zone === undefined) {
      return null;
    }

    this.manager = this.manager.reduce((manager: Zone[], zoneManager) => {
      if (updateZone.id === zoneManager.id) {
        Object.entries(updateZone).forEach(([key, value]) => {
          zoneManager[key] = value;
        });
      }

      manager.push(zoneManager);

      return manager;
    }, []);
  }
}

export { ZoneManager };
