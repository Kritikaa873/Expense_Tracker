import MonthlySummaryTable from '../components/MonthlySummaryTable'

export default function MonthlyPage({ monthlySummary }) {
  return (
    <>
      <div className="page-header">
        <h1>Monthly Summary</h1>
        <p className="page-intro">
          Income, expenses, and net balance grouped by calendar month, newest first.
        </p>
      </div>
      <MonthlySummaryTable monthlySummary={monthlySummary} />
    </>
  )
}
