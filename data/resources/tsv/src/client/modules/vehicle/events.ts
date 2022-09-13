import { IEventListener, ClientEventNativeEnum } from '../../../core/declares/events';
import { Vehicle } from '../../../core/libs';
import { playerEnteredVehicle } from './functions';

const vehicleEvents: IEventListener[] = [
  {
    name: ClientEventNativeEnum.gameEventTriggered,
    module: 'vehicle',
    handler: (_, ...args: [string, number[]]): void => {
      const [nativeEventName, nativeEventArgs] = args;
      switch (nativeEventName) {
        case ClientEventNativeEnum.CEventNetworkPlayerEnteredVehicle:
          playerEnteredVehicle(new Vehicle(nativeEventArgs[1]));
          break;
      }
    },
  },
  {
    name: 'repairVehicle',
    module: 'vehicle',
    onNet: true,
    handler: (_, vehicleToRepair: Vehicle): void => {
      const vehicle = new Vehicle(vehicleToRepair.Handle);
      vehicle.IsNetworked = true;
      vehicle.EngineHealth = vehicle.MaxHealth;
      vehicle.BodyHealth = 1000;
      vehicle.PetrolTankHealth = 1000;
      SetVehicleDeformationFixed(vehicle.Handle);
      vehicle.IsEngineRunning = true;
      vehicle.IsDriveable = true;
      vehicle.repair();
      if (!vehicle.Windows.AreAllWindowsIntact) {
        vehicle.Windows.getAllWindows().map((window) => {
          window.repair();
        });
      }
    },
  },
];

export { vehicleEvents };
