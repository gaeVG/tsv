import { TypeButtonMenuEnum, IMenuButton } from '../../../../core/declares/menu';

const ExitButton = (isChildrenMenu?: boolean): IMenuButton => ({
  type: TypeButtonMenuEnum.DEFAULT,
  name: isChildrenMenu ? 'Retour' : 'Quitter',
  value: isChildrenMenu ? 'back' : 'quit',
});

export { ExitButton };
