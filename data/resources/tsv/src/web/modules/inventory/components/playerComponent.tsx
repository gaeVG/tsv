import React from 'react';
import { useDispatch } from 'react-redux';
import { GiSpiderMask, GiHand, GiSchoolBag, GiBilledCap, GiArmoredPants, GiFootTrip, GiTShirt, Gi3DGlasses, GiSleevelessJacket } from 'react-icons/gi';
import { PlayerComponentType } from '../../../../core/declares/inventory';

function PlayerComponent({ component } : { component: PlayerComponentType }) {

  const dispatch = useDispatch();
  const componentIcon = (componentName: string) => {
    switch (componentName) {
      case 'hat':
        return <GiBilledCap size={32} />;
      case 'mask':
        return <GiSpiderMask size={32} />;
      case 'glasses':
        return <Gi3DGlasses size={32} />;
      case 'torso':
        return <GiTShirt size={32} />;
      case 'jacket':
        return <GiSleevelessJacket size={32} />;
      case 'jbib':
        return <GiArmoredPants size={32} />;
      case 'shoes':
        return <GiFootTrip size={32} />;
      case 'hand':
        return <GiHand size={32} />;
      case 'bag':
        return <GiSchoolBag size={32} />;
    };
  };

  const closeInventory = () => {
    dispatch({
      type: 'SET_DISPLAY_MODULE',
      display: false,
    });

    fetch('https://ts_paradise/eventParadise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'close-inventory',
        module: 'inventory'
      })
    })
  };

  return (
    <div className={`playerComponent playerComponent-${component.name} remove-component`} onClick={closeInventory}>
      {componentIcon(component.name)}
    </div>
  )
}

export { PlayerComponent };
