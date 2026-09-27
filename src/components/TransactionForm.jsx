import { useState } from 'react'
import { TRANSACTION_TYPES, getCategoriesForType } from '../utils/categories'
import { getTodayISODate } from '../utils/format'
import { createTransaction } from '../utils/transactions'

const EMPTY_FORM = {
  type: TRANSACTION_TYPES.EXPENSE,
  amount: '',
  category: '',
  description: '',
  date: '',
}

// The two radio choices for the "Type" field.
const TYPE_OPTIONS = [
  { value: TRANSACTION_TYPES.EXPENSE, label: 'Expense' },
  { value: TRANSACTION_TYPES.INCOME, label: 'Income' },
]

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, date: getTodayISODate() })
  const [errors, setErrors] = useState({})

  const categories = getCategoriesForType(form.type)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previousForm) => {
      const nextForm = { ...previousForm, [name]: value }
      // Switching type clears the category, since income and expense
      // have different category lists.
      if (name === 'type') {
        nextForm.category = ''
      }
      return nextForm
    })
  }

  function validate(values) {
    const nextErrors = {}
    const amount = Number(values.amount)

    if (values.description.trim() === '') {
      nextErrors.description = 'Please enter a short description.'
    }
    if (values.amount.trim() === '') {
      nextErrors.amount = 'Please enter an amount.'
    } else if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.amount = 'Amount must be a number greater than zero.'
    }
    if (values.category === '') {
      nextErrors.category = 'Please pick a category.'
    }
    if (values.date === '') {
      nextErrors.date = 'Please pick a date.'
    }
    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onAdd(
      createTransaction({
        type: form.type,
        amount: Number(form.amount),
        category: form.category,
        description: form.description.trim(),
        date: form.date,
      }),
    )

    // Keep the chosen type and today's date so several entries
    // can be added in a row without retyping them.
    setForm({ ...EMPTY_FORM, type: form.type, date: getTodayISODate() })
    setErrors({})
  }

  // Shared input classes so every control looks and behaves identically.
  const controlClass =
    'w-full rounded-lg border border-border-soft bg-surface px-2.5 py-2 font-[inherit] text-[inherit] text-ink'
  const labelClass =
    'text-[0.82rem] font-bold tracking-[0.03em] text-muted uppercase'

  return (
    <section
      className="flex flex-col gap-[0.85rem] rounded-xl border border-border-soft bg-surface p-[1.1rem_1.25rem] shadow-card"
      aria-label="Add a transaction"
    >
      <h2 className="m-0 mb-3 text-[1.05rem] leading-[1.25]">Add transaction</h2>
      <form className="flex flex-col gap-[0.85rem]" onSubmit={handleSubmit} noValidate>
        {/* Type toggle: pill-shaped radio buttons. */}
        <fieldset className="m-0 flex gap-2 border-0 p-0 max-[480px]:flex-col">
          <legend className="mb-[0.4rem] p-0 text-[0.82rem] font-bold tracking-[0.03em] text-muted uppercase">
            Type
          </legend>
          {TYPE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-[0.6rem] py-[0.45rem] text-[0.92rem] font-semibold ${
                form.type === option.value
                  ? 'border-primary bg-sky-tint text-primary-dark'
                  : 'border-border-soft'
              }`}
            >
              <input
                type="radio"
                name="type"
                value={option.value}
                checked={form.type === option.value}
                onChange={handleChange}
                className="m-0 w-auto accent-primary"
              />
              {option.label}
            </label>
          ))}
        </fieldset>

        <div className="flex flex-col gap-[0.3rem]">
          <label className={labelClass} htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            className={controlClass}
            value={form.amount}
            onChange={handleChange}
            aria-invalid={errors.amount ? 'true' : undefined}
          />
          {errors.amount && (
            <p className="m-0 text-[0.82rem] font-semibold text-expense" role="alert">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[0.3rem]">
          <label className={labelClass} htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className={controlClass}
            value={form.category}
            onChange={handleChange}
            aria-invalid={errors.category ? 'true' : undefined}
          >
            <option value="">Select a category…</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && (
            <p className="m-0 text-[0.82rem] font-semibold text-expense" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[0.3rem]">
          <label className={labelClass} htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="e.g. Weekly groceries"
            maxLength={80}
            className={controlClass}
            value={form.description}
            onChange={handleChange}
            aria-invalid={errors.description ? 'true' : undefined}
          />
          {errors.description && (
            <p className="m-0 text-[0.82rem] font-semibold text-expense" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[0.3rem]">
          <label className={labelClass} htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            className={controlClass}
            value={form.date}
            onChange={handleChange}
            aria-invalid={errors.date ? 'true' : undefined}
          />
          {errors.date && (
            <p className="m-0 text-[0.82rem] font-semibold text-expense" role="alert">
              {errors.date}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary px-3.5 py-2 font-[inherit] font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Add transaction
        </button>
      </form>
    </section>
  )
}
