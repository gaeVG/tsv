// DEPENDENCIES
import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useId } from '@mantine/hooks'
import { Menu } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
// DECLARES
import { AppReducerActionEnum } from '../../../../../core/declares/nui';
import { ItemCategoryEnum, ItemType, IItem, ItemShouldNoLongerExistError } from '../../../../../core/declares/item';
import { InventoryFromType } from '../../../../../core/declares/inventory';
// STORES
import { AppState } from '../../../../stores';
// HOOKS
import { fetchNui } from '../../../../hooks';
// CONFIG
import config from '../../../../../config';


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

  const [onUseItem, setOnUseItem] = useState(false);

  const useItem = async (from: InventoryFromType, item: ItemType) => {
    try {
      const usedItem: IItem = await fetchNui({
        name: 'useItem',
        module: 'inventory',
        payload: [from, item]
      });

      if (usedItem.name === 'ItemShouldNoLongerExistError') {
        throw new ItemShouldNoLongerExistError(item as IItem);
      }

      if (usedItem.count !== item.count) {
        // TODO: Modifier le store pour mettre à jour l'item
        showNotification({
          title: 'Utilisation item',
          message: `Vous avez utilisé ${itemLabel}`,
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.blue[6],
              borderColor: theme.colors.blue[6],

              '&::before': { backgroundColor: theme.white },
            },

            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: theme.colors.blue[7] },
            },
          }),
        })
        // dispatch({
        //   type: AppReducerActionEnum.,
        //   from: from,
        //   item: usedItem
        // });
      }
    } catch (error) {
      if (error instanceof Error) {
        showNotification({
          title: 'Erreur',
          message: error.message,
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red,
              borderColor: theme.colors.red,

              '&::before': { backgroundColor: theme.white },
            },

            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: theme.colors.blue[7] },
            },
          }),
        })

        if (error.name === 'ItemShouldNoLongerExistError') {
          // TODO: Supprimer l'item du store
        }
      }
    } finally {
      setOnUseItem(false);
    }
  }
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

  useEffect(() => {
    if (onUseItem) {
      useItem(from, item);
    }
  }, [onUseItem])

  return (
    <Menu>
      <Menu.Target>
        <div
          id={`item-${item.name}-${itemID}`}
          className={`item ${isSelected ? 'selected' : ''}`}
          onClick={() => !onUseItem && setOnUseItem(true)}
          
        >
          {item.count} {itemLabel}
        </div>
      </Menu.Target>
    </Menu>
  )
}

export { Item }
