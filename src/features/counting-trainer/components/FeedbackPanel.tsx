import type { Feedback } from '../useTrainerSession'
import type { CountingSystem } from '../../../domain/counting/types'

export function FeedbackPanel({
  feedback,
  system,
  onNext,
  isLastCard,
}: {
  feedback: Feedback
  system: CountingSystem
  onNext: () => void
  isLastCard: boolean
}) {
  const valueLabel = feedback.cardValue > 0 ? `+${feedback.cardValue}` : `${feedback.cardValue}`

  return (
    <div className={`feedback-panel ${feedback.correct ? 'correct' : 'wrong'}`}>
      <p className="feedback-headline">
        {feedback.correct ? 'Richtig!' : 'Nicht ganz.'}
      </p>
      <p>
        {feedback.card.rank} zählt im {system.name}-System <strong>{valueLabel}</strong>.
      </p>
      <p>
        Dein Tipp: <strong>{feedback.userGuess}</strong> — Tatsächlicher Running Count:{' '}
        <strong>{feedback.actualRunningCount}</strong>
      </p>
      <button type="button" onClick={onNext}>
        {isLastCard ? 'Ergebnis anzeigen' : 'Nächste Karte'}
      </button>
    </div>
  )
}
