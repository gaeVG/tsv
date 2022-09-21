import { EntranceType } from '../../entrance';
import { Vector3 } from '../../../libs';
import { ActivityType } from '../../activity';

type SocietyType = {
  id?: string;
  owner?: string;
  name: string;
  label?: string;
  building: Vector3[];
  entrances?: EntranceType[];
  activities?: ActivityType[];
  isCompagny?: boolean;
  societies?: SocietyType[];
};

export { SocietyType };
