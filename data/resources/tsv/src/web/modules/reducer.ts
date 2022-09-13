import { ModuleReducerActionType, ModuleReducerActionEnum } from '../../core/declares/nui';
import { NUIModule } from '../../core/declares/module';

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
