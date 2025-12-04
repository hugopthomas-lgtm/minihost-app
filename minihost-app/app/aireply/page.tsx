import Link from 'next/link'

export const metadata = {
  title: 'AiReply — AI-powered guest responses | MiniHost',
  description: 'Paste a guest message, get a perfect reply. Always polite, always professional.',
}

export default function AiReply() {
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
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>AiReply</h1>
      <p style={{ color: 'var(--gray)', marginBottom: '2rem', maxWidth: '400px' }}>
        Paste a guest message, get a perfect reply. Always polite, always professional.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/aireply/setup" style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--green)',
          color: 'white',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: 700
        }}>
          Set up AiReply →
        </Link>
        <Link href="/" style={{
          padding: '0.75rem 1.5rem',
          background: 'transparent',
          color: 'var(--gray)',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: 700
        }}>
          ← Back home
        </Link>
      </div>
    </div>
  )
}
