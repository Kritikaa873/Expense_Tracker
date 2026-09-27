import { formatCurrency } from '../utils/format'

export default function BudgetWarning({ monthlyBudget, currentMonthExpenses }) {
  const budget = Number(monthlyBudget)

  // No budget (empty or invalid input) -> show nothing at all.
  if (!Number.isFinite(budget) || budget <= 0) {
    return null
  }

  // The meter is capped at 100% even when spending goes over budget.
  const isOverBudget = currentMonthExpenses > budget
  const ratio = Math.min(currentMonthExpenses / budget, 1)
  const percentUsed = Math.round(ratio * 100)
  const remaining = budget - currentMonthExpenses

  // Red palette when over budget, green when on track.
  const colorClasses = isOverBudget
    ? 'border-over-border bg-over-bg text-over-text'
    : 'border-ok-border bg-ok-bg text-ok-text'

  const statusText = isOverBudget ? (
    <>
      <p className="m-0 mb-1 font-bold">⚠️ Over budget for this month</p>
      <p className="m-0 text-[0.9rem]">
        You have spent {formatCurrency(currentMonthExpenses)} of your{' '}
        {formatCurrency(budget)} limit — {formatCurrency(currentMonthExpenses - budget)} over.
        Consider slowing down spending for the rest of the month.
      </p>
    </>
  ) : (
    <>
      <p className="m-0 mb-1 font-bold">
        On track: {percentUsed}% of your monthly budget used
      </p>
      <p className="m-0 text-[0.9rem]">
        {formatCurrency(remaining)} remaining of {formatCurrency(budget)}.
      </p>
    </>
  )

  return (
    <section
      className={`mt-5 rounded-xl border p-[1.1rem_1.25rem] shadow-card ${colorClasses}`}
      role={isOverBudget ? 'alert' : 'status'}
      aria-label="Budget status"
    >
      {statusText}
      <div
        className="mt-2.5 h-2 overflow-hidden rounded-full bg-meter-track"
        role="progressbar"
        aria-valuenow={percentUsed}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Width is a percentage, so it must stay inline. */}
        <div
          className={`h-full rounded-full transition-all duration-200 ${
            isOverBudget ? 'bg-expense' : 'bg-income'
          }`}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </section>
  )
}
