import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/transactions', label: 'Transactions' },
  { to: '/budget', label: 'Budget' },
  { to: '/monthly', label: 'Monthly' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-border-soft bg-surface shadow-card">
      {/* .container + .header-inner: max-width column; on phones it wraps
          so the nav can drop below the brand row. */}
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-4 px-4 py-3.5 max-sm:flex-wrap">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 text-ink no-underline"
          onClick={closeMenu}
        >
          <span className="grid h-[2.1rem] w-[2.1rem] place-items-center rounded-[10px] bg-sky-tint text-[1.15rem]">
            💰
          </span>
          <span className="text-[1.1rem] font-extrabold tracking-[-0.01em]">
            Expense Tracker
          </span>
        </NavLink>

        {/* Hamburger: hidden on desktop, becomes a flex button on phones. */}
        <button
          type="button"
          className="hidden h-[2.6rem] w-[2.6rem] cursor-pointer flex-col justify-center gap-1 rounded-lg border border-border-soft bg-surface px-2.5 max-sm:flex"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="block h-0.5 w-full rounded-sm bg-ink" />
          <span className="block h-0.5 w-full rounded-sm bg-ink" />
          <span className="block h-0.5 w-full rounded-sm bg-ink" />
        </button>

        {/* Desktop: horizontal row. Mobile: hidden until menuOpen, then a
            vertical column separated by a top border. */}
        <nav
          id="primary-navigation"
          className={`flex gap-1 max-sm:w-full max-sm:flex-col max-sm:border-t max-sm:border-border-soft max-sm:pt-2 ${
            menuOpen ? '' : 'max-sm:hidden'
          }`}
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-[0.92rem] font-semibold no-underline transition-colors ${
                  isActive
                    ? 'bg-sky-tint text-primary-dark'
                    : 'text-muted hover:bg-background hover:text-ink'
                }`
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
