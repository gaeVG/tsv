import { ActivityRoleType, ActivityProductionType } from '.';

type ActivityType = {
  id?: string;
  name: string;
  label?: string;
  isMain?: boolean;
  roles: ActivityRoleType[];
  production: ActivityProductionType;
};

export { ActivityType };
