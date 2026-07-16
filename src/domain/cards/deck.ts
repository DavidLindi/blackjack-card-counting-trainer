import { RANKS, SUITS, type Card } from './types'

export function createShoe(deckCount: number): Card[] {
  const shoe: Card[] = []
  for (let d = 0; d < deckCount; d++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        shoe.push({ rank, suit })
      }
    }
  }
  return shuffle(shoe)
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
