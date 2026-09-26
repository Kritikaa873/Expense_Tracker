import { NavLink } from 'react-router-dom'
import BalanceSummary from '../components/BalanceSummary'
import BudgetWarning from '../components/BudgetWarning'
import ExpenseChart from '../components/ExpenseChart'
import TransactionList from '../components/TransactionList'
import { formatCurrency } from '../utils/format'
import {
  getCurrentMonthExpenses,
  getExpensesByCategory,
} from '../utils/transactions'

const RECENT_TRANSACTION_LIMIT = 5

export default function DashboardPage({ transactions, totals, monthlyBudget }) {
  const currentMonthExpenses = getCurrentMonthExpenses(transactions)
  const expensesByCategory = getExpensesByCategory(transactions)
  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, RECENT_TRANSACTION_LIMIT)

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-intro">
          A quick overview of your balance, budget, and recent activity.
        </p>
      </div>

      <BalanceSummary totals={totals} />

      <BudgetWarning
        monthlyBudget={monthlyBudget}
        currentMonthExpenses={currentMonthExpenses}
      />

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <section className="card" aria-label="Spending by category">
            <h2>Spending by category</h2>
            <ExpenseChart expensesByCategory={expensesByCategory} />
          </section>
          <p className="muted list-footer">
            {transactions.length} transactions total · current month expenses:{' '}
            {formatCurrency(currentMonthExpenses)}
          </p>
        </div>

        <div className="dashboard-column">
          <section className="card" aria-label="Recent transactions">
            <div className="card-heading-row">
              <h2>Recent activity</h2>
              <NavLink to="/transactions" className="card-link">
                View all →
              </NavLink>
            </div>
            <TransactionList
              transactions={recentTransactions}
              emptyTitle="No activity yet"
              emptyHint="Head to the Transactions page to add your first entry."
            />
          </section>
        </div>
      </div>
    </>
  )
}
