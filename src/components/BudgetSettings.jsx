const BUDGET_PRESETS = [5000, 10000, 25000, 50000]

export default function BudgetSettings({ monthlyBudget, onChangeBudget }) {
  return (
    <section className="card budget-card" aria-label="Monthly budget limit">
      <h2>Monthly budget</h2>
      <p className="muted">Compare your spending in the current calendar month against this limit.</p>

      <label className="field-label" htmlFor="budget-input">Limit (₹ per month)</label>
      <input
        id="budget-input"
        type="number"
        inputMode="decimal"
        min="0"
        step="10"
        placeholder="e.g. 15000"
        value={monthlyBudget}
        onChange={(event) => onChangeBudget(event.target.value)}
      />

      <div className="preset-row">
        {BUDGET_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className="button small"
            onClick={() => onChangeBudget(String(preset))}
          >
            ₹{preset}
          </button>
        ))}
        <button
          type="button"
          className="button small ghost"
          onClick={() => onChangeBudget('')}
        >
          Clear
        </button>
      </div>
    </section>
  )
}
