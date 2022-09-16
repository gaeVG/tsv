import { Vector3, Crypto, Color } from '../../../core/libs';
import { User } from '../../../core/libs/user';
import { Bucket } from '../bucket';
import { IUser } from '../../../core/declares/user';
import { IZone, ZoneType } from '../../../core/declares/zone';

abstract class Zone implements IZone {
  id: string;
  name: string;
  module: string;
  points: Vector3[] | Vector3;
  center?: Vector3;
  min: Vector3;
  max: Vector3;
  size: Vector3;
  area: number;
  useGrid: boolean;
  lazyGrid: boolean;
  gridDivisions: number;
  debugPoly: boolean;
  debugGrid: boolean;
  color: {
    outline: Color;
    wall: Color;
  };
  bucket?: Bucket;
  users?: IUser[];
  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;

  constructor(zone: ZoneType) {
    if (zone.points instanceof Array && zone.points.length < 3) {
      throw new Error('Zone must have at least 3 points');
    }

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

    if (zone.onEnter)
      this.onEnter = (user: User) => {
        if (this.bucket) {
          this.bucket.addUser(user);
        }
        zone.onEnter(user);
      };
    if (zone.onLeave)
      this.onLeave = (user: User) => {
        if (this.bucket) {
          this.bucket.removeUser(user);
        }
        zone.onLeave(user);
      };
  }

  abstract isInside(coords: Vector3): boolean;
  abstract left(...args: Array<Vector3>): boolean;

  addOneUser(user: IUser): boolean {
    if (this.users.find((u) => u.id === user.id)) {
      return false;
    }

    this.users.push(user);
    return true;
  }
}

class PolyZone extends Zone {
  private innerLoop(p0: Vector3, p1: Vector3, p2: Vector3, i: number): number {
    if (p0.y <= p2.y) {
      if (p1.y > p2.y) {
        if (this.left(p0, p1, p2)) {
          return ++i;
        }
      }
    } else {
      if (p1.y <= p2.y) {
        if (this.left(p0, p1, p2)) {
          return --i;
        }
      }
    }

    return i;
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

      const points = this.points as Vector3[];

      points.forEach((point) => {
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

  constructor(zone: ZoneType) {
    super(zone);
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

    // Returns true if the grid cell associated with the point is entirely inside the poly
    if (this.useGrid) {
      const gridPosX = coords.x - this.min.x;
      const gridPosY = coords.y - this.min.y;
      const gridCellX = gridPosX * this.gridDivisions; // size.x
      const gridCellY = gridPosY * this.gridDivisions; // size.y
      //   const gridCellValue = grid[gridCellY + 1][gridCellX + 1]

      //   if gridCellValue == nil and poly.lazyGrid then
      //     gridCellValue = _isGridCellInsidePoly(gridCellX, gridCellY, poly)
      //     grid[gridCellY + 1][gridCellX + 1] = gridCellValue
      //   end
      //   if gridCellValue then return true end
      // end
    }

    if (this.points instanceof Array) {
      let wn = 0;
      for (let j = 0; j < this.points.length; j++) {
        wn = this.innerLoop(this.points[wn], this.points[++wn], coords, wn);
      }
      wn = this.innerLoop(this.points[wn], this.points[0], coords, wn);

      return wn !== 0;
    }
  }
  left(p0: Vector3, p1: Vector3, p2: Vector3): boolean {
    return (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y) > 0;
  }
}
// class EntityZone extends Zone {
//   constructor(zone: EntityZoneType) {
//     super(zone);
//   }
// }

export { Zone, PolyZone /*EntityZone*/ };
