export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount ?? 0)
}

// Builds today's date as "YYYY-MM-DD" in local time — the format
// <input type="date"> and our transaction records use.
export function getTodayISODate() {
  const now = new Date()
  const year = now.getFullYear()
  // padStart keeps months/days two digits wide: 9 -> "09".
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Turns an ISO date into something friendly like "Sep 14, 2026".
// We build the Date from year/month/day parts instead of parsing the
// string directly, because new Date("2026-09-14") is parsed as UTC
// and can show the previous day in negative timezones.
export function formatDateForDisplay(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// "2026-09" -> "September 2026" for the monthly summary table.
export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}
