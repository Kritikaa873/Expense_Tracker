import { formatCurrency } from '../utils/format'

export default function BudgetWarning({ monthlyBudget, currentMonthExpenses }) {
  const budget = Number(monthlyBudget)

  if (!Number.isFinite(budget) || budget <= 0) {
    return null
  }

  const isOverBudget = currentMonthExpenses > budget
  const ratio = Math.min(currentMonthExpenses / budget, 1)
  const percentUsed = Math.round(ratio * 100)
  const remaining = budget - currentMonthExpenses

  return (
    <section
      className={`budget-status ${isOverBudget ? 'over' : 'ok'}`}
      role={isOverBudget ? 'alert' : 'status'}
      aria-label="Budget status"
    >
      {isOverBudget ? (
        <>
          <p className="budget-status-title">⚠️ Over budget for this month</p>
          <p>
            You have spent {formatCurrency(currentMonthExpenses)} of your{' '}
            {formatCurrency(budget)} limit — {formatCurrency(currentMonthExpenses - budget)} over.
            Consider slowing down spending for the rest of the month.
          </p>
        </>
      ) : (
        <>
          <p className="budget-status-title">
            On track: {percentUsed}% of your monthly budget used
          </p>
          <p>
            {formatCurrency(remaining)} remaining of {formatCurrency(budget)}.
          </p>
        </>
      )}
      <div
        className="budget-meter"
        role="progressbar"
        aria-valuenow={percentUsed}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="budget-meter-fill" style={{ width: `${ratio * 100}%` }} />
      </div>
    </section>
  )
}
