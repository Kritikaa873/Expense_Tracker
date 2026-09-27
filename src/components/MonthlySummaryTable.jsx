import { formatCurrency, formatMonthLabel } from '../utils/format'

export default function MonthlySummaryTable({ monthlySummary }) {
  if (monthlySummary.length === 0) {
    return (
      <div className="rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card">
        <p className="m-0 mb-1 font-bold">Nothing to summarize yet</p>
        <p className="m-0 text-[0.92rem] text-muted">
          Once you add transactions, they will be grouped into a monthly summary here.
        </p>
      </div>
    )
  }

  return (
    // min-width on the table + overflow on the wrapper = horizontal
    // scrolling on phones instead of a squashed table.
    <div className="overflow-x-auto rounded-xl border border-border-soft bg-surface shadow-card">
      <table className="w-full min-w-[540px] border-collapse">
        <thead>
          <tr>
            {['Month', 'Income', 'Expenses', 'Net', 'Transactions'].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="border-b border-border-soft bg-background px-4 py-2.5 text-left text-[0.78rem] tracking-wider text-muted uppercase"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthlySummary.map((month, index) => {
            // The original CSS dropped the bottom border on the last row,
            // so the card's own edge is the final line.
            const isLastRow = index === monthlySummary.length - 1
            // One helper builds every cell's classes, so the border logic
            // isn't repeated five times.
            const cell = (extraClasses = '') =>
              `px-4 py-2.5 text-left tabular-nums ${extraClasses}${isLastRow ? '' : ' border-b border-border-soft'}`
            return (
              <tr key={month.monthKey}>
                <td className={cell()}>{formatMonthLabel(month.monthKey)}</td>
                <td className={cell('font-bold text-income')}>{formatCurrency(month.income)}</td>
                <td className={cell('font-bold text-expense')}>{formatCurrency(month.expenses)}</td>
                <td className={cell(month.net >= 0 ? 'text-income' : 'text-expense')}>
                  {formatCurrency(month.net)}
                </td>
                <td className={cell()}>{month.count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
