import { IAdaptativeCardBodyItem } from './item';

interface IAdaptativeCardBody {
  type: 'Container' | string;
  items: IAdaptativeCardBodyItem[];
}

export { IAdaptativeCardBody };
