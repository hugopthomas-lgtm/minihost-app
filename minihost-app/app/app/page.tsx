'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import styles from './app.module.css'

export default function AppDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [guestMessage, setGuestMessage] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const generateReply = async () => {
    if (!guestMessage.trim()) return
    setGenerating(true)
    // TODO: Call Claude API
    setTimeout(() => {
      setGeneratedReply(`Hi there! Thank you for your message. I'd be happy to help with your request. Our check-in time is 4 PM, but if you need early check-in, just let me know and I'll see what I can do. Looking forward to hosting you! 😊`)
      setGenerating(false)
    }, 1500)
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.31391C3 9.00773 3.14027 8.71843 3.38065 8.52879L11.3807 2.21793C11.7438 1.93142 12.2562 1.93142 12.6193 2.21793L20.6193 8.52879C20.8597 8.71843 21 9.00773 21 9.31391V20ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12H15C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12H7Z"/>
          </svg>
        </div>
        
        <div className={styles.navItems}>
          <div className={`${styles.navItem} ${styles.active}`}>
            <svg viewBox="0 0 24 24"><path d="M11 1V2H7C5.34315 2 4 3.34315 4 5V8C4 10.7614 6.23858 13 9 13H15C17.7614 13 20 10.7614 20 8V5C20 3.34315 18.6569 2 17 2H13V1H11ZM6 5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V8C18 9.65685 16.6569 11 15 11H9C7.34315 11 6 9.65685 6 8V5ZM9.5 9C10.3284 9 11 8.32843 11 7.5C11 6.67157 10.3284 6 9.5 6C8.67157 6 8 6.67157 8 7.5C8 8.32843 8.67157 9 9.5 9ZM14.5 9C15.3284 9 16 8.32843 16 7.5C16 6.67157 15.3284 6 14.5 6C13.6716 6 13 6.67157 13 7.5C13 8.32843 13.6716 9 14.5 9ZM6 22C6 18.6863 8.68629 16 12 16C15.3137 16 18 18.6863 18 22H20C20 17.5817 16.4183 14 12 14C7.58172 14 4 17.5817 4 22H6Z"/></svg>
            <span className={styles.navTooltip}>AiReply</span>
          </div>
          <div className={styles.navItem}>
            <svg viewBox="0 0 24 24"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"/></svg>
            <span className={styles.navTooltip}>Daily Digest</span>
          </div>
          <div className={styles.navItem}>
            <svg viewBox="0 0 24 24"><path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"/></svg>
            <span className={styles.navTooltip}>Scripts</span>
          </div>
          <div className={styles.navItem}>
            <svg viewBox="0 0 24 24"><path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"/></svg>
            <span className={styles.navTooltip}>SmartCall</span>
          </div>
          <div className={styles.navItem}>
            <svg viewBox="0 0 24 24"><path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"/></svg>
            <span className={styles.navTooltip}>GuestBook</span>
          </div>
        </div>

        <div className={styles.sidebarBottom}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.propertySelector}>
            <span>🏡</span>
            <span>My Property</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h1>AiReply ✨</h1>
            <p>Paste a guest message, get a perfect reply</p>
          </div>

          {/* Input Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.blue}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <h3>Paste their message</h3>
                <p>Copy-paste what the guest sent you</p>
              </div>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Hi! We're arriving tomorrow around 2pm. Is early check-in possible? Also, where can we park?"
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
            />
            <button 
              className={styles.generateBtn}
              onClick={generateReply}
              disabled={generating || !guestMessage.trim()}
            >
              {generating ? 'Generating...' : 'Generate reply'}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Output Card */}
          {generatedReply && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIcon} ${styles.mint}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div>
                  <h3>Ready to send</h3>
                  <p className={styles.mintText}>Your reply is ready</p>
                </div>
              </div>
              <div className={styles.replyBox}>
                {generatedReply}
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.copyBtn}
                  onClick={() => navigator.clipboard.writeText(generatedReply)}
                >
                  Copy
                </button>
                <div className={styles.tags}>
                  <button className={styles.tag}>Regenerate</button>
                  <button className={styles.tag}>Shorter</button>
                  <button className={styles.tag}>Warmer</button>
                  <button className={styles.tag}>More formal</button>
                </div>
              </div>
            </div>
          )}

          {/* Today Card */}
          <div className={styles.todayCard}>
            <div className={styles.todayHeader}>
              <span>☀️</span>
              <h3>Today</h3>
            </div>
            <p>No check-ins or check-outs today. Enjoy your day!</p>
          </div>
        </div>
      </main>
    </div>
  )
}
