import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNuiEvent } from '../../../hooks';
import { AppState } from '../../../stores';

function Minimap() {
  const { minimap } : AppState['hud']['vehicle'] = useSelector((state: AppState) => state.hud.vehicle, shallowEqual);
  const dispatch = useDispatch();

  if (minimap.display) {
    useNuiEvent('update-compass', ({ angle }) => {
      dispatch({
        type: 'SET_COMPASS',
        compass: {
          angle: angle,
        },
      });
    });
    useNuiEvent('update-minimap-streetname', ({ streetName, zone } : { streetName: string, zone: string }) => {
      dispatch({
        type: 'SET_MINIMAP_STREETNAME',
        minimap: {
          streetName,
          zone,
        },
      });
    });
  }

  return (
    <>
      <article className="minimap" onClick={() => console.log('display map')} />
      <article className="street-view">
        <header>{minimap.streetName !== undefined && minimap.streetName}</header>
        <p>{minimap.zone !== undefined && minimap.zone.split(',')[1]}</p>
      </article>
      <article className="compass">
        <div className="needle" style={{
          transform: `translate(-50%,-50%) rotate(${(minimap.compass ? minimap.compass : 0)}deg)`
        }}></div>
      </article>
    </>
  )
}

export { Minimap}
