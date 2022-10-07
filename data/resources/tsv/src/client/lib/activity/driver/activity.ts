// Native wrapper
import { Ped, Player } from '@native/models';
// Declarations
import {
  ActivityEnum,
  UserActivityType,
  DriverActivityTargetTooFarAwayError,
} from '@declares/activity';
import { IUser } from '@declares/user';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { Activity } from '..';
// Activity
import { driverEvents } from './events';
import { PedCabRide } from './missions';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: 'Activity',
  container: EnumLogContainer.Manager,
};

class Driver extends Activity {
  passengers: Ped[];

  constructor(activity: UserActivityType) {
    if (activity.job !== ActivityEnum.DRIVER) {
      return;
    }

    super({
      for: activity.for,
      job: ActivityEnum.DRIVER,
      role: activity.role,
    });
    this.onDuty = true;
    this.passengers = [];
  }

  init() {
    driverEvents.forEach((event) => tsv.events.listen(event));
  }
  addPassenger(passenger: Ped | IUser) {
    log.location = 'addPassenger()';

    try {
      if (passenger instanceof Ped) {
        if (!this.passengers.find((ped) => ped.Handle === passenger.Handle)) {
          this.currentMission = new PedCabRide(passenger);
        }
      } else {
        console.log(passenger.Name);
      }

      const player = new Player();
      if (
        !this.currentMission.targetPed.Position.distance(player.Ped.Position) >=
        this.currentMission.config.maxDistance
      ) {
        throw new DriverActivityTargetTooFarAwayError(this.currentMission.targetPed, player.Ped);
      }

      this.passengers.push(this.currentMission.targetPed);
      this.currentMission.tick();
    } catch (error) {
      if (error instanceof Error) {
        tsv.log.error({
          ...log,
          message: error.message,
        });
      }
    }
  }
}

export { Driver };
