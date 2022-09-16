import { Entity, Vector3, Crypto, Color } from '../../../core/libs';
import { User } from '../../../core/libs/user';
import { Bucket } from '../bucket';
import { IUser } from '../../../core/declares/user';
import { IZone, ZoneType } from '../../../core/declares/zone';
import { PolyZoneType, EntityZoneType } from '../../../core/declares/zone/types/zone';
import { tsv } from '../..';

abstract class Zone implements IZone {
  id: string;
  name: string;
  module: string;
  points: Vector3[] | Vector3;
  center?: Vector3;
  min?: Vector3;
  max?: Vector3;
  size?: Vector3;
  useGrid?: boolean;
  lazyGrid?: boolean;
  gridDivisions?: number;
  debugPoly?: boolean;
  debugGrid?: boolean;
  color: {
    outline: Color;
    wall: Color;
  };
  bucket?: Bucket;
  users?: IUser[];
  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;

  constructor(zone: ZoneType) {
    this.id = Crypto.uuidv4();
    this.name = zone.name;
    this.points = zone.points;
    this.center = zone.center;
    this.min = zone.min;
    this.max = zone.max;
    this.size = zone.size;
    this.useGrid = zone.useGrid || true;
    this.lazyGrid = zone.lazyGrid || true;
    this.gridDivisions = zone.gridDivisions || 30;
    this.debugPoly = zone.debugPoly || false;
    this.debugGrid = zone.debugGrid || false;
    this.color = zone.color
      ? zone.color
      : {
          outline: new Color(100, 250, 0, 0),
          wall: new Color(100, 250, 0, 0),
        };

    // this.bucket = zone.bucket && zone.bucket;
    this.users = [];
    this.onEnter = (user: User) => {
      this.bucket !== undefined && this.bucket.addUser(user);

      this.addOneUser(user);

      console.log('trigger');
      console.log(user.source);
      tsv.events.trigger({
        name: 'onEnter',
        module: 'zone',
        onNet: true,
        target: user.source,
        data: [zone],
      });

      zone.onEnter && zone.onEnter(user);
    };

    this.onLeave = (user: User) => {
      this.bucket && this.bucket.removeUser(user);
      zone.onLeave && zone.onLeave(user);
    };
  }

  abstract isInside(coords: Vector3): boolean;
  abstract isLeft(...args: Array<Vector3>): number;

  addOneUser(user: IUser): boolean {
    if (this.users.find((u) => u.id === user.id)) {
      return false;
    }

    this.users.push(user);
    return true;
  }
}

class PolyZone extends Zone {
  polygon: Vector3[];
  gridArea: number;
  gridCellWidth: number;
  gridCellHeigth: number;

  private innerLoop(p0: Vector3, p1: Vector3, p2: Vector3, wn: number): number {
    if (p0.y <= p2.y) {
      if (p1.y > p2.y) {
        if (this.isLeft(p0, p1, p2) > 0) {
          return wn + 1;
        }
      }
    } else {
      if (p1.y <= p2.y) {
        if (this.isLeft(p0, p1, p2) < 0) {
          return wn - 1;
        }
      }
    }

    return wn;
  }
  private calculatePolygon() {
    if (
      this.min === undefined ||
      this.max === undefined ||
      this.size === undefined ||
      this.center === undefined
    ) {
      let minX = Number.MAX_SAFE_INTEGER,
        minY = Number.MAX_SAFE_INTEGER,
        minZ = Number.MAX_SAFE_INTEGER;
      let maxX = Number.MIN_SAFE_INTEGER,
        maxY = Number.MIN_SAFE_INTEGER,
        maxZ = Number.MIN_SAFE_INTEGER;

      this.polygon.forEach((point) => {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        minZ = Math.min(minZ, point.z);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
        maxZ = Math.max(maxZ, point.z);
      });

      this.min = new Vector3(minX, minY, minZ);
      this.max = new Vector3(maxX, maxY, maxZ);
      this.size = this.max.subtract(this.min);
      this.center = this.max.add(this.min).divide(2);
    }
  }

  constructor(zone: PolyZoneType) {
    super({
      ...zone,
      points: zone.polygon,
    });
    this.polygon = zone.polygon;
    this.calculatePolygon();
  }

  isInside(coords: Vector3): boolean {
    // Checks if point is within the polygon's bounding box
    if (
      coords.x < this.min.x ||
      coords.x > this.max.x ||
      coords.y < this.min.y ||
      coords.y > this.max.y
    ) {
      return false;
    }
    // Checks if point is within the polygon's height bounds
    if ((this.min.z && coords.z - 1 < this.min.z) || (this.max.z && coords.z - 1 > this.max.z)) {
      return false;
    }

    // Returns true if the grid cell associated with the point is entirely inside the poly
    // if (this.useGrid) {
    //   const gridPosX = coords.x - this.min.x;
    //   const gridPosY = coords.y - this.min.y;
    //   const gridCellX = gridPosX * this.gridDivisions; // size.x
    //   const gridCellY = gridPosY * this.gridDivisions; // size.y
    //   //   const gridCellValue = grid[gridCellY + 1][gridCellX + 1]

    //   //   if gridCellValue == nil and poly.lazyGrid then
    //   //     gridCellValue = _isGridCellInsidePoly(gridCellX, gridCellY, poly)
    //   //     grid[gridCellY + 1][gridCellX + 1] = gridCellValue
    //   //   end
    //   //   if gridCellValue then return true end
    //   // end
    // }

    let wn = 0;

    for (let i = 0; i < this.polygon.length - 1; i++) {
      wn = this.innerLoop(this.polygon[i], this.polygon[i + 1], coords, wn);
    }
    wn = this.innerLoop(this.polygon[this.polygon.length - 1], this.polygon[0], coords, wn);
    return wn !== 0;
  }
  isLeft(p0: Vector3, p1: Vector3, p2: Vector3): number {
    return (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
  }
}
class EntityZone extends Zone {
  entity: Entity;

  constructor(zone: EntityZoneType) {
    super({
      ...zone,
      points: zone.entity.Position,
    });
    this.entity = zone.entity;
  }

  isInside(coords: Vector3): boolean {
    return false;
  }
  isLeft(p0: Vector3, p1: Vector3, p2: Vector3): number {
    return 0;
  }
}

export { Zone, PolyZone, EntityZone };
