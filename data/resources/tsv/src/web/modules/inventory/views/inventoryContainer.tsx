// DEPENDENCIES
import React, { useEffect } from "react";
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from "react-redux";
// DECLARES
import { ItemCategoryEnum } from "../../../../core/declares/item";
import { AppReducerActionEnum, DnDItemEnum } from '../../../../core/declares/nui';
// COMPONENTS
import { Inventory } from '../components/inventory';
// HOOKS
import { useHover } from '@mantine/hooks';
// STORE
import { AppState } from "../../../stores/store";

function getSplitInventoryClass(inventory: AppState['inventory']) {
  let className: string
  if (inventory.targetInventory !== undefined) {
    className = 'split-for-'

    if (inventory.display.targetInventory) {
      className += 'target'
    } else if (inventory.display.playerComponents) {
      className += 'player-components'
    } else {
      className = ''
    }
  }

  return className !== undefined ? className : ''
}

const inventoryDnDItems: DnDItemEnum[] = Object.values(ItemCategoryEnum).map((itemCategory) => (itemCategory as unknown) as DnDItemEnum);

function InventoryContainer ({ owner }: { owner: 'player' | number | 'shopSection'}) {
  const { app, inventory }: AppState = useSelector((state: AppState) => state, shallowEqual);
  const { hovered, ref } = useHover();
  const dispatch = useDispatch();
  
  const onMouseUp = () => {
    if (owner !== 'player') {
      if (
        app.currentDrag !== null &&
        inventoryDnDItems.includes(app.currentDrag.type) &&
        app.currentDrag.from &&
        app.currentDrag.from.owner !== owner
      ) {
        if (app.currentDrag.target && app.currentDrag.target.owner === owner) {
          dispatch({ type: AppReducerActionEnum.DROP_CURRENT_DRAG });
          return;
        }
      }
      dispatch({ type: AppReducerActionEnum.REMOVE_CURRENT_DRAG })
    }
  }

  useEffect(() => {
    if (hovered) {
      if (owner !== 'player') {
        if (app.currentDrag) {
          if (!app.currentDrag.target && app.currentDrag.from.owner !== owner) {
            dispatch({
              type: 'SET_CURRENT_DRAG',
              currentDrag: {
                ...app.currentDrag,
                target: {
                  owner: owner,
                  container: inventory.playerInventories[1].container
                }
              }
            })
          }
        }
      }
    }
  }, [hovered])

	return (
		<div
      key={`inventory-${owner}`}
      id={`inventory-${owner}`}
      ref={ref}
      onMouseUp={onMouseUp}
      className={
        `inventory ${owner === 'player' ? owner : 'target'} ${owner === 'player' ? getSplitInventoryClass(inventory) : ''}`
      }>
      
      {owner === 'player' && (
        <div id="toggle-player-components" />
      )}
      {
        owner === 'player'
          ? inventory.playerInventories.map((i) =>
              <Inventory
                key={`player-inventory-${i.container}`}
                currentInventory={i}
                owner={owner}
              />
            )
          : <Inventory
              key={`target-${owner}-inventory-${inventory.playerInventories[0].container}`}
              currentInventory={inventory.playerInventories[0]}
              owner={owner}
            />
      }
		</div>
	)
}

export { InventoryContainer }
