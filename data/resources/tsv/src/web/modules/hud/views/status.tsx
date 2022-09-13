// DEPENDENCIES
import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { IStatus, StatusEnum } from '../../../../core/declares/status'
// HOOKS
import { useNuiEvent } from '../../../hooks';
// COMPONENTS
import { BasicNeeds, Feeling } from '../components/status';
import { AppState } from '../../../stores';

function Status() {
  const { status }: AppState['hud'] = useSelector((state: AppState) => state.hud, shallowEqual)
  const dispatch = useDispatch();

  useNuiEvent('update-player-status', ({ status }: { status: IStatus[]}) => {
    const pStatus = status.reduce((playerStatus, currentStatus) => {
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
    }, { basicNeeds: [] as IStatus[] || null, feelings: [] as IStatus[]  || null })

    dispatch({
      type: 'SET_PLAYER_STATUS',
      status: {
        basicNeeds: { status: pStatus.basicNeeds },
        feelings: { status: pStatus.feelings }
      }
    });
  });

  return (
    <section id="status">
      <BasicNeeds />
      {status.feelings.display && <Feeling />}
    </section>
  )
}

export { Status };
