import type { Card, Rank } from '../cards/types'

export interface CountingSystem {
  id: string
  name: string
  description: string
  values: Record<Rank, number>
}

export function cardValue(system: CountingSystem, card: Card): number {
  return system.values[card.rank]
}

export function runningCount(system: CountingSystem, cards: readonly Card[]): number {
  return cards.reduce((sum, card) => sum + cardValue(system, card), 0)
}

export function decksRemaining(shoeSize: number, revealedCount: number): number {
  const cardsLeft = shoeSize - revealedCount
  return Math.max(cardsLeft / 52, 0.5)
}

export function trueCount(runningCountValue: number, shoeSize: number, revealedCount: number): number {
  return runningCountValue / decksRemaining(shoeSize, revealedCount)
}
