import { formatCurrency, formatDateForDisplay } from '../utils/format'

export default function TransactionItem({ transaction, onDelete }) {
  const { id, type, amount, category, description, date } = transaction

  return (
    <li className={`transaction-item ${type}`}>
      <div className="transaction-main">
        <span className="transaction-description">{description}</span>
        <span className="transaction-meta">{category} · {formatDateForDisplay(date)}</span>
      </div>
      <div className="transaction-side">
        <span className={`transaction-amount ${type === 'income' ? 'positive' : 'negative'}`}>
          {type === 'income' ? '+' : '−'}{formatCurrency(amount)}
        </span>
        {onDelete && (
          <button
            type="button"
            className="button danger small"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${description} on ${date}`}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  )
}
