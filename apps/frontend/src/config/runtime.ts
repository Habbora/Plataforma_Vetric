export type AppConfig = {
  API_URL: string
  APP_NAME?: string
}

declare global {
  interface Window {
    __APP_CONFIG__?: AppConfig
  }
}

export async function loadRuntimeConfig(): Promise<void> {
  try {
    const res = await fetch('/config.json', { cache: 'no-store' })
    if (res.ok) {
      const cfg = (await res.json()) as AppConfig
      window.__APP_CONFIG__ = cfg
    }
  } catch {}
}

export function getApiBaseUrl(): string {
  return window.__APP_CONFIG__?.API_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001'
}

