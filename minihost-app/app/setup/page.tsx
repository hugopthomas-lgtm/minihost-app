'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import styles from './setup.module.css'

export default function SetupPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('voice')

  // Voice settings
  const [sampleMessages, setSampleMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [addingMessage, setAddingMessage] = useState(false)

  // Rules settings
  const [checkInTime, setCheckInTime] = useState('16:00')
  const [checkOutTime, setCheckOutTime] = useState('10:00')
  const [wifiName, setWifiName] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [parkingInfo, setParkingInfo] = useState('')
  const [entryInstructions, setEntryInstructions] = useState('')

  // Policies
  const [earlyCheckIn, setEarlyCheckIn] = useState('sometimes')
  const [lateCheckOut, setLateCheckOut] = useState('sometimes')
  const [pets, setPets] = useState('no')
  const [parties, setParties] = useState('no')
  const [smoking, setSmoking] = useState('no')

  // Saving states
  const [savingRules, setSavingRules] = useState(false)
  const [savedRules, setSavedRules] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth')
      } else {
        setUser(session.user)
        loadSettings(session.user.id)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  const loadSettings = async (userId: string) => {
    const { data } = await supabase
      .from('host_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (data) {
      if (data.sample_messages) setSampleMessages(data.sample_messages)
      setEarlyCheckIn(data.early_checkin_policy || 'sometimes')
      setLateCheckOut(data.late_checkout_policy || 'sometimes')
      setPets(data.pets_policy || 'no')
      setParties(data.parties_policy || 'no')
      setSmoking(data.smoking_policy || 'no')
    }

    const { data: property } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (property) {
      setCheckInTime(property.check_in_time || '16:00')
      setCheckOutTime(property.check_out_time || '10:00')
      setWifiName(property.wifi_name || '')
      setWifiPassword(property.wifi_password || '')
      setParkingInfo(property.parking_info || '')
      setEntryInstructions(property.entry_instructions || '')
    }
  }

  const addSampleMessage = async () => {
    if (!newMessage.trim() || !user) return
    setAddingMessage(true)

    const updatedMessages = [...sampleMessages, newMessage.trim()]
    
    await supabase
      .from('host_settings')
      .upsert({
        user_id: user.id,
        sample_messages: updatedMessages,
      }, { onConflict: 'user_id' })

    setSampleMessages(updatedMessages)
    setNewMessage('')
    setAddingMessage(false)
  }

  const removeSampleMessage = async (index: number) => {
    if (!user) return
    const updatedMessages = sampleMessages.filter((_, i) => i !== index)
    
    await supabase
      .from('host_settings')
      .upsert({
        user_id: user.id,
        sample_messages: updatedMessages,
      }, { onConflict: 'user_id' })

    setSampleMessages(updatedMessages)
  }

  const saveStyleSettings = async (h: number, w: number) => {
    if (!user) return
    
    await supabase
      .from('host_settings')
      .upsert({
        user_id: user.id,
        humanity: h,
        warmth: w,
        sample_messages: sampleMessages,
      }, { onConflict: 'user_id' })
  }

  const saveRulesAndPolicies = async () => {
    if (!user) return
    setSavingRules(true)

    await supabase
      .from('host_settings')
      .upsert({
        user_id: user.id,
        sample_messages: sampleMessages,
        humanity,
        warmth,
        early_checkin_policy: earlyCheckIn,
        late_checkout_policy: lateCheckOut,
        pets_policy: pets,
        parties_policy: parties,
        smoking_policy: smoking,
      }, { onConflict: 'user_id' })

    await supabase
      .from('properties')
      .upsert({
        user_id: user.id,
        name: 'My Property',
        check_in_time: checkInTime,
        check_out_time: checkOutTime,
        wifi_name: wifiName,
        wifi_password: wifiPassword,
        parking_info: parkingInfo,
        entry_instructions: entryInstructions,
      }, { onConflict: 'user_id' })

    setSavingRules(false)
    setSavedRules(true)
    setTimeout(() => setSavedRules(false), 2000)
  }

  const handleHumanityChange = (value: number) => {
    setHumanity(value)
    saveStyleSettings(value, warmth)
  }

  const handleWarmthChange = (value: number) => {
    setWarmth(value)
    saveStyleSettings(humanity, value)
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo} onClick={() => router.push('/app')}>
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.31391C3 9.00773 3.14027 8.71843 3.38065 8.52879L11.3807 2.21793C11.7438 1.93142 12.2562 1.93142 12.6193 2.21793L20.6193 8.52879C20.8597 8.71843 21 9.00773 21 9.31391V20ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12H15C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12H7Z"/>
          </svg>
        </div>
        
        <div className={styles.navItems}>
          <div className={styles.navItem} onClick={() => router.push('/app')}>
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
          <div className={`${styles.navItem} ${styles.active}`}>
            <svg viewBox="0 0 24 24"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"/></svg>
            <span className={styles.navTooltip}>Setup</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Setup ⚙️</h1>
          <p>Teach MiniHost to talk like you</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'voice' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('voice')}
          >
            🎤 Your Voice
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'style' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('style')}
          >
            ✨ Reply Style
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'rules' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('rules')}
          >
            📋 Your Rules
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'policies' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            ✅ Policies
          </button>
        </div>

        {/* Voice Tab */}
        {activeTab === 'voice' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h3>Your Sample Messages</h3>
              <p className={styles.cardDesc}>
                Paste messages you've already sent to guests. MiniHost learns exactly how you write.
              </p>
              
              {/* Existing messages */}
              {sampleMessages.length > 0 && (
                <div className={styles.messagesList}>
                  {sampleMessages.map((msg, i) => (
                    <div key={i} className={styles.savedMessage}>
                      <div className={styles.messageContent}>
                        <span className={styles.messageNumber}>#{i + 1}</span>
                        <p>{msg}</p>
                      </div>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeSampleMessage(i)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new message */}
              <div className={styles.addMessageBox}>
                <textarea
                  className={styles.textarea}
                  placeholder="Paste a message you've sent to a guest... e.g. 'Hi! Thanks for booking! Check-in is at 4pm, I'll send you the door code the day before...'"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                  className={styles.addBtn}
                  onClick={addSampleMessage}
                  disabled={!newMessage.trim() || addingMessage}
                >
                  {addingMessage ? 'Adding...' : '+ Add this message'}
                </button>
              </div>

              {sampleMessages.length === 0 && (
                <p className={styles.hint}>
                  💡 Tip: Add at least 3 messages for best results. The more examples, the better MiniHost learns your style.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Style Tab */}
        {activeTab === 'style' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h3>Humanity Level</h3>
              <p className={styles.cardDesc}>
                In the age of AI, imperfections feel human. Add a touch of realness to your replies — 
                small typos, missing spaces, casual punctuation.
              </p>
              
              <div className={styles.sliderContainer}>
                <div className={styles.sliderLabels}>
                  <span>🤖 Perfect</span>
                  <span>🙂 Human</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humanity}
                  onChange={(e) => handleHumanityChange(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderValue}>
                  {humanity < 30 ? 'Flawless grammar' : humanity < 70 ? 'Natural, relaxed' : 'Casual with small imperfections'}
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Warmth Level</h3>
              <p className={styles.cardDesc}>
                How much warmth and politeness in your replies? From straight-to-the-point to extra friendly.
              </p>
              
              <div className={styles.sliderContainer}>
                <div className={styles.sliderLabels}>
                  <span>😐 Minimal</span>
                  <span>🤗 Extra warm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={warmth}
                  onChange={(e) => handleWarmthChange(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderValue}>
                  {warmth < 30 ? '"Check-in is at 4pm."' : warmth < 70 ? '"Hi! Check-in is at 4pm, let me know if you need anything."' : '"Hi there! So excited to host you! Check-in is at 4pm — please don\'t hesitate to reach out if you have any questions at all! 😊"'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h3>Check-in & Check-out</h3>
              
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Check-in time</label>
                  <input
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Check-out time</label>
                  <input
                    type="time"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>WiFi</h3>
              
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Network name</label>
                  <input
                    type="text"
                    placeholder="MyWiFi"
                    value={wifiName}
                    onChange={(e) => setWifiName(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Password</label>
                  <input
                    type="text"
                    placeholder="••••••••"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Access & Parking</h3>
              
              <div className={styles.field}>
                <label>Entry instructions</label>
                <textarea
                  className={styles.textarea}
                  placeholder="The lockbox is next to the door. Code is 1234..."
                  value={entryInstructions}
                  onChange={(e) => setEntryInstructions(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Parking info</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Free street parking. Garage available for €10/day..."
                  value={parkingInfo}
                  onChange={(e) => setParkingInfo(e.target.value)}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className={styles.saveBar}>
              <button 
                className={styles.saveBtn}
                onClick={saveRulesAndPolicies}
                disabled={savingRules}
              >
                {savingRules ? 'Saving...' : savedRules ? 'Saved ✓' : 'Save Rules'}
              </button>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h3>Flexibility</h3>
              
              <div className={styles.field}>
                <label>Early check-in?</label>
                <div className={styles.options}>
                  {[
                    { value: 'yes', label: 'Yes, always' },
                    { value: 'sometimes', label: 'Sometimes' },
                    { value: 'no', label: 'Never' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`${styles.option} ${earlyCheckIn === opt.value ? styles.selected : ''}`}
                      onClick={() => setEarlyCheckIn(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>Late check-out?</label>
                <div className={styles.options}>
                  {[
                    { value: 'yes', label: 'Yes, always' },
                    { value: 'sometimes', label: 'Sometimes' },
                    { value: 'no', label: 'Never' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`${styles.option} ${lateCheckOut === opt.value ? styles.selected : ''}`}
                      onClick={() => setLateCheckOut(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>House Rules</h3>
              
              <div className={styles.field}>
                <label>Pets allowed?</label>
                <div className={styles.options}>
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'ask', label: 'Ask first' },
                    { value: 'no', label: 'No' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`${styles.option} ${pets === opt.value ? styles.selected : ''}`}
                      onClick={() => setPets(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>Parties/events?</label>
                <div className={styles.options}>
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'small', label: 'Small gatherings' },
                    { value: 'no', label: 'No' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`${styles.option} ${parties === opt.value ? styles.selected : ''}`}
                      onClick={() => setParties(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>Smoking?</label>
                <div className={styles.options}>
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'outside', label: 'Outside only' },
                    { value: 'no', label: 'No' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`${styles.option} ${smoking === opt.value ? styles.selected : ''}`}
                      onClick={() => setSmoking(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className={styles.saveBar}>
              <button 
                className={styles.saveBtn}
                onClick={saveRulesAndPolicies}
                disabled={savingRules}
              >
                {savingRules ? 'Saving...' : savedRules ? 'Saved ✓' : 'Save Policies'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
