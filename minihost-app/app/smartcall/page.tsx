import Link from 'next/link'
import styles from './smartcall.module.css'

export const metadata = {
  title: 'SmartCall — Never miss a guest emergency | MiniHost',
  description: 'When a guest stays at your place, their calls get through. Even at 2am.',
}

export default function SmartCall() {
  return (
    <div className={styles.page}>
      {/* Floating decorations */}
      <div className={styles.floaties}>
        <span className={styles.floaty}>✨</span>
        <span className={styles.floaty}>⭐</span>
        <span className={styles.floaty}>💫</span>
        <span className={styles.floaty}>🌙</span>
        <span className={styles.floaty}>☁️</span>
        <span className={styles.floaty}>💜</span>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>🏠 minihost</Link>
          <Link href="/" className={styles.backLink}>← Back home</Link>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroIcon}>📱</div>
          <div className={styles.heroBadge}>✨ SmartCall</div>
          <h1>When a guest stays at your place, their calls get through</h1>
          <p className={styles.heroSub}>Even if your phone is on silent. Even at 2am. <span className={styles.sparkle}>✨</span> Only them.</p>
        </section>

        {/* The problem */}
        <section className={styles.problemSection}>
          <div className={styles.scenario}>
            <div className={styles.scenarioTime}>🌙 Tuesday, 2:14 AM</div>
            <h2>Your phone is on silent. As it should be.</h2>
            <div className={styles.scenarioStory}>
              <p>Sophie just landed. She&apos;s been traveling for 9 hours. She&apos;s standing outside your apartment with two suitcases, and the lockbox code isn&apos;t working.</p>
              <p>She calls you. Once. Twice. Three times.</p>
              <p>You&apos;re asleep. Your phone doesn&apos;t ring.</p>
            </div>
            <div className={styles.scenarioResult}>
              Sophie sleeps in a hotel. You wake up to a 3-star review.
            </div>
          </div>
        </section>

        {/* The solution */}
        <section className={styles.solutionSection}>
          <h2>There&apos;s a better way ✨</h2>
          <p>SmartCall makes your current guest&apos;s phone number a priority. Their calls get through — no matter what.</p>
          
          <div className={styles.solutionBox}>
            <div className={styles.solutionIcon}>🛡️</div>
            <h3>Only the guest. Only during their stay.</h3>
            <p>Not spam. Not your bank. Not your ex. Just the person sleeping in your apartment right now — if they need you.</p>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.howSection}>
          <h2>How it works ✨</h2>
          <p>Completely automatic. Zero effort.</p>
          <div className={styles.howSteps}>
            <div className={styles.howStep}>
              <div className={styles.howStepIcon}>📅</div>
              <div className={styles.howStepContent}>
                <h3>A guest books your place</h3>
                <p>MiniHost sees it in your calendar and grabs their phone number from the reservation.</p>
              </div>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howStepIcon}>👑</div>
              <div className={styles.howStepContent}>
                <h3>During their stay, they become VIP</h3>
                <p>Their number bypasses silent mode. Only their calls get through.</p>
              </div>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howStepIcon}>✅</div>
              <div className={styles.howStepContent}>
                <h3>They check out, VIP ends</h3>
                <p>Automatically. Next guest becomes the new VIP. You don&apos;t lift a finger.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What it's not */}
        <section className={styles.notSection}>
          <div className={styles.notContainer}>
            <h2>SmartCall is picky 💅</h2>
            <div className={styles.notGrid}>
              <div className={styles.notItem}>
                <div className={styles.notIcon}>📵</div>
                <p>Spam</p>
              </div>
              <div className={styles.notItem}>
                <div className={styles.notIcon}>🏦</div>
                <p>Your bank</p>
              </div>
              <div className={styles.notItem}>
                <div className={styles.notIcon}>👻</div>
                <p>Randoms</p>
              </div>
            </div>
            <div className={styles.notOnly}>✓ Only your current guest</div>
          </div>
        </section>

        {/* The magic moment */}
        <section className={styles.magicSection}>
          <h2>Same story. Happy ending. 💖</h2>
          <p>With SmartCall enabled:</p>
          
          <div className={styles.magicCard}>
            <div className={styles.magicCardHeader}>
              <div className={styles.magicCardAvatar}>👩</div>
              <div>
                <h3>Sophie D.</h3>
                <span>🟢 Calling now</span>
              </div>
            </div>
            <p>Your phone rings. You wake up, answer, and walk her through the lockbox. She&apos;s inside in 2 minutes.</p>
            <p className={styles.result}>⭐⭐⭐⭐⭐ Sophie mentions how responsive you were!</p>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}>😴💤</div>
            <h2>Sleep tight. We&apos;ve got you.</h2>
            <p>SmartCall is included in every MiniHost plan.</p>
            <Link href="/#pricing" className={styles.ctaButton}>Get MiniHost — €9/month</Link>
            <p className={styles.ctaNote}>
              <span>📞 SmartCall</span> + 
              <span>☀️ DailyDigest</span> + 
              <span>🔮 SecretScripts</span> + 
              <span>🤖 AiReply</span> + 
              <span>📖 GuestBook</span>
            </p>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>© 2024 MiniHost — The little helper for Airbnb hosts 🏠💜</p>
        </footer>
      </div>
    </div>
  )
}
