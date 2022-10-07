// Dependencies
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import { appReducer } from '../app/reducer';
import { moduleReducer } from '../modules/reducer';
import { hudReducer } from '../modules/hud/reducer';
import { inventoryReducer } from '../modules/inventory/reducer';
import { menuReducer } from '../modules/menu/reducer';

const appStore = configureStore({
  reducer: {
    app: appReducer,
    modules: moduleReducer,
    hud: hudReducer,
    inventory: inventoryReducer,
    menu: menuReducer,
  },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export { appStore };
