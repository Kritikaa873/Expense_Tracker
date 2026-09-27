import { NavLink } from 'react-router-dom'
import BalanceSummary from '../components/BalanceSummary'
import BudgetWarning from '../components/BudgetWarning'
import ExpenseChart from '../components/ExpenseChart'
import TransactionList from '../components/TransactionList'
import { formatCurrency } from '../utils/format'
import {
  SORT_MODES,
  getCurrentMonthExpenses,
  getExpensesByCategory,
  sortTransactions,
} from '../utils/transactions'

// How many entries the "Recent activity" card shows.
const RECENT_TRANSACTION_LIMIT = 5

export default function DashboardPage({ transactions, totals, monthlyBudget }) {
  const currentMonthExpenses = getCurrentMonthExpenses(transactions)
  const expensesByCategory = getExpensesByCategory(transactions)
  // Reuse the same newest-first sort as the transactions list, then take 5.
  const recentTransactions = sortTransactions(
    transactions,
    SORT_MODES.NEWEST,
  ).slice(0, RECENT_TRANSACTION_LIMIT)

  return (
    <>
      <div className="mb-6">
        <h1 className="m-0 mb-1 text-[clamp(1.4rem,3vw,1.8rem)] leading-[1.25]">Dashboard</h1>
        <p className="m-0 text-muted">
          A quick overview of your balance, budget, and recent activity.
        </p>
      </div>

      <BalanceSummary totals={totals} />

      <BudgetWarning
        monthlyBudget={monthlyBudget}
        currentMonthExpenses={currentMonthExpenses}
      />

      {/* Two-column grid, collapsing to one column below 860px. */}
      <div className="mt-5 grid items-start gap-5 [grid-template-columns:minmax(0,340px)_minmax(0,1fr)] max-[860px]:[grid-template-columns:1fr]">
        <div className="flex min-w-0 flex-col gap-5">
          <section
            className="rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card"
            aria-label="Spending by category"
          >
            <h2 className="m-0 mb-3 text-[1.05rem] leading-[1.25]">Spending by category</h2>
            <ExpenseChart expensesByCategory={expensesByCategory} />
          </section>
          <p className="text-center text-[0.9rem] text-muted">
            {transactions.length} transactions total · current month expenses:{' '}
            {formatCurrency(currentMonthExpenses)}
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <section
            className="rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card"
            aria-label="Recent transactions"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="m-0 mb-3 text-[1.05rem] leading-[1.25]">Recent activity</h2>
              <NavLink
                to="/transactions"
                className="whitespace-nowrap text-[0.9rem] font-semibold text-primary-dark no-underline hover:underline"
              >
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
