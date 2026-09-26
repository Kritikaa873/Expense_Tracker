import TransactionItem from './TransactionItem'

export default function TransactionList({
  transactions,
  onDelete,
  emptyTitle = 'No transactions here yet',
  emptyHint = 'Add your first income or expense with the form, or relax the filters to see more.',
}) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">{emptyTitle}</p>
        <p className="empty-hint">{emptyHint}</p>
      </div>
    )
  }

  return (
    <ul className="transaction-list">
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
