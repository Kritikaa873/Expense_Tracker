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
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon" aria-hidden="true">💰</span>
          <span className="brand-name">Expense Tracker</span>
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">
            {menuOpen ? 'Close menu' : 'Open menu'}
          </span>
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`main-nav${menuOpen ? ' open' : ''}`}
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
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
