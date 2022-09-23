import { Ped, World, Entity, Pickup, Rope } from '../../../core/libs';

interface IEntity {
  handle: number;
}

function getGamePool(
  pool: 'CPed' | 'CObject' | 'CVehicle' | 'CPickup' | 'CRopes',
): Entity[] | Pickup[] | Rope[] | Error {
  try {
    switch (pool) {
      case 'CPed':
        return World.getAllPeds();
      case 'CObject':
        return World.getAllProps();
      case 'CVehicle':
        return World.getAllVehicles();
      case 'CPickup':
        return World.getAllPickups();
      case 'CRopes':
        return World.getAllRopes();
      default:
        throw new Error('Invalid pool');
    }
  } catch (error) {
    return error;
  }
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
function setEntityFreezePosition(_: string, _entity: IEntity, freeze: boolean): boolean {
  const entity = Entity.fromHandle(_entity.handle);
  entity.IsPositionFrozen = freeze;

  return entity.IsPositionFrozen;
}

export {
  getGamePool,
  getEntityHeading,
  setEntityHeading,
  setEntityHealth,
  setEntityArmor,
  setEntityFreezePosition,
};
