import { formatCurrency, formatMonthLabel } from '../utils/format'

export default function MonthlySummaryTable({ monthlySummary }) {
  if (monthlySummary.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">Nothing to summarize yet</p>
        <p className="empty-hint">
          Once you add transactions, they will be grouped into a monthly summary here.
        </p>
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <table className="summary-table">
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Income</th>
            <th scope="col">Expenses</th>
            <th scope="col">Net</th>
            <th scope="col">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {monthlySummary.map((month) => (
            <tr key={month.monthKey}>
              <td>{formatMonthLabel(month.monthKey)}</td>
              <td className="positive">{formatCurrency(month.income)}</td>
              <td className="negative">{formatCurrency(month.expenses)}</td>
              <td className={month.net >= 0 ? 'positive' : 'negative'}>
                {formatCurrency(month.net)}
              </td>
              <td>{month.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
