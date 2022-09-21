import { DoorType } from '../../../core/declares/entrance';
import { World, Model, Vector3, Prop } from '../../../core/libs';
import { tsv } from '../..';

function getEntranceDoors(_source: string, doors: DoorType | DoorType[]) {
  let target: Prop | Prop[];

  if (Array.isArray(doors)) {
    target = doors.map((door) => {
      const prop = World.getClosestObject(
        new Model(door.hash),
        new Vector3(door.coords.x, door.coords.y, door.coords.z),
      );
      prop.IsMissionEntity = true;
      return prop;
    });
  } else {
    const prop = World.getClosestObject(
      new Model(doors.hash),
      new Vector3(doors.coords.x, doors.coords.y, doors.coords.z),
    );
    prop.IsMissionEntity = true;
    target = prop;
  }

  tsv.threads.createThread({
    name: 'getEntranceDoors',
    timer: 1000,
    callback: () => {
      return true;
    },
  });

  return target;
}

export { getEntranceDoors };
