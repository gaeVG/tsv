// DEPENDENCIES
import { MutableRefObject, useEffect, useRef } from 'react';
// HOOKS
import debounce from '../../core/utils/debounce';

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param keyName The specific `keyName` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiKey('Escape', () => {
 *   console.log('Leave UI');
 * })
 *
 **/

export const useNuiKey = (keyName: string, handler: () => void) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const savedHandler: MutableRefObject<() => void> = useRef(() => {});
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      if (savedHandler.current) {
        if (event.code === keyName) {
          savedHandler.current();
        }
      }
    };

    window.addEventListener('message', eventListener);
    // Remove Event Listener on component cleanup
    return debounce(() => window.removeEventListener('message', eventListener));
  }, [keyName]);
};
