import { SocietyType } from '..';
import _t from '../../../../config/i18n';

class AddOneSocietyError extends Error {
  constructor(society: SocietyType) {
    super(_t('core.society.error.addOne', { societyName: society.name }));
  }
}

export { AddOneSocietyError };
