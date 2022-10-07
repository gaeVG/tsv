// Activity declarations
import { ActivityProductionType, IActivityRole } from '..';

interface IActivity {
  id: string;
  name: string;
  label?: string;
  roles: IActivityRole[];
  production: ActivityProductionType;
}

export { IActivity };
