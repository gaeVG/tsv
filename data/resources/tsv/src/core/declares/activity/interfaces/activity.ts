import { IActivityRole } from '.';
import { ActivityProductionType } from '../';

interface IActivity {
  id: string;
  name: string;
  label?: string;
  roles: IActivityRole[];
  production: ActivityProductionType;
}

export { IActivity };
