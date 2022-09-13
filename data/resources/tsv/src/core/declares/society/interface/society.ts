import { Vector3 } from '../../../libs';
import { ActivitiesManager } from '../../../libs/activity';

interface ISociety {
  id: string;
  name: string;
  label?: string;
  owner: string;
  building: Vector3[];
  activities?: ActivitiesManager;
}

export { ISociety };
