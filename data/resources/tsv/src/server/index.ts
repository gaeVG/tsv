import 'reflect-metadata';
import { Server } from './server';
import modules from './modules';

const tsv = new Server();
tsv.modules.loadModules(modules);

export { tsv };
