/// <reference types="@citizenfx/client" />
import { Blip } from '../Blip';
import { ForceType } from '../enums';
import { MaterialHash, WeaponHash } from '../hashes';
import { Model } from '../Model';
import { Quaternion, Vector3 } from '../utils';
import { EntityBoneCollection, Ped, Prop, Vehicle } from './';
import { EntityBone } from './EntityBone';
import { StateBagChangeHandler } from '../cfx';
import { Player } from '..';
export declare class Entity {
  static fromHandle(handle: number): Ped | Vehicle | Prop | null;
  static fromNetworkId(networkId: number): Ped | Vehicle | Prop | null;
  protected handle: number;
  protected bones: EntityBoneCollection | undefined;
  protected stateBagCookies: number[];
  constructor(handle: number);
  get Handle(): number;
  /**
   * @returns if the entity is a networked entity or local entity
   */
  get IsNetworked(): boolean;
  set IsNetworked(networked: boolean);
  get NetworkId(): number;
  get IsNetworkConcealed(): boolean;
  set IsNetworkConcealed(concealed: boolean);
  get State(): StateBagInterface;
  AddStateBagChangeHandler(keyFilter: string | null, handler: StateBagChangeHandler): number;
  /**
   * A short hand function for AddStateBagChangeHandler, this gets automatically cleaned up on entity deletion.
   * @param keyFilter the key to filter for or null
   * @param handler the function to handle the change
   * @returns a cookie to be used in RemoveStateBagChangeHandler
   */
  listenForStateChange(keyFilter: string | null, handler: StateBagChangeHandler): number;
  removeStateListener(tgtCookie: number): void;
  get Owner(): number;
  isPlayerOwner(player: Player): boolean;
  get Speed(): number;
  get ForwardVector(): Vector3;
  getSpeedVector(isRelative?: boolean): Vector3;
  get Matrix(): Vector3[];
  set Matrix(vectors: Vector3[]);
  get Health(): number;
  set Health(amount: number);
  get MaxHealth(): number;
  set MaxHealth(amount: number);
  set IsDead(value: boolean);
  get IsDead(): boolean;
  get IsAlive(): boolean;
  /**
   * @deprecated use [[IsDead]] instead
   */
  isDead(): boolean;
  /**
   * @deprecated use [[IsAlive]] instead
   */
  isAlive(): boolean;
  get Model(): Model;
  /**
   * Returns if the entity is set as a mission entity and will not be cleaned up by the engine
   */
  get IsMissionEntity(): boolean;
  /**
   * Sets if the entity is a mission entity and will not be cleaned up by the engine
   */
  set IsMissionEntity(value: boolean);
  get Position(): Vector3;
  set Position(position: Vector3);
  set PositionNoOffset(position: Vector3);
  get Rotation(): Vector3;
  set Rotation(rotation: Vector3);
  get Quaternion(): Quaternion;
  set Quaternion(quaternion: Quaternion);
  get Heading(): number;
  set Heading(heading: number);
  get IsPositionFrozen(): boolean;
  set IsPositionFrozen(value: boolean);
  get Velocity(): Vector3;
  set Velocity(velocity: Vector3);
  get RotationVelocity(): Vector3;
  set MaxSpeed(value: number);
  set HasGravity(value: boolean);
  get HeightAboveGround(): number;
  get SubmersionLevel(): number;
  get LodDistance(): number;
  set LodDistance(value: number);
  get IsVisible(): boolean;
  set IsVisible(value: boolean);
  get IsOccluded(): boolean;
  get IsOnScreen(): boolean;
  get IsUpright(): boolean;
  get IsUpsideDown(): boolean;
  get IsInAir(): boolean;
  get IsInWater(): boolean;
  /**
   * @deprecated use [[IsMissionEntity]] instead as its more obvious as what it does
   */
  get IsPersistent(): boolean;
  /**
   * @deprecated use [[IsMissionEntity]] instead as its more obvious as what it does
   */
  set IsPersistent(value: boolean);
  get IsOnFire(): boolean;
  set IsInvincible(value: boolean);
  set IsOnlyDamagedByPlayer(value: boolean);
  get Opacity(): number;
  /**
   * Sets how transparent an entity is, if you want to reset the alpha level use [[resetOpacity]] instead;
   */
  set Opacity(value: number);
  resetOpacity(): void;
  get HasCollided(): boolean;
  get MaterialCollidingWith(): MaterialHash; // TODO : Utiliser cette fonction pour planter où on veut
  get IsCollisionEnabled(): boolean;
  set IsCollisionEnabled(value: boolean);
  set IsRecordingCollisions(value: boolean);
  get Bones(): EntityBoneCollection;
  get AttachedBlip(): Blip | null;
  attachBlip(): Blip;
  setNoCollision(entity: Entity, toggle: boolean): void;
  hasClearLosToEntity(entity: Entity, traceType?: number): boolean;
  hasClearLosToEntityInFront(entity: Entity): boolean;
  hasBeenDamagedBy(entity: Entity): boolean;
  hasBeenDamagedByWeapon(weapon: WeaponHash): boolean;
  hasBeenDamagedByAnyWeapon(): boolean;
  hasBeenDamagedByAnyMeleeWeapon(): boolean;
  clearLastWeaponDamage(): void;
  isInArea(minBounds: Vector3, maxBounds: Vector3): boolean;
  isInAngledArea(origin: Vector3, edge: Vector3, angle: number): boolean;
  isInRangeOf(position: Vector3, range: number): boolean;
  isNearEntity(entity: Entity, bounds: Vector3): boolean;
  isTouching(entity: Entity): boolean;
  isTouchingModel(model: Model): boolean;
  /**
   * @param offset: the amount to offset from the entity
   * @returns the offset position from the entity in world coords
   */
  getOffsetPosition(offset: Vector3): Vector3;
  getPositionOffset(worldCoords: Vector3): Vector3;
  attachTo(
    entity: Entity,
    position: Vector3,
    rotation: Vector3,
    collisions?: boolean,
    unk9?: boolean,
    useSoftPinning?: boolean,
    rotationOrder?: number,
  ): void;
  attachToBone(
    entityBone: EntityBone,
    position: Vector3,
    rotation: Vector3,
    collisions?: boolean,
    unk9?: boolean,
    useSoftPinning?: boolean,
    rotationOrder?: number,
  ): void;
  detach(): void;
  isAttached(): boolean;
  isAttachedTo(entity: Entity): boolean;
  getEntityAttachedTo(): Ped | Vehicle | Prop | null;
  applyForce(direction: Vector3, rotation: Vector3, forceType?: ForceType): void;
  applyForceRelative(direction: Vector3, rotation: Vector3, forceType?: ForceType): void;
  /**
   * Removes all particle effects from the entity
   */
  removePtfxEffects(): void;
  /**
   * @deprecated use [[removePtfxEffects]]
   */
  removeAllParticleEffects(): void;
  exists(): boolean;
  delete(): void;
  /**
   * @deprecated use [[IsMissionEntity]] setter as false instead.
   */
  markAsNoLongerNeeded(): void;
}
