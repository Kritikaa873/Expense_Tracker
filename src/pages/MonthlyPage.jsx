import MonthlySummaryTable from '../components/MonthlySummaryTable'

export default function MonthlyPage({ monthlySummary }) {
  return (
    <>
      <div className="mb-6">
        <h1 className="m-0 mb-1 text-[clamp(1.4rem,3vw,1.8rem)] leading-[1.25]">Monthly Summary</h1>
        <p className="m-0 text-muted">
          Income, expenses, and net balance grouped by calendar month, newest first.
        </p>
      </div>
      <MonthlySummaryTable monthlySummary={monthlySummary} />
    </>
  )
}
