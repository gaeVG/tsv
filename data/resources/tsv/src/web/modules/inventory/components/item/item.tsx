// Dependencies
import React from 'react';
// Declarations
import {
  /*ItemCategoryEnum,*/ ItemType,
  IItem,
  ItemShouldNoLongerExistError,
} from '@declares/item';
import { InventoryFromType } from '@declares/inventory';
// Hooks
import { useEffect, useState } from 'react';
import { useId } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { fetchNui } from '@hooks';
// Components
import { Menu } from '@mantine/core';
// CONFIG
import _t from '@config/i18n';

// function getItemDnDCategory (item: ItemType): string {
//   let itemDnDCategory: string

//   Object.values(ItemCategoryEnum).forEach((itemCategory) =>
//     config.items[itemCategory] && config.items[itemCategory].map((itemConfig) => {
//       if (itemConfig.name === item.name) {
//         itemDnDCategory = itemCategory
//       }
//     })
//   )

//   return itemDnDCategory
// }

function Item({
  item,
  from,
  isSelected,
}: {
  item: ItemType;
  from: InventoryFromType;
  isSelected?: boolean;
}) {
  const itemID = useId();
  const itemLabel = _t(`module.inventory.items.${item.name}`);

  const [onUseItem, setOnUseItem] = useState(false);

  const useItem = async (from: InventoryFromType, item: ItemType) => {
    try {
      const usedItem: IItem = await fetchNui({
        name: 'useItem',
        module: 'inventory',
        payload: [from, item],
      });

      console.log(usedItem);

      if (usedItem.name === 'ItemShouldNoLongerExistError') {
        throw new ItemShouldNoLongerExistError(item as IItem);
      }

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
      });
      if (usedItem.count !== item.count) {
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
        });

        if (error.name === 'ItemShouldNoLongerExistError') {
          // TODO: Supprimer l'item du store
        }
      }
    } finally {
      setOnUseItem(false);
    }
  };

  // TODO: Complete Drag and Drop
  // const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
  //   event.preventDefault();

  //   if (!app.currentDrag) {
  //     dispatch({
  //       type: AppReducerActionEnum.SET_CURRENT_DRAG,
  //       currentDrag: {
  //         id: itemID,
  //         data: item,
  //         type: itemCategory,
  //         from: from
  //       }
  //     });
  //   }
  // }
  // const onMouseUp = (event: MouseEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   if (app.currentDrag && app.currentDrag.id === itemID) {
  //     dispatch({ type: AppReducerActionEnum.DROP_CURRENT_DRAG });
  //   }
  // }

  useEffect(() => {
    if (onUseItem) {
      useItem(from, item);
    }
  }, [onUseItem]);

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
  );
}

export { Item };
