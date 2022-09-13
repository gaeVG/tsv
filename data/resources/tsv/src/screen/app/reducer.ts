import {
  AppReducerActionType,
  AppReducerActionEnum,
  DnDContainerType,
  DnDItemType,
} from '../../core/declares/nui/';
import { IUser } from '../../core/declares/user';

type TTheme = 'light' | 'dark';

const initialState: {
  theme: TTheme;
  loading: boolean;
  user: IUser;
  modules: string[];
  droppables: Array<{ container: DnDContainerType; dropType: DnDItemType }>;
  currentDrag: {
    id: string;
    data: unknown;
    type: DnDItemType;
    from: {
      owner: 'player' | number | 'shopSection';
      container: DnDContainerType;
    };
    target: {
      owner: 'player' | number | 'shopSection';
      container: DnDContainerType;
    };
    mousePosition?: {
      x: number;
      y: number;
    };
  };
} = {
  theme: 'dark',
  user: null,
  modules: [] as string[],
  droppables: [],
  currentDrag: null,
  loading: undefined,
};

const appReducer = (
  state = initialState,
  action: {
    type: AppReducerActionType;
    user?: IUser;
    error?: unknown;
    loading?: boolean;
    theme?: TTheme;
    modules?: string[];
    currentDrag?: {
      id: string;
      data: unknown;
      type: DnDItemType;
      from: {
        owner: 'player' | number | 'shopSection';
        container: DnDContainerType;
      };
      target?: {
        owner: 'player' | number | 'shopSection';
        container: DnDContainerType;
      };
      mousePosition?: {
        x: number;
        y: number;
      };
    };
  },
) => {
  switch (action.type) {
    case AppReducerActionEnum.APP_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case AppReducerActionEnum.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case AppReducerActionEnum.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case AppReducerActionEnum.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case AppReducerActionEnum.SET_CURRENT_DRAG:
      return {
        ...state,
        currentDrag: {
          ...action.currentDrag,
        },
      };
    case AppReducerActionEnum.REMOVE_CURRENT_DRAG:
      return {
        ...state,
        currentDrag: null,
      };
    case AppReducerActionEnum.DROP_CURRENT_DRAG:
      fetch('https://ts_paradise/eventParadise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'dropCurrentDrag',
          module: 'inventory',
          payload: state.currentDrag,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });

      return {
        ...state,
        currentDrag: null,
      };
    default:
      return state;
  }
};

export { appReducer };
