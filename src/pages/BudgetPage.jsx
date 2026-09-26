import BudgetSettings from '../components/BudgetSettings'
import BudgetWarning from '../components/BudgetWarning'
import ExpenseChart from '../components/ExpenseChart'
import { formatCurrency, getTodayISODate } from '../utils/format'
import {
  getCurrentMonthExpenses,
  getExpensesByCategory,
} from '../utils/transactions'

export default function BudgetPage({ transactions, monthlyBudget, onChangeBudget }) {
  const currentMonthExpenses = getCurrentMonthExpenses(transactions)
  const budget = Number(monthlyBudget)
  const hasBudget = Number.isFinite(budget) && budget > 0
  const remaining = hasBudget ? budget - currentMonthExpenses : null
  const currentMonthKey = getTodayISODate().slice(0, 7)
  const currentMonthTransactions = transactions.filter((transaction) =>
    transaction.date.startsWith(currentMonthKey),
  )
  const monthExpensesByCategory = getExpensesByCategory(currentMonthTransactions)

  return (
    <>
      <div className="page-header">
        <h1>Budget</h1>
        <p className="page-intro">
          Set a monthly spending limit and see how the current month stacks up.
        </p>
      </div>

      <BudgetWarning
        monthlyBudget={monthlyBudget}
        currentMonthExpenses={currentMonthExpenses}
      />

      {!hasBudget && (
        <div className="empty-state budget-hint">
          <p className="empty-title">No budget set yet</p>
          <p className="empty-hint">
            Enter a monthly limit below and this page will track your progress.
          </p>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <BudgetSettings monthlyBudget={monthlyBudget} onChangeBudget={onChangeBudget} />
        </div>

        <div className="dashboard-column wide">
          <section className="card" aria-label="Current month spending">
            <h2>This month at a glance</h2>
            <dl className="stat-list">
              <div className="stat-row">
                <dt>Spent so far</dt>
                <dd>{formatCurrency(currentMonthExpenses)}</dd>
              </div>
              <div className="stat-row">
                <dt>Monthly limit</dt>
                <dd>{hasBudget ? formatCurrency(budget) : 'Not set'}</dd>
              </div>
              <div className="stat-row">
                <dt>Remaining</dt>
                <dd className={remaining !== null && remaining < 0 ? 'negative' : 'positive'}>
                  {remaining !== null ? formatCurrency(remaining) : '—'}
                </dd>
              </div>
            </dl>
          </section>

          <section className="card" aria-label="This month by category">
            <h2>Where the money went this month</h2>
            <ExpenseChart expensesByCategory={monthExpensesByCategory} />
          </section>
        </div>
      </div>
    </>
  )
}
