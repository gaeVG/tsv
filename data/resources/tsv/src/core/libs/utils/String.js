/* eslint-disable no-undef */
import { Font, Screen, Text } from '..';
import { Maths } from './Maths';
export class String {
  static stringToArray(input) {
    let stringsNeeded = 1;
    if (input.length > 99) {
      stringsNeeded = Math.ceil(input.length / 99);
    }
    const outputString = new Array(stringsNeeded);
    for (let i = 0; i < stringsNeeded; i++) {
      outputString[i] = input.substring(
        i * 99,
        i * 99 + Maths.clamp(input.substring(i * 99).length, 0, 99),
      );
    }
    return outputString;
  }
  static measureStringWidthNoConvert(input, font = Font.ChaletLondon, scale = 0) {
    SetTextEntryForWidth('STRING');
    Text.addLongString(input);
    SetTextFont(font);
    SetTextScale(1, scale);
    return GetTextScreenWidth(false);
  }
  static measureString(str, font, scale, screenWidth = Screen.ScaledWidth) {
    return this.measureStringWidthNoConvert(str, font, scale) * screenWidth;
  }
}
