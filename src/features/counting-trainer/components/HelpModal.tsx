export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="help-modal-close" onClick={onClose} aria-label="Schließen">
          ×
        </button>
        <h2>Wie funktioniert Kartenzählen?</h2>

        <h3>Grundidee</h3>
        <p>
          In einem Kartenschuh mit mehreren Decks ändert sich die Zusammensetzung der
          verbleibenden Karten, je mehr schon gespielt wurden. Sind viele niedrige Karten
          (2-6) schon weg, bleiben verhältnismäßig mehr hohe Karten (10, Bilder, Ass) übrig
          — das ist gut für den Spieler (mehr Blackjacks, mehr Dealer-Bust-Chancen).
          Kartenzählen verfolgt dieses Verhältnis.
        </p>

        <h3>Hi-Lo-System</h3>
        <ul>
          <li><strong>2–6</strong> → zähle <strong>+1</strong> (niedrige Karte raus = gut für dich)</li>
          <li><strong>7–9</strong> → zähle <strong>0</strong> (neutral)</li>
          <li><strong>10, J, Q, K, A</strong> → zähle <strong>−1</strong> (hohe Karte raus = schlecht für dich)</li>
        </ul>

        <h3>Running Count</h3>
        <p>
          Der <strong>Running Count</strong> ist die laufende Summe aller Kartenwerte seit
          Schuh-Beginn — nicht der Wert der einzelnen Karte! Jede neue Karte wird auf den
          bisherigen Count addiert.
        </p>

        <h3>True Count</h3>
        <p>
          Der Running Count allein sagt wenig, weil er nicht berücksichtigt, wie viele
          Decks noch im Schuh sind. Deshalb:
        </p>
        <p className="help-formula">True Count = Running Count ÷ verbleibende Decks</p>
        <p>
          Ein hoher True Count bedeutet: überproportional viele hohe Karten übrig — in der
          Theorie ein guter Moment für höhere Einsätze.
        </p>

        <h3>Wie übt man das hier?</h3>
        <p>
          Nach jeder Karte trägst du ein, was der aktuelle Running Count gerade ist (die
          Summe aller bisher gezeigten Karten, nicht nur der letzten). Ziel ist, das
          irgendwann automatisch im Kopf mitlaufen zu lassen.
        </p>
      </div>
    </div>
  )
}
