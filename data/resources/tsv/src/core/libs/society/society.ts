import { Crypto } from '..';
import { SocietyBuildingType, SocietyType } from '../../declares/society';
import _t from '../../../config/i18n';
import { ActivitiesManager } from '../activity';

class Society {
  id: string;
  name: string;
  label?: string;
  owner: string;
  building: SocietyBuildingType;
  activities?: ActivitiesManager;
  isCompagny: boolean;
  societies?: Society[];

  constructor(society: SocietyType) {
    this.id = society.id ? society.id : Crypto.uuidv4();
    this.name = society.name;
    this.label = society.label ? society.label : _t(`core.society.${society.name}.label`);
    this.owner = society.owner;
    this.building = society.building;
    this.activities = !society.isCompagny && new ActivitiesManager(society.activities);
    this.isCompagny = society.isCompagny ? society.isCompagny : false;
    this.societies = this.isCompagny && society.societies
      ? society.societies.map((compagnySociety) => new Society(compagnySociety))
      : undefined;
  }
}

class Compagny extends Society {
  constructor(compagny: SocietyType) {
    super({
      ...compagny,
      isCompagny: true,
      societies: compagny.societies
    });
  }
}

export { Society, Compagny };
