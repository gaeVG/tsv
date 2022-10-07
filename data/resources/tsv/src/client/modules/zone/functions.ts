// Native wrapper
import { Player, Vector3, Color, World } from '@native//';
// Declarations
import { IZone } from '@declares/zone';
// Core
import { tsv } from '../..';

let currentZone: IZone;

function DrawWall(p1: Vector3, p2: Vector3, minZ: number, maxZ: number, color: Color) {
  const bottomLeft = new Vector3(p1.x, p1.y, minZ);
  const topLeft = new Vector3(p1.x, p1.y, maxZ);
  const bottomRight = new Vector3(p2.x, p2.y, minZ);
  const topRight = new Vector3(p2.x, p2.y, maxZ);

  World.drawPoly(bottomLeft, topLeft, bottomRight, color);
  World.drawPoly(topLeft, topRight, bottomRight, color);
  World.drawPoly(bottomRight, topRight, topLeft, color);
  World.drawPoly(bottomRight, topLeft, bottomLeft, color);
}

function DrawPolygon(zone: IZone) {
  const zDrawDist = 45.0;
  const player = new Player();
  const minZ = zone.min.z || player.Ped.Position.z - zDrawDist;
  const maxZ = zone.max.z || player.Ped.Position.z + zDrawDist;
  const points = zone.points as Vector3[];

  points.forEach((point, i) => {
    global.DrawLine(point.x, point.y, minZ, point.x, point.y, maxZ, 0, 255, 0, 164);

    if (i < points.length - 1) {
      const p2 = points[i + 1];
      World.drawLine(
        new Vector3(point.x, point.y, maxZ),
        new Vector3(p2.x, p2.y, maxZ),
        new Color(184, 0, 255, 0),
      );
      DrawWall(point, p2, zone.min.z, zone.max.z, new Color(0, 0, 255, 0));
    }
  });

  if (points.length > 2) {
    const firstPoint = points[1];
    const lastPoint = points[points.length - 1];
    global.DrawLine(
      firstPoint.x,
      firstPoint.y,
      maxZ,
      lastPoint.x,
      lastPoint.y,
      maxZ,
      0,
      255,
      0,
      184,
    );
    DrawWall(firstPoint, lastPoint, minZ, maxZ, new Color(0, 0, 255, 0));
  }
}

function onEnter(_source: string, zone: IZone) {
  currentZone = zone;

  tsv.threads.createThread({
    name: 'inside-zone',
    timer: 8,
    isDUIThread: true,
    callback: () => {
      if (currentZone === undefined) {
        return false;
      }
      DrawPolygon(zone);

      return true;
    },
  });
}
function onLeave(_source: string, zone: IZone) {
  if (currentZone.id !== zone.id) {
    return;
  }

  currentZone = undefined;
}

export { onEnter, onLeave };
