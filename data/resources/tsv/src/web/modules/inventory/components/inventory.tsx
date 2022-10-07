// Dependencies
import React from 'react';
import { Dispatch, AnyAction } from 'redux';
// Declarations
import { InventoryType } from '@declares/inventory';
import { AppReducerActionEnum, DnDContainerType, DnDItemEnum } from '@declares/nui';
import { ItemCategoryEnum } from '@declares/item';
// Hooks
import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHover } from '@mantine/hooks';
// Components
import { Item } from './item';
// Icons
import { GiCharacter, GiReturnArrow } from 'react-icons/gi';
import { MdInventory } from 'react-icons/md';
// Stores
import { AppState } from '../../../stores/store';

function TogglePlayerComponents({
  dispatch,
}: {
  dispatch: Dispatch<AnyAction>;
  inventoryDisplay: AppState['inventory']['display'];
}) {
  return (
    <div id="toggle-player-components">
      <GiReturnArrow
        size={24}
        color="red"
        onClick={() =>
          dispatch({
            type: 'SET_DISPLAY',
            display: {
              playerComponents: false,
              targetInventory: false,
            },
          })
        }
      />
      <GiCharacter
        size={24}
        color="white"
        onClick={() =>
          dispatch({
            type: 'SET_DISPLAY',
            display: {
              playerComponents: true,
              targetInventory: false,
            },
          })
        }
      />
      <MdInventory
        size={24}
        color="white"
        onClick={() =>
          dispatch({
            type: 'SET_DISPLAY',
            display: {
              playerComponents: false,
              targetInventory: true,
            },
          })
        }
      />
    </div>
  );
}

const inventoryDnDItems: DnDItemEnum[] = Object.values(ItemCategoryEnum).map(
  (itemCategory) => itemCategory as unknown as DnDItemEnum,
);

function Inventory({
  currentInventory,
  owner,
}: {
  currentInventory: InventoryType;
  owner: 'player' | number | 'shopSection';
}) {
  const { app, inventory }: AppState = useSelector((state: AppState) => state, shallowEqual);
  const { hovered, ref } = useHover();
  const dispatch = useDispatch();

  const onMouseUp = () => {
    if (owner === 'player') {
      if (
        app.currentDrag !== null &&
        inventoryDnDItems.includes(app.currentDrag.type) &&
        app.currentDrag.from &&
        (app.currentDrag.from.owner !== owner ||
          app.currentDrag.from.container !==
            (currentInventory.container as unknown as DnDContainerType))
      ) {
        console.log('comparatif des containers');
        console.log(
          app.currentDrag.target.container !==
            (currentInventory.container as unknown as DnDContainerType),
        );
        console.log(
          app.currentDrag.target.container,
          currentInventory.container as unknown as DnDContainerType,
        );
        if (
          app.currentDrag.target &&
          app.currentDrag.target.owner === 'player' &&
          app.currentDrag.target.container ===
            (currentInventory.container as unknown as DnDContainerType)
        ) {
          dispatch({ type: AppReducerActionEnum.DROP_CURRENT_DRAG });
          return;
        }
      }
      dispatch({ type: AppReducerActionEnum.REMOVE_CURRENT_DRAG });
    }
  };

  useEffect(() => {
    if (hovered) {
      if (owner === 'player' && app.currentDrag) {
        console.log('survol de ', currentInventory.container, owner);
        if (
          !app.currentDrag.target ||
          app.currentDrag.target.owner !== owner ||
          app.currentDrag.target.container !==
            (currentInventory.container as string as DnDContainerType)
        ) {
          dispatch({
            type: AppReducerActionEnum.SET_CURRENT_DRAG,
            currentDrag: {
              ...app.currentDrag,
              target: {
                owner: owner,
                container: currentInventory.container,
              },
            },
          });
        }
      }
    }
  }, [hovered]);

  return (
    <article ref={ref} onMouseUp={onMouseUp} id={`inventory-${currentInventory.container}`}>
      {owner === 'player' && (
        <TogglePlayerComponents dispatch={dispatch} inventoryDisplay={inventory.display} />
      )}
      <header>{currentInventory.container}</header>
      <div className="items">
        {currentInventory.items &&
          currentInventory.items.map((item, index) => (
            <Item
              key={`${owner}-${currentInventory.container}-${item.name}-${index}`}
              item={item}
              from={{
                owner: owner,
                container: currentInventory.container,
              }}
            />
          ))}
      </div>
    </article>
  );
}

export { Inventory };
