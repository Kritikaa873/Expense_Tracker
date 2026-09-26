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

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, date: getTodayISODate() })
  const [errors, setErrors] = useState({})

  const categories = getCategoriesForType(form.type)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previousForm) => {
      const nextForm = { ...previousForm, [name]: value }
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

    setForm({ ...EMPTY_FORM, type: form.type, date: getTodayISODate() })
    setErrors({})
  }

  return (
    <section className="card form-card" aria-label="Add a transaction">
      <h2>Add transaction</h2>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="type-toggle">
          <legend className="field-label">Type</legend>
          <label className={`type-option${form.type === TRANSACTION_TYPES.EXPENSE ? ' selected' : ''}`}>
            <input
              type="radio"
              name="type"
              value={TRANSACTION_TYPES.EXPENSE}
              checked={form.type === TRANSACTION_TYPES.EXPENSE}
              onChange={handleChange}
            />
            Expense
          </label>
          <label className={`type-option${form.type === TRANSACTION_TYPES.INCOME ? ' selected' : ''}`}>
            <input
              type="radio"
              name="type"
              value={TRANSACTION_TYPES.INCOME}
              checked={form.type === TRANSACTION_TYPES.INCOME}
              onChange={handleChange}
            />
            Income
          </label>
        </fieldset>

        <div className="field">
          <label className="field-label" htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
            aria-invalid={errors.amount ? 'true' : undefined}
          />
          {errors.amount && <p className="field-error" role="alert">{errors.amount}</p>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            aria-invalid={errors.category ? 'true' : undefined}
          >
            <option value="">Select a category…</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="field-error" role="alert">{errors.category}</p>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="e.g. Weekly groceries"
            maxLength={80}
            value={form.description}
            onChange={handleChange}
            aria-invalid={errors.description ? 'true' : undefined}
          />
          {errors.description && <p className="field-error" role="alert">{errors.description}</p>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            aria-invalid={errors.date ? 'true' : undefined}
          />
          {errors.date && <p className="field-error" role="alert">{errors.date}</p>}
        </div>

        <button type="submit" className="button primary full-width">Add transaction</button>
      </form>
    </section>
  )
}
