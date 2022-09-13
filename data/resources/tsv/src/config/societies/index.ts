import { police } from './police';
import { ems } from './ems';
import { downtownCab } from './downtownCab';
import { bennys } from './bennys';
import { pacificStandard } from './pacificStandard';
import { SocietyType } from '../../core/declares/society';

export default [
  // COMPAGNIES
  police,
  ems,
  // SOCIETIES
  downtownCab,
  bennys,
  pacificStandard,
] as SocietyType[];
