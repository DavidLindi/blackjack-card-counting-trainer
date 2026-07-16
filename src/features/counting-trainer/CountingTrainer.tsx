import { useState } from 'react'
import { useTrainerSession, type TrainerConfig } from './useTrainerSession'
import { SettingsScreen } from './components/SettingsScreen'
import { SummaryScreen } from './components/SummaryScreen'
import { PlayingCard } from './components/PlayingCard'
import { GuessForm } from './components/GuessForm'
import { FeedbackPanel } from './components/FeedbackPanel'
import { StatsBar } from './components/StatsBar'
import { HelpModal } from './components/HelpModal'
import './CountingTrainer.css'

export function CountingTrainer() {
  const [config, setConfig] = useState<TrainerConfig | null>(null)
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <>
      <button type="button" className="btn btn-ghost help-button" onClick={() => setHelpOpen(true)}>
        ? Wie funktioniert Kartenzählen?
      </button>
      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}

      {!config ? (
        <SettingsScreen onStart={setConfig} />
      ) : (
        <Session
          key={`${config.deckCount}-${config.system.id}-${Date.now()}`}
          config={config}
          onRestart={() => setConfig(null)}
        />
      )}
    </>
  )
}

function Session({ config, onRestart }: { config: TrainerConfig; onRestart: () => void }) {
  const session = useTrainerSession(config)

  if (session.phase === 'finished') {
    return (
      <SummaryScreen
        accuracy={session.accuracy}
        totalAnswers={session.totalAnswers}
        correctAnswers={session.correctAnswers}
        onRestart={onRestart}
      />
    )
  }

  const isLastCard = session.revealedCount >= session.shoeSize

  return (
    <div className="counting-trainer">
      <StatsBar
        revealedCount={session.revealedCount}
        shoeSize={session.shoeSize}
        accuracy={session.accuracy}
        totalAnswers={session.totalAnswers}
        trueCount={session.currentTrueCount}
      />

      <PlayingCard key={session.revealedCount} card={session.currentCard} />

      {session.phase === 'guessing' && <GuessForm onSubmit={session.submitGuess} />}

      {session.phase === 'feedback' && session.feedback && (
        <FeedbackPanel
          feedback={session.feedback}
          system={config.system}
          onNext={session.nextCard}
          isLastCard={isLastCard}
        />
      )}
    </div>
  )
}
