export function SummaryScreen({
  accuracy,
  totalAnswers,
  correctAnswers,
  onRestart,
}: {
  accuracy: number
  totalAnswers: number
  correctAnswers: number
  onRestart: () => void
}) {
  return (
    <div className="summary-screen">
      <h1>Schuh durchgezählt!</h1>
      <p>
        Du hast {correctAnswers} von {totalAnswers} Counts richtig geschätzt.
      </p>
      <p className="summary-accuracy">{accuracy}%</p>
      <button type="button" className="btn btn-primary" onClick={onRestart}>
        Neuer Schuh
      </button>
    </div>
  )
}
