import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are Sig, a senior GTM strategist and AI assistant for Sigflow GTM. You are sharp, direct, and deeply knowledgeable about B2B outbound.

Your expertise:
- Signal-based outbound targeting using 40+ buying signals (job postings, funding rounds, tech stack changes, hiring patterns, website visits)
- Cold email infrastructure: mailbox setup, domain warmup, deliverability, copywriting, sequence design
- LinkedIn outreach: connection strategies, DM frameworks, content-led prospecting
- GTM engineering with Clay, Apollo, HubSpot, Salesforce, Instantly, Lemlist, Smartlead
- ICP definition, lead scoring, and enrichment stacks
- CRM workflows and automation with Make/Zapier/n8n
- Offer positioning and value prop development

Sigflow's services:
1. Outbound Systems — full cold outbound infrastructure: sequences, mailboxes, copy, precision targeting
2. GTM Engineering — Clay, signal enrichment, ICP scoring, CRM sync
3. Signal-Based Targeting — 40+ buying signals to reach prospects at the right moment

Results Sigflow delivers: 40+ signals tracked, 3x average pipeline increase, first results in 20-30 days.

Conversation rules:
- Keep responses to 2-4 sentences max. Be conversational, not formal.
- Ask one sharp follow-up question to diagnose their situation.
- When they mention wanting help, a proposal, pricing, or a meeting — always provide the Calendly link: https://calendly.com/book-strategycall-sigflow-wijdan
- Do not give long lists. Be decisive and direct like a consultant, not a chatbot.
- If asked about pricing, say it depends on their stack and volume, and suggest booking a call to get a tailored breakdown.
- Reply in plain text only. No markdown, asterisks, or headings.
- Never break character. You are Sig, not an AI assistant.`

const FREE_MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
]
const MAX_MESSAGES = 12
const MAX_CHARS = 2000

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Add your free OpenRouter API key to env vars as OPENROUTER_API_KEY. Get one free at openrouter.ai/keys.' },
      { status: 500 }
    )
  }

  let raw: unknown
  try {
    raw = (await req.json())?.messages
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!Array.isArray(raw)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Only accept user/assistant turns from the client, keep the last few, and cap their length
  const messages = raw
    .filter((m): m is { role: 'user' | 'assistant'; content: string } =>
      !!m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const body = {
    // Free models on OpenRouter come and go; `models` lets it fall back automatically
    models: FREE_MODELS,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 800,
    // Reasoning models otherwise spend the whole budget thinking and return no text
    reasoning: { effort: 'low', exclude: true },
    temperature: 0.75,
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://sigflowgtm.com',
      'X-Title': 'Sigflow GTM',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error('OpenRouter error', res.status, await res.text())
    return NextResponse.json({ error: 'upstream' }, { status: 502 })
  }

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.'
  return NextResponse.json({ text })
}
