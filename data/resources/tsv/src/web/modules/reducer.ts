// Declarations
import { ModuleReducerActionType, ModuleReducerActionEnum } from '@declares/nui';

const initialState: string[] = [];

const moduleReducer = (
  state = initialState,
  action: {
    type: ModuleReducerActionType;
    modules?: string[];
  },
) => {
  switch (action.type) {
    case ModuleReducerActionEnum.SET_MODULES:
      return action.modules;
    default:
      return state;
  }
};

export { moduleReducer };
