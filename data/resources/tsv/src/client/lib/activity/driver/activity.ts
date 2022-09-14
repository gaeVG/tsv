import {
  ActivityEnum,
  UserActivityType,
  DriverActivityTargetTooFarAwayError,
} from '../../../../core/declares/activity';
import { LogData, EnumLogContainer } from '../../../../core/declares/log';
import { Ped, Player } from '../../../../core/libs';
import { Activity } from '..';
import { driverEvents } from './events';
import { tsv } from '../../..';
import { IUser } from '../../../../core/declares/user';
import { PedCabRide } from './missions';

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
