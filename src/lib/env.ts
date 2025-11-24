/**
 * Type-safe environment variables
 * Access env vars with autocomplete and type safety
 */

interface Env {
  VITE_API_BASE_URL?: string
  VITE_APP_NAME?: string
  VITE_APP_VERSION?: string
  MODE: 'development' | 'production' | 'test'
  DEV: boolean
  PROD: boolean
}

/**
 * Get environment variable with type safety
 */
function getEnv<K extends keyof Env>(key: K): Env[K] {
  if (key === 'MODE') {
    return (import.meta.env.MODE as Env['MODE']) || 'development'
  }
  if (key === 'DEV') {
    return import.meta.env.DEV
  }
  if (key === 'PROD') {
    return import.meta.env.PROD
  }
  return import.meta.env[key] as Env[K]
}

/**
 * Get environment variable or throw if missing
 */
function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = getEnv(key)
  if (value === undefined || value === null) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value as NonNullable<Env[K]>
}

/**
 * Environment configuration
 */
export const env = {
  /**
   * API base URL (optional)
   */
  apiBaseURL: getEnv('VITE_API_BASE_URL'),

  /**
   * App name (optional)
   */
  appName: getEnv('VITE_APP_NAME') || 'Vite React App',

  /**
   * App version (optional)
   */
  appVersion: getEnv('VITE_APP_VERSION'),

  /**
   * Current mode (development, production, test)
   */
  mode: getEnv('MODE'),

  /**
   * Is development mode
   */
  isDev: getEnv('DEV'),

  /**
   * Is production mode
   */
  isProd: getEnv('PROD'),
}

/**
 * Require environment variable (throws if missing)
 */
export { requireEnv, getEnv }
