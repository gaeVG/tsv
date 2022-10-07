// Declarations
import { SocietyBuildingType } from '@declares/society';
// Core libs
import { ActivitiesManager } from '@libs/activity';

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
