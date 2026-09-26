export const STORAGE_KEYS = {
  transactions: 'personal-expense-tracker:transactions',
  monthlyBudget: 'personal-expense-tracker:monthly-budget',
}

export function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch (error) {
    // Corrupt or unavailable storage: fall back to the default value.
    return fallback
  }
}

export function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    // Storage can be unavailable (private mode, quota); the app keeps working in memory.
  }
}
