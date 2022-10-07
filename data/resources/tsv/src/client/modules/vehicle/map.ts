// Native wrapper
import { Scaleform, Vehicle } from '@native//';

enum MinimapNavigationEnum {
  NONE = 0,
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
  EXIT_LEFT = 5,
  EXIT_RIGHT = 6,
  UP_LEFT = 7,
  UP_RIGHT = 8,
  MERGE_RIGHT = 9,
  MERGE_LEFT = 10,
  UTURN = 11,
}

type MinimapNavigationType =
  | MinimapNavigationEnum.NONE
  | MinimapNavigationEnum.UP
  | MinimapNavigationEnum.DOWN
  | MinimapNavigationEnum.LEFT
  | MinimapNavigationEnum.RIGHT
  | MinimapNavigationEnum.EXIT_LEFT
  | MinimapNavigationEnum.EXIT_RIGHT
  | MinimapNavigationEnum.UP_LEFT
  | MinimapNavigationEnum.UP_RIGHT
  | MinimapNavigationEnum.MERGE_RIGHT
  | MinimapNavigationEnum.MERGE_LEFT
  | MinimapNavigationEnum.UTURN;

class Map {
  vehicle: Vehicle;
  minimap: Scaleform;

  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
    this.minimap = new Scaleform('MINIMAP');
  }

  set SatNavDirection(direction: MinimapNavigationType) {
    this.minimap.callFunction('SET_SATNAV_DIRECTION', direction);
  }
  set SatNavDistance(distance: number) {
    this.minimap.callFunction('SET_SATNAV_DISTANCE', distance);
  }
  set SatNavState(show: boolean) {
    this.minimap.callVoidMethod(show ? 'SHOW_SATNAV' : 'HIDE_SATNAV');
  }
  set StallWarningState(show: boolean) {
    this.minimap.callFunction('SHOW_STALL_WARNING', show);
  }
  set AbilityGlow(show: boolean) {
    this.minimap.callFunction('SET_ABILITY_BAR_GLOW', show);
  }
  set AbilityVisible(show: boolean) {
    this.minimap.callFunction('SET_ABILITY_BAR_VISIBLE', show);
  }
  setupHealthArmor(type: number) {
    this.minimap.callFunction('SETUP_HEAL_ARMOR', type);
  }
  set HealthArmorType(type: number) {
    this.minimap.callFunction('SET_HEALTH_ARMOR_TYPE', type);
  }
  set HealthAmount(amount: number) {
    this.minimap.callFunction('SET_HEALTH_BAR', amount, 0, 2000, false);
  }
  set ArmorAmount(amount: number) {
    this.minimap.callFunction('SET_PLAYER_ARMOUR', amount, 0, 2000, false);
  }
  set AbilityAmount(amount: number) {
    this.minimap.callFunction('SET_ABILITY_BAR', amount, 0, 2000, false);
  }
  set AirAmount(amount) {
    this.minimap.callFunction('SET_AIR_BAR', amount, 0, 2000, false);
  }

  // showYoke(position: Vector2, alpha: number) {
  //   BeginScaleformMovieMethod(getMinimap(), 'SHOW_YOKE');
  //   ScaleformMovieMethodAddParamFloat(show);
  //   ScaleformMovieMethodAddParamFloat(show);
  //   ScaleformMovieMethodAddParamBool(show);
  //   ScaleformMovieMethodAddParamInt(alpha);
  //   EndScaleformMovieMethod();
  // }
}

export { Map };
