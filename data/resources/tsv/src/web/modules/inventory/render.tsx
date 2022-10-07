// Dependencies
import React from 'react';
// Declarations
import { IInventory } from '@declares/inventory';
// Hooks
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useNuiEvent, useNuiKey } from '@hooks';
// Views
import { InventoryContainer, PlayerComponents, PlayerItemShortcuts } from './views';
// Stores
import { AppState } from '@store';

function getDisplayInventoryClass(inventory: AppState['inventory']) {
  if (inventory.display.playerComponents) {
    return 'player-components';
  } else if (inventory.display.targetInventory) {
    return 'target';
  } else {
    return 'centered';
  }
}

function inventoryRender() {
  const inventory: AppState['inventory'] = useSelector(
    (state: AppState) => state.inventory,
    shallowEqual,
  );
  const dispatch = useDispatch();

  useNuiEvent(
    'toggle-shortcurt-player-items',
    (toggleShortcut: { toggle: boolean; ms?: number }) => {
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
    },
  );
  useNuiEvent('open-player-inventory', (playerInventories: [IInventory]) => {
    dispatch({
      type: 'SET_PLAYER_INVENTORIES',
      playerInventories: playerInventories,
    });
    dispatch({
      type: 'SET_DISPLAY',
      display: {
        module: true,
        playerInventories: true,
        playerItemShortcuts: true,
        targetInventory: true,
      },
    });
  });

  useNuiKey('Escape', () =>
    dispatch({
      type: 'SET_DISPLAY',
      display: {
        module: false,
        playerInventories: false,
        playerItemShortcuts: false,
        targetInventory: false,
      },
    }),
  );

  return (
    inventory.display.module && (
      <section id="inventory" className={getDisplayInventoryClass(inventory)}>
        {inventory.display.playerInventories && (
          <InventoryContainer key={'inventory-container-player'} owner={'player'} />
        )}
        {inventory.display.targetInventory && (
          <InventoryContainer key={`inventory-container-target-${3}`} owner={3} />
        )}
        {inventory.display.playerComponents && <PlayerComponents />}
        {inventory.display.playerItemShortcuts && <PlayerItemShortcuts />}
      </section>
    )
  );
}

export { inventoryRender };
