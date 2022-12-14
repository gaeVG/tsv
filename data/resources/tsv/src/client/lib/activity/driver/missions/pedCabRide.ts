import { Control, Game, InputMode } from '../../../../../core/libs';
import { ActivityMission } from '../..';
import {
  ActivityMissionStateEnum,
  DriverActivityMissionEnum,
  DriverActivityPlayerNotInVehicleError,
} from '../../../../../core/declares/activity';
import { EnumLogContainer, LogData } from '../../../../../core/declares/log';
import { Ped, Player, Vector3 } from '../../../../../core/libs';
import { driver as driverConfig } from '../../../../../config/societies/activities/driver';
import { getSeatPassenger, setPed } from './functions';
import { tsp } from '../../../..';

const log: LogData = {
  namespace: 'PedCabRide',
  container: EnumLogContainer.Class,
};

class PedCabRide extends ActivityMission {
  constructor(target: Ped) {
    super({
      name: DriverActivityMissionEnum.PED_RIDE,
      target: target,
      location: new Vector3(0, 0, 0),
      time: new Date(),
    });

    this.config = driverConfig.missions.find(
      (mission) => mission.name === DriverActivityMissionEnum.PED_RIDE,
    );

    this.target = setPed(this.target as Ped);
    this.state = ActivityMissionStateEnum.PENDING;
  }

  tick() {
    log.location = 'tick()';

    tsv.log.safemode({ ...log, message: 'Tick de la mission' });
    log.isChild = true;

    tsv.threads.createThread({
      name: `driver-pickup-passenger-${this.targetPed.Handle}`,
      timer: 500,
      callback: () => {
        try {
          const player = new Player();
          if (player.Ped.CurrentVehicle === undefined) {
            throw new DriverActivityPlayerNotInVehicleError(player);
          }

          const distance = player.Ped.Position.distance(this.targetPed.Position);
          if (distance >= this.config.maxDistance) {
            this.targetPed.AttachedBlip.delete();
            this.targetPed.Task.clearAll();
            this.state = ActivityMissionStateEnum.CANCELED;
            return false;
          } else if (distance <= this.config.minDistance) {
            const seat = getSeatPassenger(player.Ped.CurrentVehicle) as number;

            tsv.log.safemode({
              ...log,
              message: 'Le ped entre dans le v??hicule',
            });

            this.targetPed.Task.enterAnyVehicle(seat);
            this.state = ActivityMissionStateEnum.ONGOING;

            return false;
          } else if (
            distance <= Math.floor(this.config.minDistance + this.config.minDistance * 0.75)
          ) {
            if (Game.isControlPressed(InputMode.MouseAndKeyboard, Control.VehicleHorn)) {
              tsv.log.safemode({
                ...log,
                message: 'Vous klaxonnez',
              });

              if (this.targetPed.TaskSequenceProgress === -1) {
                console.log('aucun s??quence en cours');
                this.targetPed.Task.goToEntity(player.Ped.CurrentVehicle);
              } else {
                console.log(this.targetPed.TaskSequenceProgress);
              }
            }
          }

          return true;
        } catch (error) {
          if (error instanceof Error) {
            tsv.log.error({
              ...log,
              message: error.message,
            });
          }

          this.state = null;

          return false;
        }
      },
    });
  }
}

export { PedCabRide };
