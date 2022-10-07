// Dependencies
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
// Native wrapper
import { Ped, Vehicle } from '@native/models';
import { BlipColor, VehicleSeat } from '@native/enums';
// Declarations
import { VehicleNoSeatAvaibleError } from '@declares/activity';

function getSeatPassenger(vehicle: Vehicle): number | Error {
  if (vehicle.PassengerCount === vehicle.PassengerCapacity) {
    return new VehicleNoSeatAvaibleError(vehicle);
  }

  switch (new DiceRoll('1d3').total) {
    case 1:
      return VehicleSeat.LeftRear;
    case 2:
      return VehicleSeat.RightRear;
    case 3:
      return VehicleSeat.Any;
    default:
      new VehicleNoSeatAvaibleError(vehicle);
  }
}

function setPed(passenger: Ped): Ped {
  passenger.IsMissionEntity = true;
  passenger.Task.clearAll();
  passenger.Task.standStill(1000 * new DiceRoll(this.config.dices.standPed).total);
  passenger.BlockPermanentEvents = true;

  const blipPassenger = passenger.attachBlip();
  blipPassenger.Color = BlipColor.Yellow;
  blipPassenger.Name = 'Client potentiel';

  return passenger;
}

export { getSeatPassenger, setPed };
