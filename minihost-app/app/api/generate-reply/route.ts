import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { guestMessage, hostSettings } = await request.json()

    if (!guestMessage) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const systemPrompt = `You are a helpful assistant for Airbnb hosts. Generate warm, professional replies to guest messages.

Host preferences:
- Tone: ${hostSettings?.tone || 'warm and friendly'}
- Reply length: ${hostSettings?.replyLength || 'medium'}
- Greeting: ${hostSettings?.greeting || 'Hi'}
- Sign-off: ${hostSettings?.signOff || 'Best regards'}

Property info (if relevant):
- Check-in: ${hostSettings?.checkInTime || '4 PM'}
- Check-out: ${hostSettings?.checkOutTime || '10 AM'}
- WiFi: ${hostSettings?.wifiPassword || 'Will be provided'}

Guidelines:
- Be helpful and friendly
- Answer their questions directly
- Keep the response concise but complete
- Use emojis sparingly (1-2 max)
- Never make promises about things you're unsure of
- If they ask about early check-in or late checkout, say you'll check and get back to them`

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
            content: `Guest message:\n"${guestMessage}"\n\nGenerate a reply:`
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
