// Dependencies
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
// Native wrapper
import { VehicleHash, Player, Model, Ped, Vector3 } from '@native//';
// Declarations
import { ActivityEnum } from '@declares/activity';
import { DriverActivityMissionEnum } from '@declares/activity';
import { EnumLogContainer, LogData } from '@declares/log';
// App config
import { driver as driverConfig } from '@config/societies/activities/driver';
// Module
import { Driver } from './activity';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: 'DriverActivity',
  container: EnumLogContainer.Function,
};

// Vehicles driver hash
const vehicleDriverHash = [VehicleHash.Taxi];

/**
 * Function behind the native `populationPedCreating` event checking the conditions necessary to start the activity
 * @param _source The source of the event
 * @param x The x position of the ped
 * @param y The y position of the ped
 * @param z The z position of the ped
 * @param pedModel The model of the ped
 */
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

  if (new DiceRoll(missionConfig.dices.lookingForPed).total >= missionConfig.dices.pedFound) {
    tsv.log.safemode({
      ...log,
      message: 'Client sélectionné',
    });

    activity.addPassenger(pedProspect);
  }
}

export { populationPedCreating };
