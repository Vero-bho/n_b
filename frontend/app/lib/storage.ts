// Безопасная работа с localStorage.
// На сервере (при серверном рендеринге) localStorage отсутствует — поэтому все
// обращения обёрнуты в проверки, чтобы приложение не падало.

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* хранилище недоступно — просто игнорируем */
  }
}

export function removeStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* игнорируем */
  }
}

export const STORAGE_KEYS = {
  cart: "noir-bijoux:cart",
  user: "noir-bijoux:user",
  builds: "noir-bijoux:builds",
  orders: "noir-bijoux:orders",
} as const;
