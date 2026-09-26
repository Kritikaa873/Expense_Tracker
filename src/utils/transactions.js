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
  return `tx-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function filterTransactions(transactions, { category = ALL_CATEGORIES } = {}) {
  if (category === ALL_CATEGORIES) {
    return transactions
  }
  return transactions.filter((transaction) => transaction.category === category)
}

export function sortTransactions(transactions, mode = SORT_MODES.NEWEST) {
  const copy = [...transactions]
  switch (mode) {
    case SORT_MODES.OLDEST:
      return copy.sort((a, b) => a.date.localeCompare(b.date))
    case SORT_MODES.AMOUNT_HIGH:
      return copy.sort((a, b) => b.amount - a.amount)
    case SORT_MODES.AMOUNT_LOW:
      return copy.sort((a, b) => a.amount - b.amount)
    case SORT_MODES.NEWEST:
    default:
      return copy.sort((a, b) => b.date.localeCompare(a.date))
  }
}

export function getTotals(transactions) {
  let income = 0
  let expenses = 0
  for (const transaction of transactions) {
    if (transaction.type === TRANSACTION_TYPES.INCOME) {
      income += transaction.amount
    } else {
      expenses += transaction.amount
    }
  }
  return { income, expenses, balance: income - expenses }
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
  return [...totalsByCategory.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export function getMonthlySummary(transactions) {
  const monthsByKey = new Map()
  for (const transaction of transactions) {
    const monthKey = transaction.date.slice(0, 7)
    if (!monthsByKey.has(monthKey)) {
      monthsByKey.set(monthKey, { monthKey, income: 0, expenses: 0, count: 0 })
    }
    const month = monthsByKey.get(monthKey)
    if (transaction.type === TRANSACTION_TYPES.INCOME) {
      month.income += transaction.amount
    } else {
      month.expenses += transaction.amount
    }
    month.count += 1
  }
  return [...monthsByKey.values()]
    .map((month) => ({ ...month, net: month.income - month.expenses }))
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey))
}

export function getCurrentMonthExpenses(transactions) {
  const currentMonthKey = getTodayISODate().slice(0, 7)
  return transactions.reduce((total, transaction) => {
    const isCurrentMonthExpense =
      transaction.type === TRANSACTION_TYPES.EXPENSE &&
      transaction.date.startsWith(currentMonthKey)
    return isCurrentMonthExpense ? total + transaction.amount : total
  }, 0)
}
