/* eslint-disable no-undef */
import { Scaleform } from './Scaleform';
/**
 * Draw native instructional buttons in the bottom left of the screen using scaleform
 *
 * Example:
 *
 * ```typescript
 * import { InstructionalButtons, Control } from '@nativewrappers/client';
 *
 * const buttons = new InstructionalButtons([
 *  {controls: [Control.Context], label: "Interact with Bob"},
 *  {controls: [Control.Detonate], label: "Say hello to Alice"}
 * ])
 *
 * setTick(() => {
 *   buttons.draw()
 * })
 * ```
 */
export class InstructionalButtons {
  /**
   * Draws native instructional buttons
   *
   * @param buttons Array of instructional buttons to be drawn
   */
  constructor(buttons) {
    this.scaleform = new Scaleform('INSTRUCTIONAL_BUTTONS');
    this.scaleform.callFunction('CLEAR_ALL');
    this.scaleform.callFunction('SET_CLEAR_SPACE', 200);
    buttons.forEach((button, index) => {
      this.pushButton(button, index);
    });
    this.scaleform.callFunction('DRAW_INSTRUCTIONAL_BUTTONS');
    this.scaleform.callFunction('SET_BACKGROUND_COLOUR', 0, 0, 0, 80);
  }
  pushButton(button, index) {
    BeginScaleformMovieMethod(this.scaleform.Handle, 'SET_DATA_SLOT');
    PushScaleformMovieFunctionParameterInt(index);
    // Looping backwards here since scaleform is using a stack so the first control ends up being the last
    // So looping backwards makes more sense here so that the controls are rendered in the order they're defined
    for (let i = button.controls.length - 1; i >= 0; i--) {
      PushScaleformMovieMethodParameterButtonName(
        GetControlInstructionalButton(2, button.controls[i], true),
      );
    }
    PushScaleformMovieMethodParameterString(button.label);
    EndScaleformMovieMethod();
  }
  /**
   * Renders the instructional button scaleform
   */
  async draw() {
    await this.scaleform.render2D();
  }
}
