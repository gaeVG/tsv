import { ItemStatusEffectType } from '.';

type ItemType = {
  name: string;
  label?: string;
  count?: number;
  weight?: number;
  metadata?: unknown;
  props?: string;
  effect?: ItemStatusEffectType;
};

export { ItemType };
