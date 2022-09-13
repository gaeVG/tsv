import { AppReducerActionEnum, ModuleReducerActionEnum } from '..';

type AppReducerActionType =
  | AppReducerActionEnum.APP_THEME
  | AppReducerActionEnum.SET_USER
  | AppReducerActionEnum.SET_ERROR
  | AppReducerActionEnum.SET_LOADING
  | AppReducerActionEnum.SET_LOADED
  | AppReducerActionEnum.SET_CURRENT_DRAG
  | AppReducerActionEnum.DROP_CURRENT_DRAG
  | AppReducerActionEnum.REMOVE_CURRENT_DRAG;

type ModuleReducerActionType = ModuleReducerActionEnum.SET_MODULES;

export { AppReducerActionType, ModuleReducerActionType };
