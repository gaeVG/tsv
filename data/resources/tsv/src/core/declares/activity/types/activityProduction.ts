// Activity declarations
import { ActivityProductionEnum } from '..';

type ActivityProductionType =
  | ActivityProductionEnum.PUBLIC
  | ActivityProductionEnum.PRIVATE
  | ActivityProductionEnum.AGRICOLE
  | ActivityProductionEnum.CRIME
  | ActivityProductionEnum.GOVERNEMENT
  | ActivityProductionEnum.TRANSPORT;

export { ActivityProductionType };
