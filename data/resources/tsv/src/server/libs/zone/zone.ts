import { Entity, Vector3, Crypto, Color, Vector2 } from '../../../core/libs';
import { User } from '../../../core/libs/user';
import { Bucket } from '../bucket';
import { IUser } from '../../../core/declares/user';
import { IZone, ZoneType } from '../../../core/declares/zone';
import { PolyZoneType, EntityZoneType, CircleZoneType } from '../../../core/declares/zone';
import { tsv } from '../..';

abstract class Zone implements IZone {
  id: string;
  name: string;
  module: string;
  points: Vector3[] | Vector3;
  center?: Vector3;
  min?: Vector3;
  max?: Vector3;
  size?: number;
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

      tsv.events.trigger({
        name: 'onEnter',
        module: 'zone',
        onNet: true,
        target: user.source,
        data: [this],
      });

      zone.onEnter && zone.onEnter(user);
    };

    this.onLeave = (user: User) => {
      console.log('on quitte');
      this.bucket && this.bucket.removeUser(user);

      this.removeOneUser(user);

      tsv.events.trigger({
        name: 'onLeave',
        module: 'zone',
        onNet: true,
        target: user.source,
        data: [this],
      });

      zone.onLeave && zone.onLeave(user);
    };
  }

  abstract isInside(coords: Vector3): boolean;

  addOneUser(user: IUser): boolean {
    if (this.users.find((u) => u.id === user.id)) {
      return false;
    }

    this.users.push(user);
    return true;
  }
  removeOneUser(user: IUser): boolean {
    const users = this.users.filter((u) => u.id !== user.id);

    if (users.length === this.users.length) {
      return false;
    }
    console.log(this.users.length);
    this.users = users;
    console.log(this.users.length);

    return true;
  }
}

class PolyZone extends Zone {
  polygon: Vector3[];
  gridArea: number;
  gridCellWidth: number;
  gridCellHeigth: number;

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
      //this.size = this.max.subtract(this.min).n;
      this.center = this.max.add(this.min).divide(2);
    }
  }
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
  private isLeft(p0: Vector3, p1: Vector3, p2: Vector3): number {
    return (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
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
    if ((this.min.z && coords.z < this.min.z) || (this.max.z && coords.z > this.max.z)) {
      return false;
    }

    let wn = 0;

    for (let i = 0; i < this.polygon.length - 1; i++) {
      wn = this.innerLoop(this.polygon[i], this.polygon[i + 1], coords, wn);
    }
    wn = this.innerLoop(this.polygon[this.polygon.length - 1], this.polygon[0], coords, wn);
    return wn !== 0;
  }
}
class CircleZone extends Zone {
  diameter: number;
  limitHeight: boolean;

  constructor(zone: CircleZoneType) {
    super({
      ...zone,
      points: zone.center,
      size: zone.size,
    });
    this.diameter = zone.size * 2;
    this.limitHeight = zone.limitHeight;
  }

  isInside(coords: Vector3): boolean {
    if (this.limitHeight) {
      return (this.points as Vector3).subtract(this.center).Length < this.size;
    } else {
      const points = this.points as Vector3;
      return new Vector2(points.x, points.y).distance(coords) < this.size;
    }
  }
}
class EntityZone extends CircleZone {
  entity: Entity;

  constructor(zone: EntityZoneType) {
    super({
      ...zone,
      center: zone.entity.Position,
      size: zone.size,
      limitHeight: true,
    });
    this.entity = zone.entity;
  }
}

export { Zone, PolyZone, CircleZone, EntityZone };
