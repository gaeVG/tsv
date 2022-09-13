interface IAdaptativeCardBodyItem {
  type: string;
  horizontalAlignment?: 'Left' | 'Center' | 'Right';
  id?: string;
  text?: string;
  placeholder?: string;
  items?: { type: string; weight: string; color: string; text: string }[];
  isVisible?: boolean;
}

export { IAdaptativeCardBodyItem };
