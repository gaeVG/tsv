import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { VehicleHash, Player, Model, Ped } from '../../../../core/libs';
import { Driver } from './activity';
import { tsv } from '../../../';
import { ActivityEnum } from '../../../../core/declares/activity';
import { driver as driverConfig } from '../../../../config/societies/activities/driver';
import { DriverActivityMissionEnum } from '../../../../core/declares/activity';
import { EnumLogContainer, LogData } from '../../../../core/declares/log';
import { Vector3 } from 'three';

const log: LogData = {
  namespace: 'DriverActivity',
  container: EnumLogContainer.Function,
};

const vehicleDriverHash = [VehicleHash.Taxi];

function populationPedCreating(_source: string, x: number, y: number, z: number, pedModel: string) {
  const player = new Player();
  if (
    player.Ped.Position.distance(new Vector3(x, y, z)) >=
    driverConfig.missions.find((mission) => mission.name === DriverActivityMissionEnum.PED_RIDE)
      .maxDistance
  )
    return;

  const activity = tsv.activities.getOneByJobName(ActivityEnum.DRIVER) as Driver;
  if (!activity.onDuty) return;

  if (activity.currentMission !== undefined && !activity.currentMission.available) return;

  const vehiclePlayer = new Player().Ped.CurrentVehicle;
  if (!vehiclePlayer) return;

  // Operator >> allows to make a binary shift to the right (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Right_shift)
  // https://www.se7ensins.com/forums/threads/ref-gta-v-vehicle-hashes-list-2.1615439/
  if (!vehicleDriverHash.map((hash) => hash >> 0).includes(vehiclePlayer.Model.Hash)) return;

  const model = new Model(pedModel);
  if (!model.IsPed) return;

  const propectHandle = GetGamePool('CPed').find(
    (pedHanle: number) => new Ped(pedHanle).Model.Hash === model.Hash,
  );
  if (propectHandle === undefined) return;

  const pedProspect = new Ped(propectHandle);
  if (pedProspect.isInAnyVehicle()) return;

  const missionConfig = driverConfig.missions.find(
    (mission) => mission.name === DriverActivityMissionEnum.PED_RIDE,
  );

  if (new DiceRoll(missionConfig.dices.foundPed).total >= 28) {
    tsv.log.safemode({
      ...log,
      message: 'Client sélectionné',
    });

    activity.addPassenger(pedProspect);
  }
}

export { populationPedCreating };
