// DEPENDENCIES
import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
// DECLARES
import { IInventory } from '../../../core/declares/inventory';
import { KeyBoardEnum } from '../../../core/declares/nui';
// STORES
import { AppState } from '../../stores/store';
// VIEWS
import { InventoryContainer, PlayerComponents, PlayerItemShortcuts } from './views';
// HOOKS
import { useNuiEvent } from '../../hooks'
import { useNuiKey } from '../../hooks';
import { useWindowEvent } from '@mantine/hooks';
import { NuiMessageData } from '../../../core/declares/nui';



function getDisplayInventoryClass(inventory: AppState['inventory']) {

  if (inventory.display.playerComponents) {
    return 'player-components'
  } else if (inventory.display.targetInventory) {
    return 'target'
  } else {
    return 'centered'
  }
}

function inventoryRender() {
  const inventory: AppState['inventory'] = useSelector((state: AppState) => state.inventory, shallowEqual);
  const dispatch = useDispatch();

  useNuiEvent('toggle-shortcurt-player-items', (toggleShortcut: { toggle: boolean, ms?: number}) => {
    dispatch({
      type: 'SET_DISPLAY_MODULE',
      display: {
        playerItemsShorts: toggleShortcut.toggle,
      },
    });

    if (toggleShortcut.ms !== undefined) {
      setTimeout(() => {
        dispatch({
          type: 'SET_DISPLAY_MODULE',
          display: {
            playerItemsShorts: false,
          },
        });
      }, toggleShortcut.ms);
    }
  });
  useNuiEvent('open-player-inventory', (playerInventories: [IInventory]) => {
    dispatch({
      type: 'SET_PLAYER_INVENTORIES',
      playerInventories: playerInventories
    });
    dispatch({
      type: 'SET_DISPLAY',
      display: {
        module: true,
        playerInventories: true,
        playerItemShortcuts: true,
        targetInventory: true,
      }
    })
  });

  useNuiKey('Escape', () =>
    dispatch({
      type: 'SET_DISPLAY',
      display: {
        module: false,
        playerInventories: false,
        playerItemShortcuts: false,
        targetInventory: false,
      }
    })
  );

  return inventory.display.module && (
    <section id="inventory" className={getDisplayInventoryClass(inventory)}>
      {inventory.display.playerInventories && (<InventoryContainer key={'inventory-container-player'} owner={'player'} />)}
      {inventory.display.targetInventory && (<InventoryContainer key={`inventory-container-target-${3}`} owner={3} />)}
      {inventory.display.playerComponents && (<PlayerComponents />)}
      {inventory.display.playerItemShortcuts && (<PlayerItemShortcuts />)}
    </section>
  )
};

export { inventoryRender };
