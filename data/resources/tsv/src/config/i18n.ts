// Dependencies
import { default as i18n } from 'i18next';
// Locales files
import en from '../locales/en.json';
import fr from '../locales/fr.json';

// Init i18n module
i18n.init({
  lng: 'fr',
  debug: process.env.EXECUTION_MODE === 'safemode',
  resources: {
    en: { ...en },
    fr: { ...fr },
  },
});

// Export i18n locale function
export default i18n.t;
