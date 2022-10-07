// Dependencies
import React from 'react';

function PlayerItemShortcut({ slot, isSelected }: { slot: number; isSelected?: boolean }) {
  return (
    <article className={`playerItemShortcut ${isSelected ? 'selected' : ''}`}>Slot {slot}</article>
  );
}

export { PlayerItemShortcut };
