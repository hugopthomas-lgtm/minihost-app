'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import styles from './app.module.css'

export default function AppDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [conversation, setConversation] = useState('')
  const [myReply, setMyReply] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Per-message style settings (1-6, default 3)
  const [humanity, setHumanity] = useState(3)
  const [warmth, setWarmth] = useState(3)
  const [length, setLength] = useState(3)
  const [extraApologetic, setExtraApologetic] = useState(false)
  const [addEmojis, setAddEmojis] = useState(false)

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

  const handleAI = async () => {
    if (!conversation.trim()) return
    setGenerating(true)
    
    const isImprove = myReply.trim().length > 0
    
    try {
      const response = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation,
          myDraft: isImprove ? myReply : null,
          userId: user?.id,
          humanity,
          warmth,
          length,
          extraApologetic,
          addEmojis
        })
      })
      
      const data = await response.json()
      
      if (data.error) {
        setMyReply('Sorry, there was an error. Please try again.')
      } else {
        setMyReply(data.reply)
      }
    } catch (error) {
      setMyReply('Sorry, there was an error. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(myReply)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const buttonText = myReply.trim() ? 'Improve with AI' : 'Suggest with AI'

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
            <svg viewBox="0 0 24 24"><path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"/></svg>
            <span className={styles.navTooltip}>GuestBook</span>
          </div>
        </div>

        <div className={styles.sidebarBottom}>
          <button onClick={() => router.push('/setup')} className={styles.settingsBtn}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"/>
            </svg>
            <span className={styles.navTooltip}>Setup</span>
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>AiReply ✨</h1>
            <p>Paste the conversation, get your reply</p>
          </div>

          {/* Conversation Input */}
          <div className={styles.card}>
            <div className={styles.cardLabel}>
              <span>💬</span> Conversation
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Paste the guest message (or full conversation history)..."
              value={conversation}
              onChange={(e) => setConversation(e.target.value)}
            />
          </div>

          {/* Your Reply */}
          <div className={styles.card}>
            <div className={styles.cardLabel}>
              <span>✍️</span> Your reply
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Write something or let AI suggest..."
              value={myReply}
              onChange={(e) => setMyReply(e.target.value)}
            />
          </div>

          {/* Style Options */}
          <div className={styles.optionsCard}>
            <div className={styles.sliderRow}>
              <span className={styles.optionLabel}>Humanity</span>
              <div className={styles.levelSelector}>
                {[1,2,3,4,5,6].map(n => (
                  <button 
                    key={n}
                    className={`${styles.levelBtn} ${humanity === n ? styles.levelActive : ''}`}
                    onClick={() => setHumanity(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.sliderRow}>
              <span className={styles.optionLabel}>Warmth</span>
              <div className={styles.levelSelector}>
                {[1,2,3,4,5,6].map(n => (
                  <button 
                    key={n}
                    className={`${styles.levelBtn} ${warmth === n ? styles.levelActive : ''}`}
                    onClick={() => setWarmth(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.sliderRow}>
              <span className={styles.optionLabel}>Length</span>
              <div className={styles.levelSelector}>
                {[1,2,3,4,5,6].map(n => (
                  <button 
                    key={n}
                    className={`${styles.levelBtn} ${length === n ? styles.levelActive : ''}`}
                    onClick={() => setLength(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.checkboxRow}>
              <label className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  checked={extraApologetic}
                  onChange={(e) => setExtraApologetic(e.target.checked)}
                />
                <span>Extra apologetic</span>
              </label>
              <label className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  checked={addEmojis}
                  onChange={(e) => setAddEmojis(e.target.checked)}
                />
                <span>Add emojis</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionBar}>
            <button 
              className={styles.aiBtn}
              onClick={handleAI}
              disabled={generating || !conversation.trim()}
            >
              {generating ? 'Thinking...' : buttonText}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L12 22M2 12L22 12"/>
              </svg>
            </button>
            <button 
              className={styles.copyBtn}
              onClick={handleCopy}
              disabled={!myReply.trim()}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
