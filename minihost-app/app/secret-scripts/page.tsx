import Link from 'next/link'

export const metadata = {
  title: 'SecretScripts — The messages that protect your Airbnb | MiniHost',
  description: '3 copy-paste messages that took us years to perfect. They\'ve saved us thousands.',
}

export default function SecretScripts() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'var(--cream)'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔮</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>SecretScripts</h1>
      <p style={{ color: 'var(--gray)', marginBottom: '2rem', maxWidth: '400px' }}>
        The exact words that protect your Airbnb. 3 copy-paste messages that took us years to perfect.
      </p>
      <Link href="/" style={{
        padding: '0.75rem 1.5rem',
        background: 'var(--green)',
        color: 'white',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: 700
      }}>
        ← Back to home
      </Link>
    </div>
  )
}
