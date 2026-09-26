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

  const handleChangeBudget = (value) => {
    setMonthlyBudget(value)
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
    <div className="app-shell">
      <Header />
      <main className="container">
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
                onChangeBudget={handleChangeBudget}
              />
            }
          />
          <Route path="/monthly" element={<MonthlyPage monthlySummary={monthlySummary} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">
          Data is saved locally in your browser via localStorage — nothing leaves your device.
        </div>
      </footer>
    </div>
  )
}

function NotFound() {
  return (
    <div className="empty-state">
      <p className="empty-title">Page not found</p>
      <p className="empty-hint">Use the navigation above to get back on track.</p>
    </div>
  )
}
