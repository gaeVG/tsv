/* eslint-disable no-undef */
import { Audio } from '../Audio';
import { HudColor, NotificationType } from '../enums';
import { Color, Size, String } from '../utils';
import { Notification } from './';
export class Screen {
  static get Resolution() {
    const [width, height] = GetScreenActiveResolution();
    return new Size(width, height);
  }
  static get ScaledResolution() {
    const height = this.Height;
    return new Size(height * this.AspectRatio, height);
  }
  static get Width() {
    return this.Resolution.width;
  }
  static get ScaledWidth() {
    return this.Height * this.AspectRatio;
  }
  static get Height() {
    return this.Resolution.height;
  }
  static get AspectRatio() {
    return GetAspectRatio(false);
  }
  static showSubtitle(message, duration = 2500) {
    const strings = String.stringToArray(message);
    BeginTextCommandPrint('CELL_EMAIL_BCON');
    strings.forEach((element) => {
      AddTextComponentSubstringPlayerName(element);
    });
    EndTextCommandPrint(duration, true);
  }
  static displayHelpTextThisFrame(message) {
    const strings = String.stringToArray(message);
    BeginTextCommandDisplayHelp('CELL_EMAIL_BCON');
    strings.forEach((element) => {
      AddTextComponentSubstringPlayerName(element);
    });
    EndTextCommandDisplayHelp(0, false, false, -1);
  }
  static showNotification(message, blinking = false) {
    const strings = String.stringToArray(message);
    SetNotificationTextEntry('CELL_EMAIL_BCON');
    strings.forEach((element) => {
      AddTextComponentSubstringPlayerName(element);
    });
    return new Notification(DrawNotification(blinking, true));
  }
  static showAdvancedNotification(
    message,
    title,
    subtitle,
    iconSet,
    icon,
    bgColor = HudColor.NONE,
    flashColor = Color.empty,
    blinking = false,
    type = NotificationType.Default,
    showInBrief = true,
    sound = true,
  ) {
    const strings = String.stringToArray(message);
    SetNotificationTextEntry('CELL_EMAIL_BCON');
    strings.forEach((element) => {
      AddTextComponentSubstringPlayerName(element);
    });
    if (bgColor !== HudColor.NONE) {
      SetNotificationBackgroundColor(Number(bgColor));
    }
    if (flashColor !== Color.empty && blinking) {
      SetNotificationFlashColor(flashColor.r, flashColor.g, flashColor.b, flashColor.a);
    }
    if (sound) {
      Audio.playSoundFrontEnd('DELETE', 'HUD_DEATHMATCH_SOUNDSET');
    }
    SetNotificationMessage(iconSet, icon, true, Number(type), title, subtitle);
    return new Notification(DrawNotification(blinking, showInBrief));
  }
  static worldToScreen(position, scaleWidth = false) {
    const coords = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
    return new Size(
      coords[1] * (scaleWidth ? this.ScaledWidth : this.Width),
      coords[2] * this.Height,
    );
  }
}
