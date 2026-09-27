import BudgetSettings from '../components/BudgetSettings'
import BudgetWarning from '../components/BudgetWarning'
import ExpenseChart from '../components/ExpenseChart'
import { formatCurrency, getTodayISODate } from '../utils/format'
import {
  getCurrentMonthExpenses,
  getExpensesByCategory,
} from '../utils/transactions'

export default function BudgetPage({ transactions, monthlyBudget, onChangeBudget }) {
  // Budget math: "remaining" can go negative (that's how we show overspending).
  // Everything keying off the budget is null/"Not set" until a limit is entered.
  const currentMonthExpenses = getCurrentMonthExpenses(transactions)
  const budget = Number(monthlyBudget)
  const hasBudget = Number.isFinite(budget) && budget > 0
  const remaining = hasBudget ? budget - currentMonthExpenses : null

  // A month key like "2026-09" matches every date that starts with it,
  // so this keeps all of this month's transactions.
  const currentMonthKey = getTodayISODate().slice(0, 7)
  const currentMonthTransactions = transactions.filter((transaction) =>
    transaction.date.startsWith(currentMonthKey),
  )
  const monthExpensesByCategory = getExpensesByCategory(currentMonthTransactions)

  return (
    <>
      <div className="mb-6">
        <h1 className="m-0 mb-1 text-[clamp(1.4rem,3vw,1.8rem)] leading-[1.25]">Budget</h1>
        <p className="m-0 text-muted">
          Set a monthly spending limit and see how the current month stacks up.
        </p>
      </div>

      <BudgetWarning
        monthlyBudget={monthlyBudget}
        currentMonthExpenses={currentMonthExpenses}
      />

      {!hasBudget && (
        <div className="mb-5 rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card">
          <p className="m-0 mb-1 font-bold">No budget set yet</p>
          <p className="m-0 text-[0.92rem] text-muted">
            Enter a monthly limit below and this page will track your progress.
          </p>
        </div>
      )}

      {/* Two-column grid, collapsing to one column below 860px. */}
      <div className="mt-5 grid items-start gap-5 [grid-template-columns:minmax(0,340px)_minmax(0,1fr)] max-[860px]:[grid-template-columns:1fr]">
        <div className="flex min-w-0 flex-col gap-5">
          <BudgetSettings monthlyBudget={monthlyBudget} onChangeBudget={onChangeBudget} />
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <section
            className="rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card"
            aria-label="Current month spending"
          >
            <h2 className="m-0 mb-3 text-[1.05rem] leading-[1.25]">This month at a glance</h2>
            <dl className="m-0 flex flex-col">
              <div className="flex items-baseline justify-between gap-4 border-b border-border-soft py-2.5">
                <dt className="text-[0.92rem] text-muted">Spent so far</dt>
                <dd className="m-0 font-bold tabular-nums">
                  {formatCurrency(currentMonthExpenses)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-border-soft py-2.5">
                <dt className="text-[0.92rem] text-muted">Monthly limit</dt>
                <dd className="m-0 font-bold tabular-nums">
                  {hasBudget ? formatCurrency(budget) : 'Not set'}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-[0.92rem] text-muted">Remaining</dt>
                {/* Last row: no bottom border (the card edge closes it). */}
                <dd
                  className={`m-0 font-bold tabular-nums ${
                    remaining !== null && remaining < 0 ? 'text-expense' : 'text-income'
                  }`}
                >
                  {remaining !== null ? formatCurrency(remaining) : '—'}
                </dd>
              </div>
            </dl>
          </section>

          <section
            className="rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card"
            aria-label="This month by category"
          >
            <h2 className="m-0 mb-3 text-[1.05rem] leading-[1.25]">
              Where the money went this month
            </h2>
            <ExpenseChart expensesByCategory={monthExpensesByCategory} />
          </section>
        </div>
      </div>
    </>
  )
}
