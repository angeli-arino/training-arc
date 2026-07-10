import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, fallback: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : fallback;
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Persistence is helpful, but privacy mode should not break the app.
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
