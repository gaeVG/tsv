import { Entity, Vector3, Crypto, Color } from '../../../core/libs';
import config from '../../../config';
import { User } from '../../../core/libs/user';
import { Bucket } from '../bucket';
import { IUser } from '../../../core/declares/user';
import { IZone, ZoneType } from '../../../core/declares/zone';
import { EntityZoneType } from '../../../core/declares/zone/types/zone';

class Zone implements IZone {
  id: string;
  name: string;
  module: string;
  color: {
    outline: Color;
    wall: Color;
  };
  min: Vector3;
  max: Vector3;
  points: Vector3[] | Vector3 | Entity;
  radius?: boolean;
  bucket?: Bucket;
  users?: IUser[];
  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;

  static drawWall(p1: Vector3, p2: Vector3, borderHight?: number, borderColor?: Color) {
    const pBorder = borderHight ? borderHight : 3;
    const bottomLeft = p1.add(new Vector3(0, 0, -1.5));
    const topLeft = p1.add(new Vector3(0, 0, pBorder));
    const bottomRight = p2.add(new Vector3(0, 0, -1.5));
    const topRight = p2.add(new Vector3(0, 0, pBorder));
    const pBorderColor = borderColor ? borderColor : new Color(100, 0, 255, 0);

    DrawPoly(
      bottomLeft.x,
      bottomLeft.y,
      bottomLeft.z,
      topLeft.x,
      topLeft.y,
      topLeft.z,
      bottomRight.x,
      bottomRight.y,
      bottomRight.z,
      pBorderColor.r,
      pBorderColor.g,
      pBorderColor.b,
      pBorderColor.a,
    );
    DrawPoly(
      topLeft.x,
      topLeft.y,
      topLeft.z,
      topRight.x,
      topRight.y,
      topRight.z,
      bottomRight.x,
      bottomRight.y,
      bottomRight.z,
      pBorderColor.r,
      pBorderColor.g,
      pBorderColor.b,
      pBorderColor.a,
    );
    DrawPoly(
      bottomRight.x,
      bottomRight.y,
      bottomRight.z,
      topRight.x,
      topRight.y,
      topRight.z,
      topLeft.x,
      topLeft.y,
      topLeft.z,
      pBorderColor.r,
      pBorderColor.g,
      pBorderColor.b,
      pBorderColor.a,
    );
    DrawPoly(
      bottomRight.x,
      bottomRight.y,
      bottomRight.z,
      topLeft.x,
      topLeft.y,
      topLeft.z,
      bottomLeft.x,
      bottomLeft.y,
      bottomLeft.z,
      pBorderColor.r,
      pBorderColor.g,
      pBorderColor.b,
      pBorderColor.a,
    );
  }

  constructor(zone: ZoneType) {
    this.id = Crypto.uuidv4();
    this.name = zone.name;
    this.color = zone.color
      ? zone.color
      : {
          outline: new Color(100, 250, 0, 0),
          wall: new Color(100, 250, 0, 0),
        };
    this.min = new Vector3(0, 0, 0);
    this.max = new Vector3(0, 0, 0);
    this.points = zone.points;
    this.radius = zone.radius && zone.radius;
    this.bucket = zone.bucket && zone.bucket;

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

  addOneUser(user: IUser): boolean {
    if (this.users.find((u) => u.id === user.id)) {
      return false;
    }

    this.users.push(user);
    return true;
  }
  isInsidePolygon(coords: Vector3, borderHight?: number): boolean {
    const drawIt = process.env.DEBUG_MODULES.split(', ').includes('zone');
    const polygons = this.points as Vector3[];
    let j = polygons.length;
    let oddNodes = false;

    polygons.map((point, i) => {
      let p2: Vector3;

      if (i < j && drawIt) {
        p2 = polygons[i + 1];
        Zone.drawWall(point, p2, borderHight);
      }

      if (
        point.y < coords.y &&
        polygons[j].y >= coords.y &&
        polygons[j].y < coords.y &&
        point.y >= coords.y
      ) {
        if (
          point.x + ((coords.y - point.y) / (polygons[j].y - point.x)) * (polygons[j].x - point.x) <
          coords.x
        ) {
          oddNodes = !oddNodes;
        }
      }

      j = i;
    });

    if (polygons.length > 2 && drawIt) {
      const firstPoint = polygons[0];
      const lastPoint = polygons[polygons.length];
      Zone.drawWall(firstPoint, lastPoint);
    }

    return oddNodes;
  }
}
class PolyZone extends Zone {
  constructor(zone: ZoneType) {
    super(zone);
  }
}
class EntityZone extends Zone {
  constructor(zone: EntityZoneType) {
    super(zone);
  }
}

export { Zone, PolyZone, EntityZone };
