// DEPENDENCIES
import React, { MouseEvent } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useId } from '@mantine/hooks'
import { Menu } from '@mantine/core';
// DECLARES
import { AppReducerActionEnum } from '../../../../../core/declares/nui';
import { ItemCategoryEnum, ItemType } from '../../../../../core/declares/item';
import { InventoryContainerType } from '../../../../../core/declares/inventory';
// STORES
import { AppState } from '../../../../stores';
// CONFIG
import config from '../../../../../config';

type InventoryFromType = {
  owner: number | "player" | "shopSection",
  container: InventoryContainerType
}

function getItemDnDCategory (item: ItemType): string {
  let itemDnDCategory: string

  Object.values(ItemCategoryEnum).forEach((itemCategory) =>
    config.items[itemCategory] && config.items[itemCategory].map((itemConfig) => {
      if (itemConfig.name === item.name) {
        itemDnDCategory = itemCategory
      }
    })
  )

  return itemDnDCategory
}


function Item({ item, from, isSelected } : { item: ItemType, from: InventoryFromType, isSelected?: boolean }) {
  const { app } : AppState = useSelector((state: AppState) => state, shallowEqual);
  const itemID = useId();
  const itemLabel = config.locale(`module.inventory.items.${item.name}`)
  const itemCategory = getItemDnDCategory(item)
  const dispatch = useDispatch();

  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (!app.currentDrag) {
      dispatch({
        type: AppReducerActionEnum.SET_CURRENT_DRAG,
        currentDrag: {
          id: itemID,
          data: item,
          type: itemCategory,
          from: from
        }
      });
    }
  }
  const onMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (app.currentDrag && app.currentDrag.id === itemID) {
      dispatch({ type: AppReducerActionEnum.DROP_CURRENT_DRAG });
    }
  }

  return (
    <Menu>
      <Menu.Target>
        <div
          id={`item-${item.name}-${itemID}`}
          className={`item ${isSelected ? 'selected' : ''}`}
          onClick={() => fetch('https://ts_paradise/eventParadise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: 'useItem',
              module: 'inventory',
              payload: [from, item]
            })
          })}
        >
          {item.count} {itemLabel}
        </div>
      </Menu.Target>
    </Menu>
  )
}

export { Item }
