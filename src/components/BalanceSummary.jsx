import { formatCurrency } from '../utils/format'

// One stat card: label, big amount, small caption.
function BalanceCard({ label, amount, hint, cardClass = '' }) {
  return (
    <div
      className={`flex flex-col gap-0.5 rounded-xl border border-border-soft bg-surface px-5 py-4 shadow-card ${cardClass}`}
    >
      <span className="text-[0.82rem] font-bold tracking-wide text-muted uppercase">{label}</span>
      <span className="font-extrabold tabular-nums text-[clamp(1.5rem,3.5vw,2.1rem)]">{amount}</span>
      <span className="text-[0.8rem] text-muted">{hint}</span>
    </div>
  )
}

// Green when in credit, red when overdrawn, no color at zero.
function getBalanceColorClass(balance) {
  if (balance > 0) return 'text-income'
  if (balance < 0) return 'text-expense'
  return ''
}

export default function BalanceSummary({ totals }) {
  const { income, expenses, balance } = totals

  const cards = [
    {
      key: 'balance',
      label: 'Current Balance',
      amount: formatCurrency(balance),
      hint: 'income minus expenses',
      // Highlighted card: sky-tinted gradient and primary border.
      cardClass: `border-primary bg-gradient-to-br from-sky-tint to-surface ${getBalanceColorClass(balance)}`,
    },
    { key: 'income', label: 'Income', amount: formatCurrency(income), hint: 'money in' },
    { key: 'expenses', label: 'Expenses', amount: formatCurrency(expenses), hint: 'money out' },
  ]

  return (
    // auto-fit minmax(210px,1fr): cards flow 1/2/3-across depending on width.
    <section className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]">
      {cards.map((card) => (
        <BalanceCard key={card.key} {...card} />
      ))}
    </section>
  )
}
