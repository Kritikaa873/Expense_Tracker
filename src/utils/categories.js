export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Groceries',
  'Transport',
  'Housing',
  'Bills & Utilities',
  'Health',
  'Entertainment',
  'Shopping',
  'Travel',
  'Other',
]

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Business',
  'Investments',
  'Gifts',
  'Other',
]

export function getCategoriesForType(type) {
  return type === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}
