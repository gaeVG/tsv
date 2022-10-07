// Dependencies
import React from 'react';
// Declarations
import { IStatus, StatusEnum } from '@declares/status';
// Hooks
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNuiEvent } from '@hooks';
// Components
import { BasicNeeds, Feeling } from '../components/status';
// Stores
import { AppState } from '@store';

function Status() {
  const { status }: AppState['hud'] = useSelector((state: AppState) => state.hud, shallowEqual);
  const dispatch = useDispatch();

  useNuiEvent('update-player-status', ({ status }: { status: IStatus[] }) => {
    const pStatus = status.reduce(
      (playerStatus, currentStatus) => {
        switch (currentStatus.name) {
          case StatusEnum.THRIST:
          case StatusEnum.HUNGER:
            playerStatus.basicNeeds.push(currentStatus);
            break;
          case StatusEnum.ALCOHOL:
            playerStatus.feelings.push(currentStatus);
            break;
        }

        return playerStatus;
      },
      { basicNeeds: ([] as IStatus[]) || null, feelings: ([] as IStatus[]) || null },
    );

    dispatch({
      type: 'SET_PLAYER_STATUS',
      status: {
        basicNeeds: { status: pStatus.basicNeeds },
        feelings: { status: pStatus.feelings },
      },
    });
  });

  return (
    <section id="status">
      <BasicNeeds />
      {status.feelings.display && <Feeling />}
    </section>
  );
}

export { Status };
