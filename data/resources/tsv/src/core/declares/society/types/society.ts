import { ActivityType } from '../../activity';
import { SocietyBuildingType } from './building';

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
