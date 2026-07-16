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
  return (
    <div className="stats-bar">
      <span>
        Karte {revealedCount} / {shoeSize}
      </span>
      <span>
        Genauigkeit: {accuracy}% ({totalAnswers} Antworten)
      </span>
      <span>True Count: {trueCount.toFixed(2)}</span>
    </div>
  )
}
