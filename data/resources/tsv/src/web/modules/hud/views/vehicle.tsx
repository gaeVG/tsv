// DEPENDENCIES
import React from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
// TYPES
import { AppState } from '../../../stores';
// COMPONENT
import { SpeedoMeter } from '../components/vehicle';
import { Minimap } from '../components/minimap';

// HOOKS
import { useNuiEvent } from '../../../hooks'

function Vehicle() {
  
  const { vehicle }: AppState['hud'] = useSelector((state: AppState) => state.hud, shallowEqual);
  const dispatch = useDispatch();

  useNuiEvent('player-entered-vehicle', (vehicle: { model: string }) => {
    dispatch({
      type: 'SET_DISPLAY_SPEEDOMETER',
      vehicle: {
        model: vehicle.model,
        speedometer: {
          display: true,
        },
      },
    });
    dispatch({
      type: 'SET_DISPLAY_MINIMAP',
      minimap: {
        display: true,
      },
    });
  });
  useNuiEvent('player-left-vehicle', () => {
    dispatch({
      type: 'SET_DISPLAY_SPEEDOMETER',
      vehicle: {
        speedometer: {
          display: false,
        },
      },
    });
    dispatch({
      type: 'SET_DISPLAY_MINIMAP',
      minimap: {
        display: false,
      },
    });
  });
  

  return (
    <>
      <section id="vehicle">
        {vehicle.speedometer.display && (
          <SpeedoMeter />
        )}
      </section>
      {vehicle.minimap.display && (
        <Minimap />
      )}
    </>
  )
}

export { Vehicle };
