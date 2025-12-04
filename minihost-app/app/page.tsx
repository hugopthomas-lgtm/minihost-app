import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🏠</span>
          minihost
        </Link>
        <Link href="#pricing" className={styles.navCta}>Get started</Link>
      </header>

      <section className={styles.hero}>
        <h1>The little helper for <span>Airbnb hosts</span></h1>
        <p>4 simple tools. No dashboard. No complexity. Just the stuff that actually helps.</p>
        <Link href="#pricing" className={styles.heroCta}>Try it — €9/month</Link>
        <p className={styles.heroPrice}>Cancel anytime. <strong>Seriously.</strong></p>
        
        {/* Journal mockup */}
        <div className={styles.journalMockup}>
          <div className={styles.journalHeader}>
            <div className={styles.journalDate}>Wednesday, December 4</div>
            <div className={styles.journalName}>The Daily Host</div>
            <div className={styles.journalTagline}>Your morning briefing</div>
          </div>
          <div className={styles.journalContent}>
            <h2 className={styles.journalHeadline}>A quiet day ahead</h2>
            <p className={styles.journalLede}>One check-out at 10, one check-in at 4. Nothing urgent.</p>
            <div className={styles.journalDivider}></div>
            <p>Sophie (2 guests) arrives this afternoon. She asked about parking — but it&apos;s already in your GuestBook, so you&apos;re covered.</p>
            <p>Marc wants to check in early. Worth a quick reply when you get a chance.</p>
            <div className={styles.journalAlert}>
              <strong>Keep an eye on:</strong> Your Friday guest has zero reviews and changed dates twice.
            </div>
            <div className={styles.journalTodo}>
              → Today&apos;s priority: reply to Marc
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <h2>What&apos;s inside</h2>
          <p>4 tools. 1 freebie. That&apos;s the whole list.</p>
        </div>

        <div className={styles.featureList}>
          <Link href="/smartcall" className={styles.featureCard}>
            <div className={styles.featureEmoji}>☀️</div>
            <div className={styles.featureContent}>
              <h3>DailyDigest</h3>
              <p>Every morning at 7am: who&apos;s checking in, who&apos;s leaving, what needs your attention. One email, zero stress.</p>
            </div>
          </Link>

          <Link href="/secret-scripts" className={styles.featureCard}>
            <div className={styles.featureEmoji}>🔮</div>
            <div className={styles.featureContent}>
              <h3>SecretScripts</h3>
              <p>The magic messages that protect your account. Get 5-star reviews, decline without penalties, cancel without fees. Copy, paste, done.</p>
            </div>
          </Link>

          <Link href="/aireply" className={styles.featureCard}>
            <div className={styles.featureEmoji}>🤖</div>
            <div className={styles.featureContent}>
              <h3>AiReply</h3>
              <p>Paste a guest message, get a perfect reply. Always polite, always professional. No more staring at your screen wondering what to say.</p>
            </div>
          </Link>

          <Link href="/smartcall" className={styles.featureCard}>
            <div className={styles.featureEmoji}>📞</div>
            <div className={styles.featureContent}>
              <h3>SmartCall</h3>
              <p>Guest locked out at 2am? Their call rings through silent mode. Real emergencies get through. Sleep tight.</p>
            </div>
          </Link>

          <div className={`${styles.featureCard} ${styles.featureFree}`}>
            <div className={styles.featureEmoji}>📖</div>
            <div className={styles.featureContent}>
              <h3>GuestBook <span className={styles.freeTag}>Free</span></h3>
              <p>A beautiful digital welcome guide for your guests. WiFi, check-in instructions, house rules, local tips — one link, everything they need.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.howSection}>
        <h2>How it works</h2>
        <div className={styles.howSteps}>
          <div className={styles.howStep}>
            <div className={styles.howStepNum}>1</div>
            <h3>Sign up</h3>
            <p>2 minutes. Just your email and Airbnb link.</p>
          </div>
          <div className={styles.howStep}>
            <div className={styles.howStepNum}>2</div>
            <h3>Wake up informed</h3>
            <p>Get your daily briefing every morning.</p>
          </div>
          <div className={styles.howStep}>
            <div className={styles.howStepNum}>3</div>
            <h3>Host better</h3>
            <p>Use the templates. Get more 5-stars.</p>
          </div>
        </div>
      </section>

      <section className={styles.pricing} id="pricing">
        <h2>Simple pricing</h2>
        <div className={styles.pricingCard}>
          <div className={styles.pricingAmount}>€9<span>/month</span></div>
          <p className={styles.pricingNote}>Everything included. No limits.</p>
          
          <ul className={styles.pricingFeatures}>
            <li><span className={styles.check}>✓</span> DailyDigest emails</li>
            <li><span className={styles.check}>✓</span> SecretScripts library</li>
            <li><span className={styles.check}>✓</span> AiReply (unlimited)</li>
            <li><span className={styles.check}>✓</span> SmartCall number</li>
            <li><span className={styles.check}>✓</span> GuestBook (free forever)</li>
            <li><span className={styles.check}>✓</span> Works for 1 to 5 properties</li>
          </ul>

          <Link href="/signup" className={styles.pricingCta}>Start now</Link>
          <p className={styles.pricingAlt}>or <Link href="#">€79/year</Link> (save 27%)</p>
        </div>
      </section>

      <section className={styles.faq}>
        <h2>Questions?</h2>
        
        <div className={styles.faqItem}>
          <p className={styles.faqQ}>Is this another Hospitable?</p>
          <p className={styles.faqA}>They have 50 features. We have peace of mind. €9.</p>
        </div>
        
        <div className={styles.faqItem}>
          <p className={styles.faqQ}>Do I need to connect my Airbnb?</p>
          <p className={styles.faqA}>Just your calendar link for DailyDigest. The rest works standalone — it&apos;s just templates and guides.</p>
        </div>
        
        <div className={styles.faqItem}>
          <p className={styles.faqQ}>What if I have more than 5 properties?</p>
          <p className={styles.faqA}>Then you probably need Hospitable, honestly. MiniHost is for small hosts who want to stay small and happy.</p>
        </div>
        
        <div className={styles.faqItem}>
          <p className={styles.faqQ}>Can I cancel?</p>
          <p className={styles.faqA}>Anytime. One click. No guilt trip emails. We promise.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2024 MiniHost</p>
        <p>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </p>
      </footer>
    </>
  )
}
