import { TRANSACTION_TYPES, getCategoriesForType } from '../utils/categories'
import { ALL_CATEGORIES, SORT_MODES } from '../utils/transactions'

const SORT_OPTIONS = [
  { value: SORT_MODES.NEWEST, label: 'Date: newest first' },
  { value: SORT_MODES.OLDEST, label: 'Date: oldest first' },
  { value: SORT_MODES.AMOUNT_HIGH, label: 'Amount: high to low' },
  { value: SORT_MODES.AMOUNT_LOW, label: 'Amount: low to high' },
]

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  sortMode,
  onSelectSortMode,
}) {
  const categoryOptions = [
    ALL_CATEGORIES,
    ...getCategoriesForType(TRANSACTION_TYPES.EXPENSE),
    ...getCategoriesForType(TRANSACTION_TYPES.INCOME),
  ]
  // Expense and income categories both contain "Other" — dedupe so the
  // dropdown doesn't list it twice.
  const uniqueCategoryOptions = [...new Set(categoryOptions)]

  return (
    <section
      className="flex flex-wrap items-end gap-3 rounded-xl border border-border-soft bg-surface p-[0.9rem_1.25rem] shadow-card"
      aria-label="Filter and sort transactions"
    >
      <div className="flex min-w-[190px] flex-col gap-1 max-[480px]:min-w-full">
        <label
          className="text-[0.82rem] font-bold tracking-[0.03em] text-muted uppercase"
          htmlFor="filter-category"
        >
          Category
        </label>
        <select
          id="filter-category"
          className="w-full rounded-lg border border-border-soft bg-surface px-2.5 py-2 font-[inherit] text-[inherit] text-ink"
          value={selectedCategory}
          onChange={(event) => onSelectCategory(event.target.value)}
        >
          {uniqueCategoryOptions.map((category) => (
            <option key={category} value={category}>
              {category === ALL_CATEGORIES ? 'All categories' : category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex min-w-[190px] flex-col gap-1 max-[480px]:min-w-full">
        <label
          className="text-[0.82rem] font-bold tracking-[0.03em] text-muted uppercase"
          htmlFor="filter-sort"
        >
          Sort by
        </label>
        <select
          id="filter-sort"
          className="w-full rounded-lg border border-border-soft bg-surface px-2.5 py-2 font-[inherit] text-[inherit] text-ink"
          value={sortMode}
          onChange={(event) => onSelectSortMode(event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </section>
  )
}
