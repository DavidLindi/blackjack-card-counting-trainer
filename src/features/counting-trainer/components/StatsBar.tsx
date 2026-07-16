function trueCountClass(value: number): string {
  if (value > 0.5) return 'positive'
  if (value < -0.5) return 'negative'
  return 'neutral'
}

export function StatsBar({
  revealedCount,
  shoeSize,
  accuracy,
  totalAnswers,
  trueCount,
}: {
  revealedCount: number
  shoeSize: number
  accuracy: number
  totalAnswers: number
  trueCount: number
}) {
  const progressPercent = Math.round((revealedCount / shoeSize) * 100)

  return (
    <div className="stats-bar-wrap">
      <div className="stats-bar">
        <span>
          Karte {revealedCount} / {shoeSize}
        </span>
        <span>
          Genauigkeit: {accuracy}% ({totalAnswers} Antworten)
        </span>
        <span className={`true-count true-count-${trueCountClass(trueCount)}`}>
          True Count: {trueCount.toFixed(2)}
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  )
}
