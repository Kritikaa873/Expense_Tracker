import { TRANSACTION_TYPES } from './categories'
import { getTodayISODate } from './format'

export const ALL_CATEGORIES = 'all'

export const SORT_MODES = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  AMOUNT_HIGH: 'amount-high',
  AMOUNT_LOW: 'amount-low',
}

export function createTransaction({ type, amount, category, description, date }) {
  return {
    id: generateTransactionId(),
    type,
    amount,
    category,
    description,
    date,
  }
}

function generateTransactionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback for older browsers without crypto.randomUUID().
  return `tx-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function filterTransactions(transactions, { category = ALL_CATEGORIES } = {}) {
  if (category === ALL_CATEGORIES) {
    return transactions
  }
  return transactions.filter((transaction) => transaction.category === category)
}

// One comparator per sort mode; "newest" doubles as the default.
const SORT_COMPARATORS = {
  [SORT_MODES.NEWEST]: (a, b) => b.date.localeCompare(a.date),
  [SORT_MODES.OLDEST]: (a, b) => a.date.localeCompare(b.date),
  [SORT_MODES.AMOUNT_HIGH]: (a, b) => b.amount - a.amount,
  [SORT_MODES.AMOUNT_LOW]: (a, b) => a.amount - b.amount,
}

// Sorts a copy so the caller's array order is never changed.
export function sortTransactions(transactions, mode = SORT_MODES.NEWEST) {
  const compare = SORT_COMPARATORS[mode] ?? SORT_COMPARATORS[SORT_MODES.NEWEST]
  return [...transactions].sort(compare)
}

// Adds one transaction to a running { income, expenses } pair.
// Shared by getTotals and getMonthlySummary so the income/expense
// split logic lives in exactly one place.
function addToRunningTotals(totals, transaction) {
  if (transaction.type === TRANSACTION_TYPES.INCOME) {
    totals.income += transaction.amount
  } else {
    totals.expenses += transaction.amount
  }
  return totals
}

export function getTotals(transactions) {
  const totals = { income: 0, expenses: 0 }
  for (const transaction of transactions) {
    addToRunningTotals(totals, transaction)
  }
  return { ...totals, balance: totals.income - totals.expenses }
}

export function getExpensesByCategory(transactions) {
  const totalsByCategory = new Map()
  for (const transaction of transactions) {
    if (transaction.type !== TRANSACTION_TYPES.EXPENSE) {
      continue
    }
    totalsByCategory.set(
      transaction.category,
      (totalsByCategory.get(transaction.category) ?? 0) + transaction.amount,
    )
  }
  // Shape the map for the chart: [{ name, value }, ...], biggest first.
  return [...totalsByCategory.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

// Groups transactions by calendar month, newest month first.
// The month key is just the "YYYY-MM" part of the ISO date
// (e.g. "2026-09-14" -> "2026-09"), so no date libraries are needed.
export function getMonthlySummary(transactions) {
  const monthsByKey = new Map()
  for (const transaction of transactions) {
    const monthKey = transaction.date.slice(0, 7)
    if (!monthsByKey.has(monthKey)) {
      monthsByKey.set(monthKey, { monthKey, income: 0, expenses: 0, count: 0 })
    }
    const month = monthsByKey.get(monthKey)
    addToRunningTotals(month, transaction)
    month.count += 1
  }
  // "net" is precomputed here so the summary table can show it directly.
  return [...monthsByKey.values()]
    .map((month) => ({ ...month, net: month.income - month.expenses }))
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey))
}

// Total spent this calendar month — the number the budget page tracks.
export function getCurrentMonthExpenses(transactions) {
  const currentMonthKey = getTodayISODate().slice(0, 7)
  return transactions
    .filter(
      (transaction) =>
        transaction.type === TRANSACTION_TYPES.EXPENSE &&
        transaction.date.startsWith(currentMonthKey),
    )
    .reduce((total, transaction) => total + transaction.amount, 0)
}
