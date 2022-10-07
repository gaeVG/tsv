// Dependencies
import React from 'react';
// Hooks
import { useSelector, shallowEqual } from 'react-redux';
// Components
import { PlayerItemShortcut } from '../components/playerItemShortcut';
// Stores
import { AppState } from '@store';

function PlayerItemShortcuts() {
  const { inventory }: AppState = useSelector((state: AppState) => state, shallowEqual);

  return (
    <div
      id="playerItemShortcuts"
      className={`playerItemShortcurts-${(() => {
        if (inventory.display.playerComponents) {
          return 'under-player-components';
        } else if (inventory.display.playerInventories) {
          return 'under-inventories';
        } else {
          return 'centered';
        }
      })()}`}
    >
      <PlayerItemShortcut key={1} slot={1} isSelected />
      <PlayerItemShortcut key={2} slot={2} />
      <PlayerItemShortcut key={3} slot={3} />
      <PlayerItemShortcut key={4} slot={4} />
      <PlayerItemShortcut key={5} slot={5} />
    </div>
  );
}

export { PlayerItemShortcuts };
