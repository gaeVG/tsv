import { Client } from './client';
import modules from './modules';

const tsv = new Client();
tsv.modules.loadModules(modules);

export { tsv };
