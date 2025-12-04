import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <div className={styles.navLogoIcon}>
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.31391C3 9.00773 3.14027 8.71843 3.38065 8.52879L11.3807 2.21793C11.7438 1.93142 12.2562 1.93142 12.6193 2.21793L20.6193 8.52879C20.8597 8.71843 21 9.00773 21 9.31391V20ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12H15C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12H7Z"/>
            </svg>
          </div>
          minihost
        </Link>
        <Link href="/auth" className={styles.navCta}>Get started</Link>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span>✨</span>
          Made for hosts with 1–3 places
        </div>
        <h1 className={styles.heroTitle}>
          The little helper for <span className={styles.highlight}>Airbnb hosts</span>
        </h1>
        <p className={styles.heroText}>
          4 simple tools. No dashboard. No complexity. Just the stuff that actually helps.
        </p>
        <Link href="/auth" className={styles.heroCta}>
          Try it — €9/month
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
        <p className={styles.heroSub}>Cancel anytime. Seriously.</p>
      </section>

      {/* Preview */}
      <div className={styles.preview}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <div className={styles.previewIcon}>☀️</div>
            <div>
              <h3>Daily Digest</h3>
              <p>Your morning briefing</p>
            </div>
            <span className={styles.previewDate}>Wednesday, Dec 4</span>
          </div>
          <div className={styles.previewContent}>
            <p>A quiet day ahead — one check-out at 10, one check-in at 4. Sophie (2 guests) arrives this afternoon. She asked about parking but it&apos;s already in your GuestBook.</p>
            <div className={styles.previewAlert}>
              <span>⚠️</span>
              <div><strong>Keep an eye on:</strong> Your Friday guest changed dates twice and has no reviews.</div>
            </div>
            <div className={styles.previewAction}>
              → Reply to Marc about early check-in
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <h2>4 tools. That&apos;s it.</h2>
          <p>Each one solves a real problem. Nothing more.</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.mint}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M11 1V2H7C5.34315 2 4 3.34315 4 5V8C4 10.7614 6.23858 13 9 13H15C17.7614 13 20 10.7614 20 8V5C20 3.34315 18.6569 2 17 2H13V1H11ZM6 5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V8C18 9.65685 16.6569 11 15 11H9C7.34315 11 6 9.65685 6 8V5ZM9.5 9C10.3284 9 11 8.32843 11 7.5C11 6.67157 10.3284 6 9.5 6C8.67157 6 8 6.67157 8 7.5C8 8.32843 8.67157 9 9.5 9ZM14.5 9C15.3284 9 16 8.32843 16 7.5C16 6.67157 15.3284 6 14.5 6C13.6716 6 13 6.67157 13 7.5C13 8.32843 13.6716 9 14.5 9ZM6 22C6 18.6863 8.68629 16 12 16C15.3137 16 18 18.6863 18 22H20C20 17.5817 16.4183 14 12 14C7.58172 14 4 17.5817 4 22H6Z"/>
              </svg>
            </div>
            <h3>AiReply</h3>
            <p>Paste a guest message, get a perfect reply. Matches your tone, knows your rules, always polite.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.peach}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"/>
              </svg>
            </div>
            <h3>Daily Digest</h3>
            <p>One calm summary each morning. Who&apos;s checking in, who&apos;s out, what needs your attention.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.blue}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"/>
              </svg>
            </div>
            <h3>SecretScripts</h3>
            <p>Entry codes, WiFi, house rules — sent at the right time, automatically. You set it once.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.purple}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"/>
              </svg>
            </div>
            <h3>SmartCall</h3>
            <p>Guests can reach you by phone during their stay. No spam, no strangers, just your guests.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.how}>
        <div className={styles.howInner}>
          <h2>Setup takes 5 minutes</h2>
          <div className={styles.howSteps}>
            <div className={styles.howStep}>
              <div className={styles.howStepNum}>1</div>
              <div>
                <h3>Connect your calendar</h3>
                <p>Paste your Airbnb iCal link. We sync your bookings automatically, no passwords needed.</p>
              </div>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howStepNum}>2</div>
              <div>
                <h3>Answer a few questions</h3>
                <p>Tell us your check-in time, WiFi password, and house rules. We&apos;ll remember everything.</p>
              </div>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howStepNum}>3</div>
              <div>
                <h3>Let us help</h3>
                <p>Get your daily digest, generate replies, send instructions — all on autopilot.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricing} id="pricing">
        <h2>Simple pricing</h2>
        <p className={styles.pricingSubtitle}>One plan. Everything included.</p>
        <div className={styles.pricingCard}>
          <div className={styles.pricingAmount}>
            <span className={styles.currency}>€</span>
            <span className={styles.price}>9</span>
            <span className={styles.period}>/month</span>
          </div>
          <p className={styles.pricingDesc}>For up to 3 properties</p>
          <div className={styles.pricingFeatures}>
            <div className={styles.pricingFeature}>
              <div className={`${styles.pricingFeatureIcon} ${styles.mint}`}>✓</div>
              <span>AiReply — unlimited replies</span>
            </div>
            <div className={styles.pricingFeature}>
              <div className={`${styles.pricingFeatureIcon} ${styles.peach}`}>✓</div>
              <span>Daily Digest — every morning</span>
            </div>
            <div className={styles.pricingFeature}>
              <div className={`${styles.pricingFeatureIcon} ${styles.blue}`}>✓</div>
              <span>SecretScripts — automated messages</span>
            </div>
            <div className={styles.pricingFeature}>
              <div className={`${styles.pricingFeatureIcon} ${styles.purple}`}>✓</div>
              <span>SmartCall — guest-only phone line</span>
            </div>
          </div>
          <Link href="/auth" className={styles.pricingCta}>Start now</Link>
          <p className={styles.pricingNote}>No credit card required to try</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <div className={styles.footerLogoIcon}>
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.31391C3 9.00773 3.14027 8.71843 3.38065 8.52879L11.3807 2.21793C11.7438 1.93142 12.2562 1.93142 12.6193 2.21793L20.6193 8.52879C20.8597 8.71843 21 9.00773 21 9.31391V20ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12H15C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12H7Z"/>
            </svg>
          </div>
          minihost
        </div>
        <p>Made for small hosts, with love.</p>
      </footer>
    </div>
  )
}
