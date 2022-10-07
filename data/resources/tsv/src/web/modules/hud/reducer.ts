import { IStatus } from '@declares/status';

const initialState: {
  vehicle: {
    model: string;
    speedometer: {
      display: boolean;
      vehicleSpeed: number;
    };
    minimap: {
      display: boolean;
      streetName: string;
      zone: string;
      compass: number;
    };
  };
  status: {
    display: boolean;
    basicNeeds: {
      display: boolean;
      status: IStatus[];
    };
    feelings: {
      display: boolean;
      status: IStatus[];
    };
  };
} = {
  vehicle: {
    model: undefined,
    speedometer: {
      display: false,
      vehicleSpeed: 0,
    },
    minimap: {
      display: false,
      streetName: undefined,
      zone: undefined,
      compass: 0,
    },
  },
  status: {
    display: true,
    basicNeeds: {
      display: true,
      status: [],
    },
    feelings: {
      display: false,
      status: [],
    },
  },
};

const hudReducer = (
  state = initialState,
  action: {
    type:
      | 'SET_SPEEDOMETER'
      | 'SET_DISPLAY_SPEEDOMETER'
      | 'SET_PLAYER_STATUS'
      | 'SET_DISPLAY_STATUS'
      | 'SET_DISPLAY_MINIMAP'
      | 'SET_COMPASS'
      | 'SET_MINIMAP_STREETNAME';
    vehicle?: {
      model?: string;
      speedometer?: {
        display?: boolean;
        vehicleSpeed?: number;
      };
    };
    minimap?: {
      display: boolean;
      streetName?: string;
      zone?: string;
    };
    compass?: {
      angle: number;
    };
    status?: {
      display?: boolean;
      basicNeeds?: {
        display?: boolean;
        status?: IStatus[];
      };
      feelings?: {
        display?: boolean;
        status?: IStatus[];
      };
    };
  },
) => {
  switch (action.type) {
    case 'SET_SPEEDOMETER':
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          speedometer: {
            ...state.vehicle.speedometer,
            vehicleSpeed: action.vehicle.speedometer.vehicleSpeed,
          },
        },
      };
    case 'SET_DISPLAY_SPEEDOMETER':
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          model: action.vehicle.model,
          speedometer: {
            ...state.vehicle.speedometer,
            display: action.vehicle.speedometer.display,
          },
        },
      };
    case 'SET_PLAYER_STATUS':
      return {
        ...state,
        status: {
          basicNeeds: action.status.basicNeeds
            ? {
                ...state.status.basicNeeds,
                ...action.status.basicNeeds,
              }
            : state.status.basicNeeds,
          feelings: action.status.feelings
            ? {
                ...state.status.feelings,
                ...action.status.feelings,
              }
            : state.status.feelings,
        },
      };
      break;
    case 'SET_DISPLAY_STATUS':
      return {
        ...state,
        status: {
          display: action.status.display ? action.status.display : state.status.display,
          basicNeeds: {
            ...state.status.basicNeeds,
            display: action.status.basicNeeds.display
              ? action.status.basicNeeds.display
              : state.status.basicNeeds.display,
          },
          feelings: {
            ...state.status.feelings,
            display: action.status.feelings.display
              ? action.status.feelings.display
              : state.status.feelings.display,
          },
        },
      };
    case 'SET_DISPLAY_MINIMAP':
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          minimap: {
            ...state.vehicle.minimap,
            display: action.minimap.display,
          },
        },
      };
    case 'SET_COMPASS':
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          minimap: {
            ...state.vehicle.minimap,
            compass: action.compass.angle,
          },
        },
      };
    case 'SET_MINIMAP_STREETNAME':
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          minimap: {
            ...state.vehicle.minimap,
            streetName: action.minimap.streetName,
            zone: action.minimap.zone,
          },
        },
      };
    default:
      return state;
  }
};

export { hudReducer };
