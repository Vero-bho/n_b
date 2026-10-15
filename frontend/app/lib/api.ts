// ─────────────────────────────────────────────────────────────────────────────
// Обращения к бэкенду (Express API, шаг 4).
// Пока бэкенд не запущен — приложение продолжает работать на локальных данных
// из папки app/data: все запросы идут через tryApi() с запасным вариантом.
// ─────────────────────────────────────────────────────────────────────────────

// По умолчанию используем относительный путь. В dev Vite проксирует /api к backend,
// а в production тот же путь можно направить через reverse proxy. Для отдельного
// публичного API задайте абсолютный VITE_API_URL в .env на этапе сборки.
const RAW_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "/api";

export const API_BASE = RAW_BASE.replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit, timeoutMs = 2500): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...init,
    });

    if (!response.ok) {
      throw new Error(`Запрос ${path} завершился со статусом ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  remove: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

/**
 * Пытается выполнить запрос к API, а если бэкенд недоступен —
 * возвращает запасные (локальные) данные и признак online = false.
 */
export async function tryApi<T>(call: () => Promise<T>, fallback: T): Promise<{ data: T; online: boolean }> {
  try {
    const data = await call();
    return { data, online: true };
  } catch {
    return { data: fallback, online: false };
  }
}
