import { Audio } from '../Audio';
import { HudColor, NotificationType } from '../enums';
import { Color, Size, String, Vector3 } from '../utils';
import { Notification } from '.';

export abstract class Screen {
  public static get Resolution(): Size {
    const [width, height] = global.GetScreenActiveResolution();
    return new Size(width, height);
  }

  public static get ScaledResolution(): Size {
    const height = this.Height;
    return new Size(height * this.AspectRatio, height);
  }

  public static get Width(): number {
    return this.Resolution.width;
  }

  public static get ScaledWidth(): number {
    return this.Height * this.AspectRatio;
  }

  public static get Height(): number {
    return this.Resolution.height;
  }

  public static get AspectRatio(): number {
    return global.GetAspectRatio(false);
  }

  public static showSubtitle(message: string, duration = 2500): void {
    const strings: string[] = String.stringToArray(message);

    global.BeginTextCommandPrint('CELL_EMAIL_BCON');

    strings.forEach((element) => {
      global.AddTextComponentSubstringPlayerName(element);
    });

    global.EndTextCommandPrint(duration, true);
  }

  public static displayHelpTextThisFrame(message: string): void {
    const strings: string[] = String.stringToArray(message);

    global.BeginTextCommandDisplayHelp('CELL_EMAIL_BCON');

    strings.forEach((element) => {
      global.AddTextComponentSubstringPlayerName(element);
    });

    global.EndTextCommandDisplayHelp(0, false, false, -1);
  }

  public static showNotification(message: string, blinking = false): Notification {
    const strings: string[] = String.stringToArray(message);

    global.SetNotificationTextEntry('CELL_EMAIL_BCON');

    strings.forEach((element) => {
      global.AddTextComponentSubstringPlayerName(element);
    });

    return new Notification(global.DrawNotification(blinking, true));
  }

  public static showAdvancedNotification(
    message: string,
    title: string,
    subtitle: string,
    iconSet: string,
    icon: string,
    bgColor: HudColor = HudColor.NONE,
    flashColor: Color = Color.empty,
    blinking = false,
    type: NotificationType = NotificationType.Default,
    showInBrief = true,
    sound = true,
  ): Notification {
    const strings: string[] = String.stringToArray(message);

    global.SetNotificationTextEntry('CELL_EMAIL_BCON');

    strings.forEach((element) => {
      global.AddTextComponentSubstringPlayerName(element);
    });

    if (bgColor !== HudColor.NONE) {
      global.SetNotificationBackgroundColor(Number(bgColor));
    }

    if (flashColor !== Color.empty && blinking) {
      global.SetNotificationFlashColor(flashColor.r, flashColor.g, flashColor.b, flashColor.a);
    }

    if (sound) {
      Audio.playSoundFrontEnd('DELETE', 'HUD_DEATHMATCH_SOUNDSET');
    }

    global.SetNotificationMessage(iconSet, icon, true, Number(type), title, subtitle);
    return new Notification(global.DrawNotification(blinking, showInBrief));
  }

  public static worldToScreen(position: Vector3, scaleWidth = false): Size {
    const coords = global.GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
    return new Size(
      coords[1] * (scaleWidth ? this.ScaledWidth : this.Width),
      coords[2] * this.Height,
    );
  }
}
