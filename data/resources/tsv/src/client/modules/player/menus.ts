import { TypeMenuEnum, TypeButtonMenuEnum, MenuType } from '../../../core/declares/menu';
import { IconLibraryEnum } from '../../../core/declares/nui';

const playerMenus: MenuType[] = [
  {
    type: TypeMenuEnum.CIRCULAR,
    module: 'player',
    name: 'personnal',
    title: 'module.player.title',
    subtitle: 'module.player.subtitle',
    buttons: [
      {
        type: TypeButtonMenuEnum.DEFAULT,
        name: 'Gestion des joueurs',
        icon: {
          name: 'FaUserCog',
          library: IconLibraryEnum.FontAwesome,
        },
        value: 1,
      },
      {
        type: TypeButtonMenuEnum.DEFAULT,
        name: 'Gestion des entités',
        icon: {
          name: 'FaUsers',
          library: IconLibraryEnum.FontAwesome,
        },
        value: 1,
      },
      {
        type: TypeButtonMenuEnum.DEFAULT,
        name: 'Paramètres personnels',
        description: 'Paramétrer les options du compte',
        icon: {
          name: 'FaPaintRoller',
          library: IconLibraryEnum.FontAwesome,
        },
        value: 1,
      },
      {
        type: TypeButtonMenuEnum.DEFAULT,
        name: 'Paramètres personnels',
        description: 'Paramétrer les options du compte',
        icon: {
          name: 'FaUser',
          library: IconLibraryEnum.FontAwesome,
        },
        value: 1,
      },
      {
        type: TypeButtonMenuEnum.DEFAULT,
        name: 'Paramètres personnels',
        description: 'Paramétrer les options du compte',
        icon: {
          name: 'FaGamepad',
          library: IconLibraryEnum.FontAwesome,
        },
        value: 1,
      },
    ],
  },
];

export { playerMenus };
