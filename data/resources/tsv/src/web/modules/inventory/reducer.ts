import { InventoryType } from '../../../core/declares/inventory';
import { ItemType } from '../../../core/declares/item';

const initialState: {
  display: {
    module: boolean;
    playerInventories: boolean;
    playerComponents: boolean;
    playerItemShortcuts: boolean;
    targetInventory: boolean;
  };
  playerInventories: InventoryType[];
  playerComponents: {
    hat: ItemType;
    glasses: ItemType;
    mask: ItemType;
    torso: ItemType;
    jacket: ItemType;
    jbib: ItemType;
    shoes: ItemType;
  };
  targetInventory: {
    from: 'player' | number | 'shopSection';
    inventory: InventoryType;
  };
} = {
  display: {
    module: false,
    playerInventories: false,
    playerComponents: false,
    playerItemShortcuts: false,
    targetInventory: false,
  },
  playerInventories: [],
  playerComponents: {
    hat: undefined,
    glasses: undefined,
    mask: undefined,
    torso: undefined,
    jacket: undefined,
    jbib: undefined,
    shoes: undefined,
  },
  targetInventory: {
    from: undefined,
    inventory: undefined,
  },
};

const inventoryReducer = (
  state = initialState,
  action: {
    type: 'SET_DISPLAY' | 'SET_PLAYER_INVENTORIES' | 'SET_TARGET_INVENTORY';
    display?: {
      module?: boolean;
      playerInventories?: boolean;
      playerComponents?: boolean;
      playerItemShortcuts?: boolean;
      targetInventory?: boolean;
    };
    playerInventories?: InventoryType[];
    targetInventory?: {
      from: 'player' | number | 'shopSection';
      inventory: InventoryType;
    };
  },
) => {
  switch (action.type) {
    case 'SET_PLAYER_INVENTORIES':
      console.log('SET_PLAYER_INVENTORIES');
      console.log(action.playerInventories);
      return {
        ...state,
        playerInventories: action.playerInventories,
      };
    case 'SET_TARGET_INVENTORY':
      return {
        ...state,
        targetInventory: action.targetInventory,
      };
    case 'SET_DISPLAY':
      if (action.display.playerComponents !== undefined) {
        if (action.display.playerComponents === false) {
          fetch('https://ts_paradise/eventParadise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: 'hide-character',
              module: 'inventory',
            }),
          });
        } else {
          fetch('https://ts_paradise/eventParadise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: 'display-character',
              module: 'inventory',
            }),
          });
        }
      }
      return {
        ...state,
        display: {
          ...state.display,
          ...action.display,
        },
        inventories: !action.display ? [] : state.playerInventories,
        targetInventory: !action.display ? undefined : state.targetInventory,
      };
    default:
      return state;
  }
};

export { inventoryReducer };
