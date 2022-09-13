// DEPENDENCIES
import React, { useEffect, useState } from 'react';
// DECLARES
import { MenuProps } from '../../../../core/declares/nui';
// HOOKS
import { useNuiEvent } from '../../../hooks';
import { useDebouncedValue, useId } from '@mantine/hooks';
import { ExitButton } from '../components';

function MenuDefault({ title, buttons }: MenuProps) {
  const [indexSelected, setIndexSelected] = useState(0);
  const [menuButtons, setMenuButton] = useState([]);
  const [indexSelectedDebounced] = useDebouncedValue(indexSelected, 100);
  const menuId = useId();

  useNuiEvent('setControlMenu', (control: string) => {
    switch (control) {
      case 'up':
        console.log('monte')
        indexSelected !== 0 && setIndexSelected(indexSelectedDebounced - 1);
        break;
      case 'down':
        console.log('desce')
        indexSelected !== menuButtons.length - 1 && setIndexSelected(indexSelectedDebounced + 1);
        break;
    }
  });

  useEffect(() => {
    setMenuButton([
      ...buttons, ExitButton(),
    ]);
  }, [buttons]);

  return (
    <>
      <div id={`container-${menuId}`} className="container">
        <header>{title}</header>
        <div id={`menu-${menuId}`} className="menu">
          <ol>
            {menuButtons.map((button, index) => (
              <li key={index} className={`item ${index === indexSelectedDebounced ? 'selected' : ''}`}>
                {button.name}
                {/* {button.description && (
                  <span className="description">{button.description}</span>
                )} */}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export { MenuDefault };
