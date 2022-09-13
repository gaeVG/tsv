  // DEPENDENCIES
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// DECLARES
import { MenuProps, ModuleReducerActionEnum } from '../../../../core/declares/nui';
// HOOKS
import { useId } from '@mantine/hooks';
// COMPONENTS
import { IconDynamic } from '../../../components';
import { useNuiKey } from '../../../hooks';

function MenuCircular({ buttons }: MenuProps) {
  const dispatch = useDispatch();
  const menuId = useId();
  const [isChecked, setIsChecked] = useState(false);

  window.addEventListener('keyup', (e) => {
    console.log(e.key)
    console.log(isChecked)
    if (!isChecked) {
      fetch('https://ts_paradise/eventParadise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'onMenuClosed',
          module: 'player',
        }),
      })
        .then((response) => response.json())
        .then(({ eventHandler }) => {
          if (eventHandler) {
            dispatch({ type: 'CLOSE_CURRENT_MENU' });
          }
        });
    }
  });

  return ( 
    <div className="menu-circular__container">
      <input 
        className="menu-circular__button"
        id="menu-circular"
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label className="menu-circular__icon" htmlFor="menu-circular">
        <div key="first" className="hamburger hamburger-bar"></div>
        <div key="second" className="hamburger hamburger-bar"></div>
        <div key="third" className="hamburger hamburger-bar"></div>
      </label>
      
      {buttons.map((button) => (
        <a
          key={`menu-${menuId}-link-${useId()}`}
          className="menu-circular__item" href="#"
        >
          <IconDynamic
            icon={button.icon}
            key={`menu-${menuId}- icon-${menuId}`}
          />
        </a>
      ))}
    </div>
  );
};

export { MenuCircular };
