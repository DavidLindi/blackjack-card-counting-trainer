import { useState, type FormEvent } from 'react'

export function GuessForm({ onSubmit }: { onSubmit: (guess: number) => void }) {
  const [value, setValue] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const parsed = Number(value)
    if (Number.isNaN(parsed) || value.trim() === '') return
    onSubmit(parsed)
    setValue('')
  }

  return (
    <form className="guess-form" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Wie hoch ist der Running Count jetzt?</label>
      <div className="guess-form-row">
        <input
          id="guess-input"
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <button type="submit">Prüfen</button>
      </div>
    </form>
  )
}
