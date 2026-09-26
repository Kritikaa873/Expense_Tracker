import { formatCurrency } from '../utils/format'

export default function BalanceSummary({ totals }) {
  const { income, expenses, balance } = totals
  const balanceClass = balance > 0 ? 'positive' : balance < 0 ? 'negative' : ''

  return (
    <section className="balance-summary" aria-label="Balance summary">
      <div className={`balance-card total ${balanceClass}`}>
        <span className="balance-label">Current Balance</span>
        <span className="balance-amount">{formatCurrency(balance)}</span>
        <span className="balance-hint">income minus expenses</span>
      </div>
      <div className="balance-card income">
        <span className="balance-label">Income</span>
        <span className="balance-amount">{formatCurrency(income)}</span>
        <span className="balance-hint">money in</span>
      </div>
      <div className="balance-card expense">
        <span className="balance-label">Expenses</span>
        <span className="balance-amount">{formatCurrency(expenses)}</span>
        <span className="balance-hint">money out</span>
      </div>
    </section>
  )
}
