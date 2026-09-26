import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/format'

const PIE_COLORS = [
  '#0ea5e9',
  '#8b5cf6',
  '#f59e0b',
  '#10b981',
  '#ef4444',
  '#3b82f6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#64748b',
]

export default function ExpenseChart({ expensesByCategory }) {
  if (expensesByCategory.length === 0) {
    return (
      <div className="empty-state compact">
        <p className="empty-title">No expenses to chart yet</p>
        <p className="empty-hint">Add an expense and your spending breakdown will appear here.</p>
      </div>
    )
  }

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expensesByCategory}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={2}
            stroke="var(--surface)"
          >
            {expensesByCategory.map((entry, index) => (
              <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
