import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: NextRequest) {
  try {
    const { guestMessage, userId } = await request.json()

    if (!guestMessage) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    // Load host settings from database
    let hostSettings: any = {}
    let propertyInfo: any = {}
    
    if (userId) {
      const { data: settings } = await supabase
        .from('host_settings')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (settings) hostSettings = settings
      
      const { data: property } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (property) propertyInfo = property
    }

    const systemPrompt = `You are helping an Airbnb host reply to guest messages. Your job is to write replies that sound EXACTLY like the host.

HOST'S VOICE & STYLE:
- Tone: ${hostSettings.tone || 'warm and friendly'}
- Greeting: ${hostSettings.greeting || 'Hi'}
- Sign-off: ${hostSettings.sign_off || ''}
${hostSettings.sample_messages ? `
EXAMPLES OF HOW THIS HOST WRITES (copy this style!):
${hostSettings.sample_messages}
` : ''}

HOST'S RULES:
- Check-in: ${propertyInfo.check_in_time || '4 PM'}
- Check-out: ${propertyInfo.check_out_time || '10 AM'}
- Early check-in policy: ${hostSettings.early_checkin_policy || 'sometimes possible, need to check'}
- Late check-out policy: ${hostSettings.late_checkout_policy || 'sometimes possible, need to check'}
${hostSettings.hard_nos ? `- NEVER do these things: ${hostSettings.hard_nos}` : ''}

PROPERTY INFO:
- Name: ${propertyInfo.name || 'the property'}
- WiFi: ${propertyInfo.wifi_password || 'will be provided'}
- Entry: ${propertyInfo.entry_instructions || 'will be provided'}
- Parking: ${propertyInfo.parking_info || 'info available on arrival'}
${propertyInfo.house_rules ? `- House rules: ${propertyInfo.house_rules}` : ''}

GUIDELINES:
- Write in the EXACT same style as the sample messages
- Be helpful and answer their questions directly
- Keep it concise (2-5 sentences usually)
- Use emojis sparingly (0-2 max), only if the host's samples use them
- Never promise things that aren't in the rules
- If unsure about something, say you'll check and get back to them
- Start with the host's preferred greeting
- End with the host's sign-off if they have one`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Guest message:\n"${guestMessage}"\n\nWrite a reply as this host:`
          }
        ]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      return NextResponse.json({ error: 'Failed to generate reply' }, { status: 500 })
    }

    const data = await response.json()
    const reply = data.content[0].text

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
