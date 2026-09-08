import {
  useState,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>, () => void] {
  // Lazy initializer: runs only once on mount, avoids reading localStorage on every render
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // localStorage might be disabled (e.g. private browsing) or contain invalid JSON
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // setState-like function that updates both React state and localStorage
  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        setStoredValue((prev) => {
          // Support functional updates, e.g. setValue(prev => prev + 1)
          const valueToStore =
            value instanceof Function ? (value as (prev: T) => T)(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        // Storage might be full (QuotaExceededError) or unavailable
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key],
  );

  // Removes the key from localStorage and resets state to initialValue
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sync state across multiple tabs/windows.
  // Note: the 'storage' event only fires in OTHER tabs, not the one that made the change.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue) as T);
        } catch {
          // Fallback: if it's not valid JSON, ignore the sync for this event
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
