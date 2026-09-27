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
      {/* Two-column layout: 340px form column + fluid list column,
          collapsing to one column below 860px. */}
      <div className="mb-6">
        <h1 className="m-0 mb-1 text-[clamp(1.4rem,3vw,1.8rem)] leading-[1.25]">Transactions</h1>
        <p className="m-0 text-muted">
          Add income and expenses, then filter, sort, or remove entries.
        </p>
      </div>

      <div className="mt-5 grid items-start gap-5 [grid-template-columns:minmax(0,340px)_minmax(0,1fr)] max-[860px]:[grid-template-columns:1fr]">
        <div className="flex min-w-0 flex-col gap-5">
          <TransactionForm onAdd={onAddTransaction} />
        </div>

        <div className="flex min-w-0 flex-col gap-5">
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
          <p className="mt-3.5 text-center text-[0.9rem] text-muted">
            Showing {visibleTransactions.length} of {transactions.length}{' '}
            transactions
          </p>
        </div>
      </div>
    </>
  )
}
