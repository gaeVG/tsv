import { CursorSprite, HudComponent } from '../enums';
import { Point } from '../utils';

export abstract class Hud {
  public static isComponentActive(component: HudComponent): boolean {
    return global.IsHudComponentActive(Number(component));
  }

  public static showComponentThisFrame(component: HudComponent): void {
    global.ShowHudComponentThisFrame(Number(component));
  }

  public static hideComponentThisFrame(component: HudComponent): void {
    global.HideHudComponentThisFrame(Number(component));
  }

  public static showCursorThisFrame(): void {
    global.ShowCursorThisFrame();
  }

  public static set CursorPosition(position: Point) {
    global.SetCursorLocation(position.X, position.Y);
  }

  public static get CursorSprite(): CursorSprite {
    return CursorSprite.DownArrow;
  }

  public static set CursorSprite(sprite: CursorSprite) {
    global.SetCursorSprite(Number(sprite));
  }

  public static get IsVisible(): boolean {
    return !(global.IsHudHidden() || !global.IsHudPreferenceSwitchedOn());
  }

  public static set IsVisible(toggle: boolean) {
    global.DisplayHud(toggle);
  }

  public static get IsRadarVisible(): boolean {
    return !(global.IsRadarHidden() || global.IsRadarPreferenceSwitchedOn());
  }

  public static set IsRadarVisible(toggle: boolean) {
    global.DisplayRadar(toggle);
  }

  public static set RadarZoom(zoomLevel: number) {
    global.SetRadarZoom(zoomLevel);
  }
}
