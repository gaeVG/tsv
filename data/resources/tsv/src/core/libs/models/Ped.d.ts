import { Player, Vector3 } from '../';
import {
  DrivingStyle,
  FiringPattern,
  Gender,
  HelmetType,
  RagdollType,
  SpeechModifier,
  VehicleSeat,
} from '../enums';
import { WeaponHash } from '../hashes';
import { Tasks } from '../Tasks';
import { Entity, PedBoneCollection, Vehicle } from './';
import { WeaponCollection } from '../weapon/WeaponCollection';
export declare class Ped extends Entity {
  static exists(ped: Ped): boolean;
  private pedBones;
  private weapons;
  private readonly speechModifierNames;
  private tasks;
  constructor(handle: number);
  get Player(): Player;
  get Money(): number;
  set Money(amount: number);
  get Gender(): Gender;
  get Armor(): number;
  set Armor(amount: number);
  get Accuracy(): number;
  set Accuracy(accuracy: number);
  get Health(): number;
  set Health(amount: number);
  get MaxHealth(): number;
  set MaxHealth(amount: number);
  set Sweat(value: number);
  set WetnessHeight(value: number);
  set Voice(value: string);
  set ShootRate(value: number);
  get WasKilledByStealth(): boolean;
  get WasKilledByTakedown(): boolean;
  get SeatIndex(): VehicleSeat;
  get CurrentVehicle(): Vehicle | null;
  get LastVehicle(): Vehicle | null;
  get VehicleTryingToEnter(): Vehicle | null;
  get IsJumpingOutOfVehicle(): boolean;
  set StaysInVehicleWhenJacked(value: boolean);
  set MaxDrivingSpeed(value: number);
  get IsHuman(): boolean;
  set IsEnemy(value: boolean);
  set IsPriorityTargetForEnemies(value: boolean);
  get IsPlayer(): boolean;
  get IsCuffed(): boolean;
  get IsWearingHelmet(): boolean;
  get IsRagdoll(): boolean;
  get IsIdle(): boolean;
  get IsProne(): boolean;
  set IsDucking(value: boolean);
  get IsDucking(): boolean;
  get IsGettingUp(): boolean;
  get IsClimbing(): boolean;
  get IsJumping(): boolean;
  get IsFalling(): boolean;
  get IsStopped(): boolean;
  get IsWalking(): boolean;
  get IsRunning(): boolean;
  get IsSprinting(): boolean;
  get IsDiving(): boolean;
  get IsInParachuteFreeFall(): boolean;
  get IsSwimming(): boolean;
  get IsSwimmingUnderWater(): boolean;
  get IsVaulting(): boolean;
  get IsOnBike(): boolean;
  get IsOnFoot(): boolean;
  get IsInSub(): boolean;
  get IsInTaxi(): boolean;
  get IsInTrain(): boolean;
  get IsInHeli(): boolean;
  get IsInPlane(): boolean;
  get IsInFlyingVehicle(): boolean;
  get IsInBoat(): boolean;
  get IsInPoliceVehicle(): boolean;
  get IsJacking(): boolean;
  get IsBeingJacked(): boolean;
  get IsGettingIntoAVehicle(): boolean;
  get IsTryingToEnterALockedVehicle(): boolean;
  get IsInjured(): boolean;
  get IsFleeing(): boolean;
  get IsInCombat(): boolean;
  get IsInMeleeCombat(): boolean;
  get IsInStealthMode(): boolean;
  get IsAmbientSpeechPlaying(): boolean;
  get IsScriptedSpeechPlaying(): boolean;
  get IsAnySpeechPlaying(): boolean;
  get IsAmbientSpeechEnabled(): boolean;
  set IsPainAudioEnabled(value: boolean);
  get IsPlantingBomb(): boolean;
  get IsShooting(): boolean;
  get IsAiming(): boolean;
  get IsReloading(): boolean;
  get IsDoingDriveby(): boolean;
  get IsGoingIntoCover(): boolean;
  get IsBeingStunned(): boolean;
  get IsBeingStealthKilled(): boolean;
  get IsPerformingStealthKill(): boolean;
  get IsAimingFromCover(): boolean;
  isInCover(expectUseWeapon?: boolean): boolean;
  get IsInCoverFacingLeft(): boolean;
  set FiringPattern(value: FiringPattern);
  set DropsWeaponsOnDeath(value: boolean);
  set DrivingSpeed(value: number);
  set DrivingStyle(style: DrivingStyle);
  set IsDrunk(isDrunk: boolean);
  set MotionBlur(value: boolean);
  get Task(): Tasks | undefined;
  get TaskSequenceProgress(): number;
  set BlockPermanentEvents(block: boolean);
  isInAnyVehicle(): boolean;
  isInVehicle(vehicle: Vehicle): boolean;
  isSittingInAnyVehicle(): boolean;
  isSittingInVehicle(vehicle: Vehicle): boolean;
  setIntoVehicle(vehicle: Vehicle, seat: VehicleSeat): void;
  isHeadtracking(entity: Entity): boolean;
  isInCombatAgainst(target: Ped): boolean;
  getJacker(): Ped;
  getJackTarget(): Ped;
  getMeleeTarget(): Ped;
  getKiller(): Entity | null;
  kill(): void;
  resurrect(): void;
  resetVisibleDamage(): void;
  clearBloodDamage(): void;
  get IsInGroup(): boolean;
  set NeverLeavesGroup(value: boolean);
  leaveGroup(): void;
  playAmbientSpeed(speechName: string, voiceName?: string, modifier?: SpeechModifier): void;
  applyDamage(damageAmount: number, armorFirst?: boolean): void;
  hasBeenDamagedByWeapon(weapon: WeaponHash): boolean;
  hasBeenDamagedByAnyWeapon(): boolean;
  hasBeenDamagedByAnyMeleeWeapon(): boolean;
  clearLastWeaponDamage(): void;
  get Bones(): PedBoneCollection;
  /**
   * Ped Weapons
   *
   * @constructor
   */
  get Weapons(): WeaponCollection;
  giveWeapon(weapon: WeaponHash, ammoCount?: number, isHidden?: boolean, equipNow?: boolean): void;
  removeWeapon(weapon: WeaponHash): void;
  removeAllWeapons(): void;
  getLastWeaponImpactPosition(): Vector3;
  get CanRagdoll(): boolean;
  set CanRagdoll(value: boolean);
  ragdoll(duration?: number, ragdollType?: RagdollType): void;
  cancelRagdoll(): void;
  giveHelmet(canBeRemovedByPed: boolean, helmetType: HelmetType, textureIndex: number): void;
  removeHelmet(instantly: boolean): void;
  openParachute(): void;
  getConfigFlag(flagId: number): boolean;
  setConfigFlag(flagId: number, value: boolean): void;
  resetConfigFlag(flagId: number): void;
  clone(): Ped;
  exists(ped?: Ped): boolean;
  setComponentVariation(
    componentId: number,
    drawableId: number,
    textureId: number,
    paletteId?: number,
  ): void;
  setRandomComponentVariation(): void;
  setDefaultComponentVariation(): void;
  getDrawableVariation(componentId: number): number;
  getNumberOfDrawableVariations(componentId: number): number;
  getTextureVariation(componentId: number): number;
  getNumberTextureVariations(componentId: number, drawableId?: number): number;
  setRandomProps(): void;
  setPropIndex(propId: number, drawableId: number, textureId: number, attach?: boolean): void;
  clearProp(propId: number): void;
  clearAllProps(): void;
  knockPropOff(p1: boolean, p2: boolean, p3: boolean, p4: boolean): void;
  isPropValid(propId: number, drawableId: number, textureId: number): boolean;
  getPropIndex(propId: number): number;
  getNumberOfPropDrawableVariations(propId: number): number;
  getNumberOfPropTextureVariations(propId: number, drawableId?: number): number;
  getPropTextureIndex(propId: number): number;
  setHelmetPropIndex(propIndex: number): void;
  setEyeColor(color: number): void;
  getEyeColor(): number;
  setHairColors(primary: number, highlight: number): void;
  setHairColor(color: number): void;
  getHairColor(): number;
  setHairHighlightColor(color: number): void;
  getHairHighlightColor(): number;
  getHeadOverlayNum(overlayId: number): number;
  getHeadOverlayValue(overlayId: number): number;
  setHeadOverlayValue(overlayId: number, value: number): void;
  getHeadOverlay(overlayId: number): [number, number, number, number, number] | void;
  setHeadOverlay(overlayId: number, index: number, opacity: number): void;
  getHeadOverlayOpacity(overlayId: number): number;
  setHeadOverlayOpacity(overlayId: number, opacity: number): void;
  setHeadOverlayColor(overlayId: number, color: number): void;
  setHeadBlend(
    shapeFirstID: number,
    shapeSecondID: number,
    shapeThirdID: number,
    skinFirstID: number,
    skinSecondID: number,
    skinThirdID: number,
    shapeMix: number,
    skinMix: number,
    thirdMix: number,
    isParent?: boolean,
  ): void;
  getHeadBlend():
    | [number, number, number, number, number, number, number, number, number, boolean]
    | void;
  finalizeHeadBlend(): void;
  hasHeadBlendFinished(): boolean;
}
