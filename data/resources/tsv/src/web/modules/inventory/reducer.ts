// Declarations
import { InventoryType } from '@declares/inventory';
import { ItemType } from '@declares/item';
// Hooks
import { fetchNui } from '@hooks';

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
    type: 'SET_DISPLAY_INVENTORY' | 'SET_PLAYER_INVENTORIES' | 'SET_TARGET_INVENTORY';
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
      return {
        ...state,
        playerInventories: action.playerInventories,
      };
    case 'SET_TARGET_INVENTORY':
      return {
        ...state,
        targetInventory: action.targetInventory,
      };
    case 'SET_DISPLAY_INVENTORY':
      if (action.display.playerComponents !== undefined) {
        action.display.playerComponents
          ? fetchNui({
              name: 'hideCharacter',
              module: 'inventory',
            })
          : fetchNui({
              name: 'displayCharacter',
              module: 'inventory',
            });
      } else if (action.display.module !== undefined) {
        !action.display.module &&
          fetchNui({
            name: 'closeInventory',
            module: 'inventory',
          });
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
