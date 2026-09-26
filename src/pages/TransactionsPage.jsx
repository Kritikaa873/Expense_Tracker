import CategoryFilter from '../components/CategoryFilter'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'

export default function TransactionsPage({
  transactions,
  visibleTransactions,
  filters,
  onAddTransaction,
  onDeleteTransaction,
  onSelectCategory,
  onSelectSortMode,
}) {
  return (
    <>
      <div className="page-header">
        <h1>Transactions</h1>
        <p className="page-intro">
          Add income and expenses, then filter, sort, or remove entries.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <TransactionForm onAdd={onAddTransaction} />
        </div>

        <div className="dashboard-column wide">
          <CategoryFilter
            selectedCategory={filters.category}
            onSelectCategory={onSelectCategory}
            sortMode={filters.sortMode}
            onSelectSortMode={onSelectSortMode}
          />
          <TransactionList
            transactions={visibleTransactions}
            onDelete={onDeleteTransaction}
          />
          <p className="muted list-footer">
            Showing {visibleTransactions.length} of {transactions.length}{' '}
            transactions
          </p>
        </div>
      </div>
    </>
  )
}
