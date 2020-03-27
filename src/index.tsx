import {
  useEffect,
  useRef,
  useState,
} from 'react';

type EventName = keyof WindowEventMap;
type Handler<K extends EventName> = (event: WindowEventMap[K]) => void;

export const useEventHandler = <K extends EventName>(eventName: K, handler: Handler<K>): void => {
  const ref = useRef<Handler<K>>();

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

export const useLocalStorageProp = (key: string) => {
  const initialValue = localStorage.getItem(key);
  const [currentValue, setValue] = useState(initialValue);

  useEventHandler('storage', (event: StorageEvent) => {
    if (event.storageArea === window.localStorage) {
      const newValue = localStorage.getItem(key);
      setValue(newValue);
    }
  });
  return currentValue;
};

export const useSetLocalStorageProp = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
