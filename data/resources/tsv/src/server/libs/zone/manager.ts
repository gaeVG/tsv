// Declarations
import { CircleZoneType, IZone } from '@declares/zone';
import { EntityZoneType, PolyZoneType } from '@declares/zone';
// Zone classes
import { CircleZone, EntityZone, PolyZone, Zone } from './zone';

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
  addOne(zone: PolyZoneType | EntityZoneType | CircleZoneType): IZone {
    let addZone: Zone;

    if ((zone as PolyZoneType).polygon) {
      addZone = new PolyZone(zone as PolyZoneType);
    } else if ((zone as EntityZoneType).entity) {
      addZone = new EntityZone(zone as EntityZoneType);
    } else if ((zone as CircleZoneType).size) {
      addZone = new CircleZone(zone as CircleZoneType);
    }

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
