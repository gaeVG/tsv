import { Point, Size } from '../utils';
import { Screen } from './';
export class Rectangle {
  constructor(pos, size, color) {
    this.pos = pos;
    this.size = size;
    this.color = color;
    this.arg1, this.arg2;
  }
  draw(arg1, arg2, color, resolution) {
    resolution = color === undefined ? arg2 : resolution;
    resolution = resolution || new Size(Screen.ScaledWidth, Screen.Height);
    if (color === undefined) {
      if (arg1 && arg1 instanceof Size) {
        this.arg1 = new Point(this.pos.X + arg1.width, this.pos.Y + arg1.height);
      } else {
        this.arg1 = this.pos;
      }
      this.arg2 = this.size;
    } else {
      if (!arg1) {
        this.arg1 = this.pos;
      } else {
        this.arg1 = arg1;
      }
      this.arg2 = arg2 || this.size;
    }
    color = color || this.color;
    const w = this.arg2.width / resolution.width;
    const h = this.arg2.height / resolution.height;
    const x = this.arg1.X / resolution.width + w * 0.5;
    const y = this.arg1.Y / resolution.height + h * 0.5;
    // eslint-disable-next-line no-undef
    DrawRect(x, y, w, h, color.r, color.g, color.b, color.a);
  }
}
