import {
  useState,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

interface CookieOptions {
  days?: number; // Expiration in days
  path?: string; // Cookie path, defaults to '/'
  domain?: string; // Cookie domain
  secure?: boolean; // Only send over HTTPS
  sameSite?: "Strict" | "Lax" | "None"; // CSRF protection level
}

// Helper: reads a single cookie value by name from document.cookie
function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

// Helper: writes a cookie with the given options
function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  const { days, path = "/", domain, secure, sameSite = "Lax" } = options;

  let cookieStr = `${name}=${encodeURIComponent(value)}; path=${path}; SameSite=${sameSite}`;

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookieStr += `; expires=${date.toUTCString()}`;
  }
  if (domain) cookieStr += `; domain=${domain}`;
  // 'secure' should be true in production (HTTPS-only)
  if (secure) cookieStr += `; secure`;

  document.cookie = cookieStr;
}

// Helper: deletes a cookie by setting its expiration in the past
function removeCookie(name: string, options: CookieOptions = {}): void {
  setCookie(name, "", { ...options, days: -1 });
}

function useCookie<T>(
  key: string,
  initialValue: T,
  options: CookieOptions = {},
): [T, SetValue<T>, () => void] {
  const [cookieValue, setCookieValue] = useState<T>(() => {
    const existing = getCookie(key);
    if (existing !== undefined) {
      try {
        return JSON.parse(existing) as T;
      } catch {
        // If the raw cookie isn't valid JSON, return it as-is (cast to T)
        return existing as unknown as T;
      }
    }
    // Cookie doesn't exist yet: create it with the initial value
    if (initialValue !== undefined) {
      setCookie(key, JSON.stringify(initialValue), options);
    }
    return initialValue;
  });

  const updateCookie: SetValue<T> = useCallback(
    (value) => {
      setCookieValue((prev) => {
        // Support functional updates, e.g. updateCookie(prev => prev + 1)
        const valueToStore =
          value instanceof Function ? (value as (prev: T) => T)(prev) : value;
        try {
          setCookie(key, JSON.stringify(valueToStore), options);
        } catch (error) {
          console.warn(`Error setting cookie "${key}":`, error);
        }
        return valueToStore;
      });
    },
    [key, options],
  );

  const deleteCookie = useCallback(() => {
    removeCookie(key, options);
    setCookieValue(undefined as unknown as T);
  }, [key, options]);

  // Optional: sync with external cookie changes (e.g. another tab) via polling,
  // since there's no native browser event for cookie changes like there is for localStorage.
  useEffect(() => {
    const interval = setInterval(() => {
      const current = getCookie(key);
      if (current === undefined) return;

      try {
        const parsed = JSON.parse(current) as T;
        setCookieValue((prev) =>
          JSON.stringify(prev) !== current ? parsed : prev,
        );
      } catch {
        // Ignore invalid JSON during polling
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [key]);

  return [cookieValue, updateCookie, deleteCookie];
}

export default useCookie;
