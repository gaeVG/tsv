import { Vector3 } from './utils';
import { BlipColor, BlipSprite } from './enums';
import { Entity, Player } from './models';
export declare class Blip {
  protected handle: number;
  constructor(handle: number);
  get Handle(): number;
  get Position(): Vector3;
  set Position(location: Vector3);
  set Rotation(rotation: number);
  set Scale(scale: number);
  get Type(): number;
  get Alpha(): number;
  set Alpha(alpha: number);
  set Priority(priority: number);
  set NumberLabel(number: number);
  get Color(): BlipColor;
  set Color(color: BlipColor);
  get Sprite(): BlipSprite;
  set Sprite(sprite: BlipSprite);
  set Display(display: number);
  set Name(name: string);
  setNameToPlayerName(player: Player): void;
  get Entity(): Entity | null;
  set ShowHeadingIndicator(show: boolean);
  set ShowRoute(show: boolean);
  set IsFriendly(friendly: boolean);
  set IsFriend(friend: boolean);
  set IsCrew(crew: boolean);
  get IsFlashing(): boolean;
  set IsFlashing(flashing: boolean);
  get IsOnMinimap(): boolean;
  get IsShortRange(): boolean;
  set IsShortRange(shortRange: boolean);
  removeNumberLabel(): void;
  delete(): void;
  exists(): boolean;
}
