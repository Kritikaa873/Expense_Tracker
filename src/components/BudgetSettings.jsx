const BUDGET_PRESETS = [5000, 10000, 25000, 50000]

export default function BudgetSettings({ monthlyBudget, onChangeBudget }) {
  return (
    // The old ".card" style: white panel with border, radius and shadow.
    <section
      className="rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card"
      aria-label="Monthly budget limit"
    >
      <h2 className="m-0 mb-3 text-[1.05rem] leading-[1.25]">Monthly budget</h2>
      <p className="mb-5 mt-0 text-[0.9rem] text-muted">
        Compare your spending in the current calendar month against this limit.
      </p>

      <label
        className="mb-1 block text-[0.82rem] font-bold tracking-[0.03em] text-muted uppercase"
        htmlFor="budget-input"
      >
        Limit (₹ per month)
      </label>
      <input
        id="budget-input"
        type="number"
        inputMode="decimal"
        min="0"
        step="10"
        placeholder="e.g. 15000"
        className="w-full rounded-lg border border-border-soft bg-surface px-2.5 py-2 font-[inherit] text-[inherit] text-ink"
        value={monthlyBudget}
        onChange={(event) => onChangeBudget(event.target.value)}
      />

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {BUDGET_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className="rounded-lg border border-border-soft bg-surface px-2.5 py-1.5 text-[0.85rem] font-semibold text-ink transition-colors hover:bg-background"
            onClick={() => onChangeBudget(String(preset))}
          >
            ₹{preset}
          </button>
        ))}
        <button
          type="button"
          className="rounded-lg border border-transparent bg-transparent px-2.5 py-1.5 text-[0.85rem] font-semibold text-ink transition-colors hover:bg-background"
          onClick={() => onChangeBudget('')}
        >
          Clear
        </button>
      </div>
    </section>
  )
}
