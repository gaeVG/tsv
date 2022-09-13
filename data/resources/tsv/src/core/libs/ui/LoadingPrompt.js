/* eslint-disable no-undef */
import { LoadingSpinnerType } from '../enums';
/**
 * Show and hide loading prompt on the bottom right of the screen.
 *
 * Example:
 *
 * ```typescript
 * import { LoadingPrompt } from '@nativewrappers/client/ui';
 *
 * LoadingPrompt.show("Hello World");
 *
 * setTimeout(() => {
 *  LoadingPrompt.hide();
 * }, 10000)'
 * ```
 */
export class LoadingPrompt {
  /**
   * Shows a loading prompt.
   *
   * @param loadingText Text to be displayed inside loading prompt.
   * @param spinnerType Type of spinner.
   */
  static show(loadingText = '', spinnerType = LoadingSpinnerType.RegularClockwise) {
    if (this.IsActive) {
      this.hide();
    }
    if (loadingText === '') {
      BeginTextCommandBusyString('');
    } else {
      BeginTextCommandBusyString('STRING');
      AddTextComponentSubstringPlayerName(loadingText);
    }
    EndTextCommandBusyString(Number(spinnerType));
  }
  static hide() {
    if (this.IsActive) {
      RemoveLoadingPrompt();
    }
  }
  static get IsActive() {
    return IsLoadingPromptBeingDisplayed();
  }
}
