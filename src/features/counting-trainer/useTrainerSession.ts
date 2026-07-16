import { useMemo, useState } from 'react'
import { createShoe } from '../../domain/cards/deck'
import type { Card } from '../../domain/cards/types'
import { runningCount, trueCount, type CountingSystem } from '../../domain/counting/types'

export interface Feedback {
  card: Card
  cardValue: number
  userGuess: number
  actualRunningCount: number
  correct: boolean
}

export interface TrainerConfig {
  deckCount: number
  system: CountingSystem
}

type Phase = 'guessing' | 'feedback' | 'finished'

export function useTrainerSession(config: TrainerConfig) {
  const shoe = useMemo(() => createShoe(config.deckCount), [config.deckCount])
  const [revealedCount, setRevealedCount] = useState(1)
  const [phase, setPhase] = useState<Phase>('guessing')
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAnswers, setTotalAnswers] = useState(0)

  const revealed = shoe.slice(0, revealedCount)
  const currentCard = revealed[revealed.length - 1]
  const actualRunningCount = runningCount(config.system, revealed)
  const currentTrueCount = trueCount(actualRunningCount, shoe.length, revealedCount)

  function submitGuess(userGuess: number) {
    if (phase !== 'guessing') return
    const correct = userGuess === actualRunningCount
    setFeedback({
      card: currentCard,
      cardValue: config.system.values[currentCard.rank],
      userGuess,
      actualRunningCount,
      correct,
    })
    setCorrectAnswers((c) => c + (correct ? 1 : 0))
    setTotalAnswers((t) => t + 1)
    setPhase('feedback')
  }

  function nextCard() {
    if (revealedCount >= shoe.length) {
      setPhase('finished')
      return
    }
    setRevealedCount((n) => n + 1)
    setFeedback(null)
    setPhase('guessing')
  }

  const accuracy = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100)

  return {
    shoeSize: shoe.length,
    revealedCount,
    currentCard,
    actualRunningCount,
    currentTrueCount,
    phase,
    feedback,
    correctAnswers,
    totalAnswers,
    accuracy,
    submitGuess,
    nextCard,
  }
}
