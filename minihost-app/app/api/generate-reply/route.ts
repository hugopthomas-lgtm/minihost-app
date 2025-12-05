import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: NextRequest) {
  try {
    const { 
      conversation, 
      myDraft,
      userId, 
      humanity = 3, 
      warmth = 3, 
      length = 3,
      extraApologetic = false,
      addEmojis = false
    } = await request.json()

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation required' }, { status: 400 })
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

    // Build style instructions based on sliders
    const humanityText = humanity <= 2 ? 'Perfect grammar and spelling, very polished' 
      : humanity <= 4 ? 'Natural and relaxed writing style'
      : 'Casual with small imperfections (occasional typo, missing punctuation, informal)'
    
    const warmthText = warmth <= 2 ? 'Direct and to-the-point, minimal pleasantries'
      : warmth <= 4 ? 'Friendly but efficient'
      : 'Very warm, extra polite, lots of pleasantries and care'
    
    const lengthText = length <= 2 ? '1-2 sentences max, very brief'
      : length <= 4 ? '2-4 sentences, balanced'
      : '4-6 sentences, detailed and thorough'

    const systemPrompt = `You are helping an Airbnb host reply to guest messages. 
${myDraft ? 'Your job is to IMPROVE the host\'s draft - keep their message but make it better.' : 'Your job is to write a reply that sounds EXACTLY like the host.'}

STYLE FOR THIS MESSAGE:
- ${humanityText}
- ${warmthText}
- ${lengthText}
${extraApologetic ? '- Be EXTRA apologetic and understanding - this is a difficult situation' : ''}
${addEmojis ? '- Add 1-3 friendly emojis where appropriate' : '- No emojis unless the host\'s style uses them'}

HOST'S VOICE (learn from these examples):
${hostSettings.sample_messages?.length > 0 ? hostSettings.sample_messages.map((m: string, i: number) => `Example ${i+1}: "${m}"`).join('\n') : 'No examples provided - be natural and friendly'}

HOST'S RULES:
- Check-in: ${propertyInfo.check_in_time || '4 PM'}
- Check-out: ${propertyInfo.check_out_time || '10 AM'}
- Early check-in: ${hostSettings.early_checkin_policy || 'sometimes possible'}
- Late check-out: ${hostSettings.late_checkout_policy || 'sometimes possible'}
- Pets: ${hostSettings.pets_policy || 'ask first'}
- Parties: ${hostSettings.parties_policy || 'no'}
- Smoking: ${hostSettings.smoking_policy || 'no'}

PROPERTY INFO:
- WiFi: ${propertyInfo.wifi_name || 'available'} / ${propertyInfo.wifi_password || 'password on arrival'}
- Entry: ${propertyInfo.entry_instructions || 'details on arrival'}
- Parking: ${propertyInfo.parking_info || 'info available'}

GUIDELINES:
- Match the host's writing style from the examples
- Answer their questions directly
- Never promise things outside the rules
- If unsure, say you'll check`

    const userMessage = myDraft 
      ? `Guest message:\n"${conversation}"\n\nHost's draft to improve:\n"${myDraft}"\n\nImprove this draft while keeping the host's intent:`
      : `Guest message/conversation:\n"${conversation}"\n\nWrite a reply as this host:`

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
            content: userMessage
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
