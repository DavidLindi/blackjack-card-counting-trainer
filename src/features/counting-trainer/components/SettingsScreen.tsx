import { useState } from 'react'
import { countingSystems, hiLo } from '../../../domain/counting/systems'
import type { CountingSystem } from '../../../domain/counting/types'
import type { TrainerConfig } from '../useTrainerSession'

const DECK_OPTIONS = [1, 2, 4, 6, 8]

export function SettingsScreen({ onStart }: { onStart: (config: TrainerConfig) => void }) {
  const [deckCount, setDeckCount] = useState(6)
  const [system, setSystem] = useState<CountingSystem>(hiLo)

  return (
    <div className="settings-screen">
      <h1>Blackjack Kartenzähl-Trainer</h1>
      <p>
        Übe das {system.name}-Zählsystem: Nach jeder aufgedeckten Karte schätzt du den
        aktuellen Running Count. {system.description}
      </p>

      <div className="settings-field">
        <label htmlFor="deck-count">Anzahl Decks im Schuh</label>
        <select
          id="deck-count"
          value={deckCount}
          onChange={(e) => setDeckCount(Number(e.target.value))}
        >
          {DECK_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'Deck' : 'Decks'}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-field">
        <label htmlFor="system">Zählsystem</label>
        <select
          id="system"
          value={system.id}
          onChange={(e) => {
            const next = countingSystems.find((s) => s.id === e.target.value)
            if (next) setSystem(next)
          }}
        >
          {countingSystems.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={() => onStart({ deckCount, system })}>
        Training starten
      </button>
    </div>
  )
}
