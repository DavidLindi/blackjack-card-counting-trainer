import type { Card } from '../../../domain/cards/types'
import './PlayingCard.css'

const SUIT_SYMBOL: Record<Card['suit'], string> = {
  clubs: '♣',
  diamonds: '♦',
  hearts: '♥',
  spades: '♠',
}

const RED_SUITS: Card['suit'][] = ['diamonds', 'hearts']

export function PlayingCard({ card }: { card: Card }) {
  const isRed = RED_SUITS.includes(card.suit)
  return (
    <div className={`playing-card ${isRed ? 'red' : 'black'}`}>
      <span className="rank">{card.rank}</span>
      <span className="suit">{SUIT_SYMBOL[card.suit]}</span>
    </div>
  )
}
