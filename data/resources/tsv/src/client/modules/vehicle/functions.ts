// Native wrapper
import { Player, Scaleform, Vehicle } from '@native//';
// Declarations
import { LogData } from '@declares/log';
// Module
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Log variables
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: 'function',
  isModuleDisplay: moduleConfig.debug,
};

// Streets names
let streetName1: number, streetName2: number;
let streetHashName1: string, streetHashName2: string;
let previousHashName1: string, previousHashName2: string;

async function setDisplayRadar() {
  log.location = 'setDisplayRadar()';
  tsv.log.safemode({
    ...log,
    message: 'Setting radar display',
  });

  DisplayRadar(true);
  const minimap = new Scaleform('minimap');
  await minimap.load();
  SetMinimapComponentPosition('minimap', 'L', 'B', -0.0045, -0.022, 0.15, 0.2);
  SetMinimapComponentPosition('minimap_mask', 'L', 'B', 0.0, 0.032, 0.101, 0.2);
  SetMinimapComponentPosition('minimap_blur', 'L', 'B', -0.009, -0.008, 0.275, 0.27);

  SetMapZoomDataLevel(0, 0.96, 0.9, 0.08, 0.0, 0.0);
  SetMapZoomDataLevel(1, 1.6, 0.9, 0.08, 0.0, 0.0);
  SetMapZoomDataLevel(2, 8.6, 0.9, 0.08, 0.0, 0.0);
  SetMapZoomDataLevel(3, 12.3, 0.9, 0.08, 0.0, 0.0);
  SetMapZoomDataLevel(4, 24.3, 0.9, 0.08, 0.0, 0.0);
  SetMapZoomDataLevel(5, 55.0, 0.0, 0.1, 2.0, 1.0);
  SetMapZoomDataLevel(6, 450.0, 0.0, 0.1, 1.0, 1.0);
  SetMapZoomDataLevel(7, 4.5, 0.0, 0.0, 0.0, 0.0);
  SetMapZoomDataLevel(8, 11.0, 0.0, 0.0, 2.0, 3.0);

  SetRadarBigmapEnabled(true, false);
  setTimeout(() => {
    SetRadarBigmapEnabled(false, false);
    SetBlipAlpha(GetNorthRadarBlip(), 0);
  }, 8);
}

function displaySpeedoMeter(vehicle: Vehicle): void {
  tsv.nui.trigger({
    module: 'head-up-display',
    name: 'update-speedometer',
    payload: {
      vehicleSpeed:
        vehicle.Acceleration === 1 || vehicle.Acceleration === -1
          ? vehicle.WheelSpeed * 3.6 * vehicle.Acceleration
          : vehicle.WheelSpeed * 3.6,
    },
  });
}
function displayCompass(vehicle: Vehicle): void {
  tsv.nui.trigger({
    module: 'head-up-display',
    name: 'update-compass',
    payload: {
      angle: Math.round(vehicle.Heading),
    },
  });
}
function displayStreetName(player: Player): void {
  const zone = global.GetNameOfZone(
    player.Character.Position.x,
    player.Character.Position.y,
    player.Character.Position.z,
  );

  [streetName1, streetName2] = global.GetStreetNameAtCoord(
    player.Character.Position.x,
    player.Character.Position.y,
    player.Character.Position.z,
  );
  streetHashName1 = global.GetStreetNameFromHashKey(streetName1);
  streetHashName2 = global.GetStreetNameFromHashKey(streetName2);

  const newStreetName = `${streetHashName2}, ${global.GetLabelText(zone)}`;

  if (streetHashName1 !== '') {
    if (streetHashName1 !== previousHashName1 || newStreetName !== previousHashName2) {
      previousHashName1 = streetHashName1;
      previousHashName2 = newStreetName;

      tsv.nui.trigger({
        module: 'head-up-display',
        name: 'update-minimap-streetname',
        payload: {
          streetName: previousHashName1,
          zone: previousHashName2,
        },
      });
    }
  }
}

function vehicleTick(vehicle: Vehicle) {
  const player = new Player();

  if (!player.Ped.isInVehicle(vehicle)) {
    DisplayRadar(false);
    tsv.nui.trigger({
      module: 'head-up-display',
      name: 'player-left-vehicle',
    });

    return false;
  }

  displaySpeedoMeter(vehicle);
  displayCompass(vehicle);
  displayStreetName(player);

  return true;
}
function playerEnteredVehicle(vehicle: Vehicle) {
  tsv.nui.trigger({
    module: 'head-up-display',
    name: 'player-entered-vehicle',
    payload: { model: vehicle.Model },
  });

  setDisplayRadar();

  tsv.threads.createThread({
    name: 'vehicle-manager',
    timer: 64,
    callback: () => vehicleTick(vehicle),
  });

  tsv.threads.createThread({
    name: 'vehicle-component-dui',
    timer: 1,
    isDUIThread: true,
    callback: () => {
      const player = new Player();

      if (Date.now() % 32 === 0 && !player.Ped.isInVehicle(vehicle)) {
        return false;
      }

      global.SetRadarZoom(1100);
      global.HideHudComponentThisFrame(6);
      global.HideHudComponentThisFrame(7);
      global.HideHudComponentThisFrame(8);
      global.HideHudComponentThisFrame(9);

      return true;
    },
  });
}

export { playerEnteredVehicle };
