import { IAdaptativeCardBody } from './body';
import { IAdaptativeCardAction } from './action';

interface IAdaptativeCard {
  type: string;
  minHeight: string;
  body: IAdaptativeCardBody[];
  actions: IAdaptativeCardAction[];
  $schema: string;
  version: string;
}

export { IAdaptativeCard };
