import { ActivityType } from '@declares/activity';
import { SocietyBuildingType } from '@declares/society';

type SocietyType = {
  id?: string;
  owner?: string;
  name: string;
  label?: string;
  building: SocietyBuildingType;
  activities?: ActivityType[];
  isCompagny?: boolean;
  societies?: SocietyType[];
};

export { SocietyType };
