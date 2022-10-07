// Dependencies
import React from 'react';
// Views
import { Status, Vehicle } from './views';

/**
 * Display HUD view
 * @returns
 */
function Hud() {
  return (
    <section id="head-up-display">
      <Status />
      <Vehicle />
    </section>
  );
}

export { Hud };
