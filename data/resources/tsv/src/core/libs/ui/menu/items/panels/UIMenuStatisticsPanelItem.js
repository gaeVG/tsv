import { Color, Crypto, Point, Size } from '../../../../utils';
import { Rectangle, Text } from '../../../';
import { Alignment, Font } from '../../../../enums';
export class UIMenuStatisticsPanelItem {
  constructor(name, percentage = 0) {
    this.id = Crypto.uuidv4();
    this.divider = [];
    this.text = new Text('', new Point(), 0.35, Color.white, Font.ChaletLondon, Alignment.Left);
    this.backgroundBar = new Rectangle(
      new Point(),
      new Size(200, 10),
      Color.fromArgb(100, 87, 87, 87),
    );
    this.activeBar = new Rectangle(new Point(), new Size(0, 10), Color.white);
    for (let i = 1; i <= 4; i++) {
      this.divider.push(new Rectangle(new Point(), new Size(2, 10), Color.black));
    }
    this.Name = name;
    this.Percentage = percentage;
  }
  get Name() {
    return this.text.caption;
  }
  set Name(value) {
    this.text.caption = value ? value.trim() : '';
  }
  get Percentage() {
    return this.activeBar.size.width / 200;
  }
  set Percentage(value) {
    value = value || 0;
    value = Math.round(value * 100) / 100;
    value = value < 0 ? 0 : value > 1 ? 1 : value;
    this.activeBar.size.width = value * 200;
  }
}
