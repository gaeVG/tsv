// Dependencies
import { MutableRefObject, useEffect, useRef } from 'react';
// Declarations
import { NuiMessageData } from '@declares/nui';
// Utils
import debounce from '../../core/utils/debounce';

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/

export const useNuiEvent = <T = any>(eventName: string, handler: (data: T) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const savedHandler: MutableRefObject<(data: T) => void> = useRef(() => {});
  // When handler value changes set mutable ref to handler val
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
      const { name, payload } = event.data;
      if (name === eventName && savedHandler.current) {
        savedHandler.current(payload);
      }
    };

    window.addEventListener('message', eventListener);
    // Remove Event Listener on component cleanup
    return debounce(() => window.removeEventListener('message', eventListener));
  }, [eventName]);
};
