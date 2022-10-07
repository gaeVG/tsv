// Declarations
import { IMenu } from '@declares/menu';

const initialState: {
  currentMenu: IMenu;
} = {
  currentMenu: undefined,
};

const menuReducer = (
  state = initialState,
  action: {
    type: 'SET_CURRENT_MENU' | 'CLOSE_CURRENT_MENU';
    currentMenu: IMenu;
  },
) => {
  switch (action.type) {
    case 'SET_CURRENT_MENU':
      return {
        currentMenu: action.currentMenu,
      };
    case 'CLOSE_CURRENT_MENU':
      return {
        currentMenu: null,
      };
    default:
      return state;
  }
};

export { menuReducer };
