import { useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { useLocalStorage } from './hooks/useLocalStorage'
import BudgetPage from './pages/BudgetPage'
import DashboardPage from './pages/DashboardPage'
import MonthlyPage from './pages/MonthlyPage'
import TransactionsPage from './pages/TransactionsPage'
import { STORAGE_KEYS } from './utils/storage'
import {
  ALL_CATEGORIES,
  SORT_MODES,
  filterTransactions,
  getMonthlySummary,
  getTotals,
  sortTransactions,
} from './utils/transactions'

export default function App() {
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEYS.transactions, [])
  const [monthlyBudget, setMonthlyBudget] = useLocalStorage(STORAGE_KEYS.monthlyBudget, '')

  const [filters, setFilters] = useState({
    category: ALL_CATEGORIES,
    sortMode: SORT_MODES.NEWEST,
  })

  const handleAddTransaction = (newTransaction) => {
    setTransactions((previous) => [newTransaction, ...previous])
  }

  const handleDeleteTransaction = (idToDelete) => {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== idToDelete),
    )
  }

  const handleSelectCategory = (category) => {
    setFilters((previous) => ({ ...previous, category }))
  }

  const handleSelectSortMode = (sortMode) => {
    setFilters((previous) => ({ ...previous, sortMode }))
  }

  const totals = useMemo(() => getTotals(transactions), [transactions])
  const monthlySummary = useMemo(() => getMonthlySummary(transactions), [transactions])
  const visibleTransactions = useMemo(
    () =>
      sortTransactions(
        filterTransactions(transactions, { category: filters.category }),
        filters.sortMode,
      ),
    [transactions, filters],
  )

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink">
      <Header />
      {/* .container: centered max-width column; flex-1 pushes the footer down. */}
      <main className="mx-auto w-full max-w-[1100px] flex-1 px-4 pb-10 pt-6">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                transactions={transactions}
                totals={totals}
                monthlyBudget={monthlyBudget}
              />
            }
          />
          <Route
            path="/transactions"
            element={
              <TransactionsPage
                transactions={transactions}
                visibleTransactions={visibleTransactions}
                filters={filters}
                onAddTransaction={handleAddTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onSelectCategory={handleSelectCategory}
                onSelectSortMode={handleSelectSortMode}
              />
            }
          />
          <Route
            path="/budget"
            element={
              <BudgetPage
                transactions={transactions}
                monthlyBudget={monthlyBudget}
                onChangeBudget={setMonthlyBudget}
              />
            }
          />
          <Route path="/monthly" element={<MonthlyPage monthlySummary={monthlySummary} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="border-t border-border-soft bg-surface py-4 text-[0.85rem] text-muted">
        <div className="mx-auto w-full max-w-[1100px] px-4">
          Data is saved locally in your browser via localStorage — nothing leaves your device.
        </div>
      </footer>
    </div>
  )
}

function NotFound() {
  return (
    <div className="rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card">
      <p className="m-0 mb-1 font-bold">Page not found</p>
      <p className="m-0 text-[0.92rem] text-muted">
        Use the navigation above to get back on track.
      </p>
    </div>
  )
}
