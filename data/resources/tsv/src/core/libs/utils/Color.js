export class Color {
  constructor(a = 255, r, g, b) {
    this.a = a;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  static fromArgb(a, r, g, b) {
    return new Color(a, r, g, b);
  }
  static fromRgb(r, g, b) {
    return new Color(255, r, g, b);
  }
  static fromArray(primitive) {
    return new Color(255, primitive[0], primitive[1], primitive[2]);
  }
}
Color.empty = new Color(0, 0, 0, 0);
Color.transparent = new Color(0, 0, 0, 0);
Color.black = new Color(255, 0, 0, 0);
Color.white = new Color(255, 255, 255, 255);
Color.whiteSmoke = new Color(255, 245, 245, 245);
