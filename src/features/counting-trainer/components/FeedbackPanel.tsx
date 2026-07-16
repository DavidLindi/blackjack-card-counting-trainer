import { useEffect } from 'react'
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
  const previousRunningCount = feedback.actualRunningCount - feedback.cardValue

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault()
        onNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext])

  return (
    <div className={`feedback-panel ${feedback.correct ? 'correct' : 'wrong'}`}>
      <p className="feedback-headline">
        {feedback.correct ? 'Richtig!' : 'Nicht ganz.'}
      </p>
      <p>
        {feedback.card.rank} zählt im {system.name}-System <strong>{valueLabel}</strong> —
        das ist nur der Wert dieser einen Karte.
      </p>
      <p className="feedback-calculation">
        Bisheriger Count <strong>{previousRunningCount}</strong> {feedback.cardValue >= 0 ? '+' : '-'}{' '}
        <strong>{Math.abs(feedback.cardValue)}</strong> = neuer Running Count{' '}
        <strong>{feedback.actualRunningCount}</strong>
      </p>
      <p>
        Dein Tipp war: <strong>{feedback.userGuess}</strong>
      </p>
      <button type="button" className="btn btn-primary" onClick={onNext}>
        {isLastCard ? 'Ergebnis anzeigen' : 'Nächste Karte'}
      </button>
    </div>
  )
}
