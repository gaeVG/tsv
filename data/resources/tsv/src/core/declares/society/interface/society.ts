import { ActivitiesManager } from '../../../libs/activity';
import { SocietyBuildingType } from '../types';

interface ISociety {
  id: string;
  name: string;
  label?: string;
  owner: string;
  building: SocietyBuildingType;
  activities?: ActivitiesManager;
  isCompagny: boolean;
  societies?: ISociety[];
}

export { ISociety };
