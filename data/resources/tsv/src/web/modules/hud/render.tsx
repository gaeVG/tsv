// DEPENDENCIES
import React from 'react'
// COMPONENT
import { Status, Vehicle } from './views';

function Hud() {

  return (
    <section id='head-up-display'>
      <Status />
      <Vehicle  />
    </section>
  );
}

export { Hud }
