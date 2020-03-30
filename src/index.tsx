import {
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * Wraps the window event listener for the specified event and invokes the handler
 * with the original event.
 *
 * @param eventName A case-sensitive string representing the event type to listen for.
 * @param handler The object which receives a notification (an object that
 * implements the Event interface) when an event of the specified type occurs.
 * This must be an object implementing the EventListener interface, or a JavaScript
 * function. See The event listener callback for details on the callback itself.
 */
export const useEventHandler = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void
): void => {
  const ref = useRef<typeof handler>();

  useEffect(() => {
    ref.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: WindowEventMap[K]) => ref.current(event);
    window.addEventListener(eventName, eventListener);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  });
};

/**
 * Subscribes to changes to localStorage for the specified key.
 *
 * @param key Value of the key, if the key does not exist, null will be returned
 */
export const useLocalStorageProp = (key: string) => {
  const initialValue = localStorage.getItem(key);
  const [currentValue, setValue] = useState(initialValue);

  useEventHandler('storage', (event: StorageEvent) => {
    if (event.key === key && event.storageArea === window.localStorage) {
      const newValue = localStorage.getItem(key);
      if (newValue !== currentValue) {
        setValue(newValue);
      }
    }
  });
  return currentValue;
};

export const useSetLocalStorageProp = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
