// Native wrapper
import { Vehicle } from '@native/models/Vehicle';

class VehicleNoSeatAvaibleError extends Error {
  constructor(vehicle: Vehicle) {
    super(`Le véhicule ${vehicle.Handle} est plein`);
    this.name = 'VehicleNoSeatAvaible';
  }
}

export { VehicleNoSeatAvaibleError };
