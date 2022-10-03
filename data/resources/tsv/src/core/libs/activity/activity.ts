import { Crypto } from '..';
import { ActivityProductionType, IActivity } from '../../declares/activity';

class Activity implements IActivity {
  id: string;
  name: string;
  label?: string;
  roles: [];
  production: ActivityProductionType;

  constructor(activity: { id?: string; name: string }) {
    this.id = activity.id ? activity.id : Crypto.uuidv4();
    this.name = activity.name;
  }
}
export { Activity };
