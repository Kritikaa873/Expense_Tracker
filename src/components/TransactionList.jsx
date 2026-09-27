import TransactionItem from './TransactionItem'

export default function TransactionList({
  transactions,
  onDelete,
  emptyTitle = 'No transactions here yet',
  emptyHint = 'Add your first income or expense with the form, or relax the filters to see more.',
}) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card">
        <p className="m-0 mb-1 font-bold">{emptyTitle}</p>
        <p className="m-0 text-[0.92rem] text-muted">{emptyHint}</p>
      </div>
    )
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
