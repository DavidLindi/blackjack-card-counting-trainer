import type { CountingSystem } from './types'

export const hiLo: CountingSystem = {
  id: 'hi-lo',
  name: 'Hi-Lo',
  description:
    'Das gebräuchlichste Zählsystem. Niedrige Karten (2-6) erhöhen den Count, hohe Karten (10-A) senken ihn, 7-9 sind neutral.',
  values: {
    '2': 1, '3': 1, '4': 1, '5': 1, '6': 1,
    '7': 0, '8': 0, '9': 0,
    '10': -1, J: -1, Q: -1, K: -1, A: -1,
  },
}

export const countingSystems: readonly CountingSystem[] = [hiLo]
