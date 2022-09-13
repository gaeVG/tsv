/* eslint-disable no-undef */
import { Entity, Model, Color } from '..';
import cfx from '../cfx';
import { Ped } from './';
export class Player {
  /**
   * @param handle the player handle, or if on the server, their source.
   */
  constructor(handle = -1) {
    this.pvp = false;
    this.stateBagCookies = [];
    this.handle = handle;
    if (!IsDuplicityVersion()) {
      this.PvPEnabled = true;
    }
  }
  static fromPedHandle(handle) {
    return new Player(NetworkGetPlayerIndexFromPed(handle));
  }
  static fromServerId(serverId) {
    return new Player(GetPlayerFromServerId(serverId));
  }
  get Handle() {
    return this.handle;
  }
  /**
   * This is here for compatibility with older versions.
   */
  get Character() {
    return this.Ped;
  }
  get Ped() {
    const handle = GetPlayerPed(this.handle);
    if (typeof this.ped === 'undefined' || handle !== this.ped.Handle) {
      this.ped = new Ped(handle);
    }
    return this.ped;
  }
  get ServerId() {
    return GetPlayerServerId(this.handle);
  }
  get State() {
    return cfx.Player(this.ServerId).state;
  }
  AddStateBagChangeHandler(keyFilter, handler) {
    // keyFilter is casted to any because it can take a null value.
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const cookie = AddStateBagChangeHandler(keyFilter, `player:${this.ServerId}`, handler);
    this.stateBagCookies.push(cookie);
    return cookie;
  }
  /**
   * A short hand function for AddStateBagChangeHandler, this gets automatically cleaned up on entity deletion.
   * @param keyFilter the key to filter for or null
   * @param handler the function to handle the change
   * @returns a cookie to be used in RemoveStateBagChangeHandler
   */
  listenForStateChange(keyFilter, handler) {
    return this.AddStateBagChangeHandler(keyFilter, handler);
  }
  removeStateListener(tgtCookie) {
    this.stateBagCookies = this.stateBagCookies.filter((cookie) => {
      const isCookie = cookie == tgtCookie;
      if (isCookie) RemoveStateBagChangeHandler(cookie);
      return isCookie;
    });
  }
  removeAllStateListeners() {
    for (const cookie of this.stateBagCookies) {
      RemoveStateBagChangeHandler(cookie);
    }
  }
  get Name() {
    return GetPlayerName(this.handle);
  }
  get PvPEnabled() {
    return this.pvp;
  }
  set PvPEnabled(value) {
    NetworkSetFriendlyFireOption(value);
    SetCanAttackFriendly(this.Character.Handle, value, value);
    this.pvp = value;
  }
  get IsDead() {
    return IsPlayerDead(this.handle);
  }
  // Should this even be here?
  // public set DisableFiring(value: boolean) {
  //   DisablePlayerFiring(this.handle, value);
  // }
  get EntityPlayerIsAimingAt() {
    const [entityHit, entity] = GetEntityPlayerIsFreeAimingAt(this.handle);
    if (entityHit) {
      return Entity.fromHandle(entity);
    }
    return null;
  }
  get StealthNoise() {
    return GetPlayerCurrentStealthNoise(this.handle);
  }
  get FakeWantedLevel() {
    return GetPlayerFakeWantedLevel(this.handle);
  }
  get PlayerGroup() {
    return GetPlayerGroup(this.handle);
  }
  get HasReserveParachute() {
    return GetPlayerHasReserveParachute(this.handle);
  }
  get HealthRechargeLimit() {
    return GetPlayerHealthRechargeLimit(this.handle);
  }
  get IsInvincible() {
    if (IsDuplicityVersion()) {
      return GetPlayerInvincible(this.handle);
    } else {
      return GetPlayerInvincible_2(this.handle);
    }
  }
  get MaxArmor() {
    return GetPlayerMaxArmour(this.handle);
  }
  get ParachuteModelOverride() {
    return new Model(GetPlayerParachuteModelOverride(this.handle));
  }
  get ParachutePackTintIndex() {
    return GetPlayerParachutePackTintIndex(this.handle);
  }
  get ParachuteTintIndex() {
    return GetPlayerParachuteTintIndex(this.handle);
  }
  get ParachuteColorTrailColor() {
    return Color.fromArray(GetPlayerParachuteSmokeTrailColor(this.handle));
  }
  get ReserveParachuteModelOverride() {
    return new Model(GetPlayerReserveParachuteModelOverride(this.handle));
  }
  get ReserveParachuteTintIndex() {
    return GetPlayerReserveParachuteTintIndex(this.handle);
  }
  get PlayerRgbColour() {
    return Color.fromArray(GetPlayerRgbColour(this.handle));
  }
  get Stamina() {
    return GetPlayerSprintStaminaRemaining(this.handle);
  }
  get SprintTimeRemaining() {
    return GetPlayerSprintStaminaRemaining(this.handle);
  }
  /**
   * The players melee target?
   */
  get TargetEntity() {
    const [entityHit, entity] = GetPlayerTargetEntity(this.handle);
    if (entityHit) {
      return Entity.fromHandle(entity);
    }
    return null;
  }
  get Team() {
    return GetPlayerTeam(this.handle);
  }
  // GetPlayerUnderwaterTimeRemaining
  CanPedHearPlayer(ped) {
    return CanPedHearPlayer(this.handle, ped.Handle);
  }
}
