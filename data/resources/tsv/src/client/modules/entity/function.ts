import { Ped } from '../../../core/libs';
import { Entity } from '../../../core/libs/models';

interface IEntity {
  handle: number;
}

function getEntityHeading(_: string, entity: IEntity): number {
  return Entity.fromHandle(entity.handle).Heading;
}
function setEntityHeading(_: string, _entity: IEntity, heading: number, timeRotation?: number) {
  const entity = Entity.fromHandle(_entity.handle);

  if (timeRotation !== undefined) {
    for (let i = 0; i < timeRotation; i + (entity.Heading * timeRotation) / heading) {
      if (entity.Heading < heading) {
        entity.Heading += 1;
      } else {
        entity.Heading -= 1;
      }
    }
  } else {
    entity.Heading = heading;
  }

  return entity.Heading;
}
function setEntityHealth(_: string, _entity: IEntity, health: number): number {
  const entity = Entity.fromHandle(_entity.handle);
  entity.Health = health;

  return entity.Health;
}
function setEntityArmor(_: string, _entity: IEntity, armor: number): number {
  const entity = Entity.fromHandle(_entity.handle);
  (entity as Ped).Armor = armor;

  return (entity as Ped).Armor;
}

export { getEntityHeading, setEntityHeading, setEntityHealth, setEntityArmor };
