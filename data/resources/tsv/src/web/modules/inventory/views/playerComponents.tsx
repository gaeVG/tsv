// Dependencies
import React, { useState } from 'react';
// Declarations
import { PlayerComponentEnum, PlayerComponentType } from '@declares/inventory';
// Components
import { PlayerComponent } from '../components/playerComponent';

function PlayerComponents() {
  const [playerComponents, setPlayerComponents] = useState(
    [] as Array<{ name: string; components: PlayerComponentType[] }>,
  );

  useState(() => {
    setPlayerComponents([
      {
        name: PlayerComponentEnum.CONTAINER,
        components: [{ name: 'hand' }, { name: 'bag' }],
      },
      {
        name: PlayerComponentEnum.CLOTHE,
        components: [
          { name: 'head', variations: [{ name: 'hat' }, { name: 'glasses' }, { name: 'mask' }] },
          { name: 'top', variations: [{ name: 'torso' }, { name: 'jacket' }] },
          { name: 'lower', variations: [{ name: 'pants' }, { name: 'shorts' }] },
        ],
      },
    ] as Array<{ name: string; components: PlayerComponentType[] }>);
  });

  return (
    playerComponents.length > 0 && (
      <div id="playerComponents">
        {playerComponents.map((playerComponent) => (
          <article
            className={`playerComponent-type playerComponent-type-${playerComponent.name}`}
            key={playerComponent.name}
          >
            {playerComponent.components.map((component) => (
              <PlayerComponent key={component.name} component={component} />
            ))}
          </article>
        ))}
      </div>
    )
  );
}

export { PlayerComponents };
