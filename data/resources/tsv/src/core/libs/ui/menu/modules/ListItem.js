import { Crypto } from '../../../utils';
export class ListItem {
  constructor(name, value = null) {
    this.id = Crypto.uuidv4();
    this.name = name;
    this.value = value;
  }
}
