import { Vehicle } from './Vehicle';
import {
  VehicleColor,
  VehicleModType,
  VehicleNeonLight,
  VehiclePaintType,
  VehicleToggleModType,
  VehicleWheelType,
  VehicleWindowTint,
} from '../enums';
import { VehicleMod } from './VehicleMod';
import { Color } from '../utils';
import { LicensePlateStyle, LicensePlateType } from '../enums/Vehicle';
import { VehicleToggleMod } from './VehicleToggleMod';
export declare class VehicleModCollection {
  private _owner;
  private readonly _vehicleMods;
  private readonly _vehicleToggleMods;
  constructor(owner: Vehicle);
  hasVehicleMod(type: VehicleModType): boolean;
  getMod(modType: VehicleModType): VehicleMod | undefined;
  getToggleMod(modType: VehicleToggleModType): VehicleToggleMod | undefined;
  getAllMods(): (VehicleMod | null | undefined)[];
  get WheelType(): VehicleWheelType;
  set WheelType(type: VehicleWheelType);
  installModKit(): void;
  get Livery(): number | undefined;
  set Livery(value: number | undefined);
  get LiveryCount(): number;
  get WindowTint(): VehicleWindowTint;
  set WindowTint(tint: VehicleWindowTint);
  get PrimaryColor(): VehicleColor;
  set PrimaryColor(color: VehicleColor);
  get SecondaryColor(): VehicleColor;
  set SecondaryColor(color: VehicleColor);
  get RimColor(): VehicleColor;
  set RimColor(color: VehicleColor);
  get PearlescentColor(): VehicleColor;
  set PearlescentColor(color: VehicleColor);
  set TrimColor(color: VehicleColor);
  set DashboardColor(color: VehicleColor);
  setModColor1(paintType: VehiclePaintType, color: VehicleColor): void;
  setModColor2(paintType: VehiclePaintType, color: VehicleColor): void;
  get ColorCombination(): number;
  set ColorCombination(value: number);
  get ColorCombinationCount(): number;
  get TireSmokeColor(): Color;
  set TireSmokeColor(color: Color);
  get NeonLightsColor(): Color;
  set NeonLightsColor(color: Color);
  isNeonLightsOn(light: VehicleNeonLight): boolean;
  setNeonLightsOn(light: VehicleNeonLight, on: boolean): void;
  areAllNeonLightsOn(): boolean;
  setAllNeonLightsOn(on: boolean): void;
  get HasAllNeonLights(): boolean;
  hasNeonLight(light: VehicleNeonLight): boolean;
  get CustomPrimaryColor(): Color;
  set CustomPrimaryColor(color: Color);
  get CustomSecondaryColor(): Color;
  set CustomSecondaryColor(color: Color);
  get IsPrimaryColorCustom(): boolean;
  get IsSecondaryColorCustom(): boolean;
  clearCustomPrimaryColor(): void;
  clearCustomSecondaryColor(): void;
  get LicensePlateStyle(): LicensePlateStyle;
  set LicensePlateStyle(style: LicensePlateStyle);
  get LicensePlateType(): LicensePlateType;
  get LicensePlate(): string;
  set LicensePlate(text: string);
}
