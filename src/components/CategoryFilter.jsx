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
  const uniqueCategoryOptions = [...new Set(categoryOptions)]

  return (
    <section className="filter-bar" aria-label="Filter and sort transactions">
      <div className="field inline">
        <label className="field-label" htmlFor="filter-category">Category</label>
        <select
          id="filter-category"
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
      <div className="field inline">
        <label className="field-label" htmlFor="filter-sort">Sort by</label>
        <select
          id="filter-sort"
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
