type ItemType = {
  name: string;
  label?: string;
  count?: number;
  weight?: number;
  metadata?: { [key: string]: any }[];
  props?: string;
};

export { ItemType };
