import { SocietyType } from '../';
import _t from '../../../../config/i18n';

class UpdateOneSocietyError extends Error {
  constructor(society: SocietyType) {
    super(_t('core.society.error.updateOne', { societyName: society.name }));
  }
}

export { UpdateOneSocietyError };
