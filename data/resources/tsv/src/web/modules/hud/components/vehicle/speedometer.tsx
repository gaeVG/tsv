// Dependencies
import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
// Components
import { RingProgress, Text } from '@mantine/core';
// HOOKS
import { useNuiEvent } from '@hooks';
// Stores
import { AppState } from '@store';

function SpeedoMeter() {
  const { hud }: AppState = useSelector((state: AppState) => state, shallowEqual);
  const dispatch = useDispatch();

  useNuiEvent('update-speedometer', ({ vehicleSpeed }: { vehicleSpeed: number }) => {
    dispatch({
      type: 'SET_SPEEDOMETER',
      vehicle: {
        speedometer: {
          vehicleSpeed: vehicleSpeed,
        },
      },
    });
  });

  return (
    <article id="speedometer">
      <RingProgress
        size={200}
        className="speedProgress"
        thickness={8}
        label={
          <Text align="center" className="speedValue">
            {Math.abs(Math.floor(hud.vehicle.speedometer.vehicleSpeed))}
          </Text>
        }
        sections={[
          { value: 30, color: null },
          {
            value: (Math.abs(Math.floor(hud.vehicle.speedometer.vehicleSpeed)) / 280) * 100,
            color: 'cyan',
          },
        ]}
      ></RingProgress>
    </article>
  );
}

export { SpeedoMeter };
