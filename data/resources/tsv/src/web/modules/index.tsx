// DEPENDENCIES
import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
// TYPES
import { NUIModule } from '../../core/declares/nui';
import { AppState } from '../stores';
// MODULE
import modules from './modules';

function Modules() {
  const storeModules: AppState['modules'] = useSelector((state: AppState) => state.modules, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeModules.length === 0) {
      dispatch({
        type: 'SET_MODULES',
        modules: modules.reduce((modules: string[], module) => {
          if (module.activate) {
            modules.push(module.name);
          }
          return modules
        }, [])
      });
    }
  }, [storeModules]);
  
  return (
    <>
      {storeModules.length > 0
        && modules.map((module: NUIModule) => storeModules.includes(module.name) && (
          <module.render key={module.name}/>
        ))
      }
    </>
  );
}

export default Modules
