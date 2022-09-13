export class MenuControl {
  constructor(enabled = true) {
    this._enabled = enabled;
  }
  get Enabled() {
    return this._enabled;
  }
  set Enabled(value) {
    this._enabled = value;
  }
}
