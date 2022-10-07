// Dependencies
import React, { useEffect, useState } from 'react';
// Declarations
import { StatusEnum } from '@declares/status';
// Hooks
import { useSelector, shallowEqual } from 'react-redux';
// Components
import { RingProgress } from '@mantine/core';
// Icons
import { FcLike, FcFeedIn, FcChargeBattery } from 'react-icons/fc';
import { IoIosWater } from 'react-icons/io';
// Store
import { AppState } from '@store';

function getBorderColorByValue(statusValue: number): string {
  if (status === undefined) return 'black';

  if (statusValue > 100) {
    return 'green';
  } else if (statusValue > 75 && statusValue < 100) {
    return 'blue';
  } else if (statusValue > 50 && statusValue <= 75) {
    return 'yellow';
  } else if (statusValue > 25 && statusValue <= 50) {
    return 'orange';
  } else if (statusValue <= 25) {
    return 'red';
  }
}
function getStatusValuePercent(statusValue: number): number {
  return Math.floor(statusValue / 1000);
}

function BasicNeeds() {
  const { status }: AppState['hud'] = useSelector((state: AppState) => state.hud, shallowEqual);
  const [hungerStatusValue, setHungerStatusValue] = useState(0);
  const [thirstStatusValue, setThirstStatusValue] = useState(0);

  useEffect(() => {
    const hungerStatus = status.basicNeeds.status.find(
      (status) => status.name === StatusEnum.HUNGER,
    );
    if (hungerStatus !== undefined) {
      setHungerStatusValue(getStatusValuePercent(hungerStatus.value as number));
    }

    const thirstStatus = status.basicNeeds.status.find(
      (status) => status.name === StatusEnum.THRIST,
    );
    if (thirstStatus !== undefined) {
      setThirstStatusValue(getStatusValuePercent(thirstStatus.value as number));
    }
  }, [status.basicNeeds]);

  return (
    status.basicNeeds.status.length > 0 && (
      <article id="basicNeeds">
        <RingProgress
          size={40}
          thickness={2}
          label={<FcLike size={18} />}
          sections={[{ value: 90, color: 'cyan' }]}
          className="progress"
        />
        {/* HUNGER STATUS */}
        <RingProgress
          size={40}
          thickness={2}
          label={<FcFeedIn size={18} />}
          sections={[
            {
              value: hungerStatusValue || 0,
              color: getBorderColorByValue(hungerStatusValue),
            },
          ]}
          className="progress"
        />
        {/* THIRST STATUS */}
        <RingProgress
          size={40}
          thickness={2}
          label={<IoIosWater size={18} style={{ color: '#0be3af' }} />}
          sections={[
            {
              value: thirstStatusValue || 0,
              color: getBorderColorByValue(thirstStatusValue),
            },
          ]}
          className="progress"
        />
        <RingProgress
          size={40}
          thickness={2}
          label={<FcChargeBattery size={18} />}
          sections={[{ value: 15, color: '#b72339' }]}
          className="progress"
        />
      </article>
    )
  );
}

export { BasicNeeds };
