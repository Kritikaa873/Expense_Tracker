import { formatCurrency, formatDateForDisplay } from '../utils/format'

export default function TransactionItem({ transaction, onDelete }) {
  const { id, type, amount, category, description, date } = transaction

  return (
    <li
      className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl border border-border-soft border-l-4 bg-surface px-4 py-3 shadow-card ${
        type === 'income' ? 'border-l-income' : 'border-l-expense'
      }`}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-semibold break-all">{description}</span>
        <span className="text-[0.83rem] text-muted">{category} · {formatDateForDisplay(date)}</span>
      </div>
      <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between">
        <span
          className={`font-extrabold tabular-nums whitespace-nowrap ${
            type === 'income' ? 'text-income' : 'text-expense'
            }`}
        >
          {type === 'income' ? '+' : '−'}{formatCurrency(amount)}
        </span>
        {onDelete && (
          <button
            type="button"
            className="rounded-lg border border-border-soft bg-surface px-2.5 py-1.5 text-[0.85rem] font-semibold transition-colors hover:border-over-border hover:bg-over-bg hover:text-over-text"
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
