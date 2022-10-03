// DEPENDENCIES
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// DECLARES
import { IMenu, TypeMenuEnum, TypeMenuType } from '../../../core/declares/menu';
import { AppState } from '../../stores';
// HOOKS
import { useNuiEvent } from "../../hooks";
// COMPONENTS
import { MenuDefault, MenuCircular } from "./views";

function Menu() {
  const [currentMenu, setCurrentMenu] = useState<JSX.Element>();
  const [currentMenuType, setCurrentMenuType] = useState<TypeMenuType>();
  const { menu }: AppState = useSelector((state: AppState) => state, shallowEqual);
  const dispatch = useDispatch();

  useNuiEvent('openMenu', (menu: IMenu) => {
    dispatch({
      type: 'SET_CURRENT_MENU',
      currentMenu: menu
    })
  })
  useNuiEvent('closeMenu', () => {
    dispatch({ type: 'CLOSE_CURRENT_MENU' })
  })
  useNuiEvent('updateMenu', (menu: IMenu) => {
    dispatch({
      type: 'UPDATE_CURRENT_MENU',
      currentMenu: menu
    })
  })

  useEffect(() => {
    if (menu.currentMenu) {
      switch (menu.currentMenu.type) {
        case TypeMenuEnum.CIRCULAR:
          setCurrentMenu(
            <MenuCircular
              module={menu.currentMenu.module}
              name={menu.currentMenu.name}
              title={menu.currentMenu.title}
              buttons={menu.currentMenu.buttons}
            />
          );
          break;
        default:
          setCurrentMenu(
            <MenuDefault
              module="player"
              name="personnal"
              title="Menu personnel"
              buttons={menu.currentMenu.buttons}
            />
          );
      }

      setCurrentMenuType(menu.currentMenu.type)
    } else if (menu.currentMenu === null) {
      setCurrentMenu(null);
      setCurrentMenuType(null);
      dispatch({
        type: 'SET_CURRENT_MENU',
        currentMenu: undefined
      })
    }
  }, [menu.currentMenu])

  return (
    currentMenu !== undefined && (
      <section id="menu" className={`menu-${currentMenuType}`}>
        {currentMenu}
      </section>
    )
  );
}

export { Menu }
