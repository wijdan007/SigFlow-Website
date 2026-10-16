'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { X, Send, Mic, MicOff, Calendar, Volume2, VolumeX, Bot } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }

const GREETING = "Hey! I'm Sig, your GTM strategist. What's your biggest outbound challenge right now?"
const CALENDLY  = 'https://calendly.com/book-strategycall-sigflow-wijdan'

export default function ChatWidget() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: GREETING }])
  const [input, setInput]       = useState('')
  const [thinking, setThinking] = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceOn, setVoiceOn]     = useState(false)
  const [pulse, setPulse]         = useState(true)
  const [noKey, setNoKey]         = useState(false)

  const bottomRef      = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (open) { setPulse(false); setTimeout(() => inputRef.current?.focus(), 120) }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const send = async (text: string) => {
    if (!text.trim() || thinking) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setThinking(true)
    setNoKey(false)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      if (data.error) {
        const isKeyError = data.error.includes('GROQ_API_KEY') || res.status === 500
        if (isKeyError) setNoKey(true)
        setMessages(prev => [...prev, { role: 'assistant', content: isKeyError ? '⚠️ API key not configured — see setup below.' : 'Something went wrong. Try again.' }])
      } else {
        const reply: Message = { role: 'assistant', content: data.text }
        setMessages(prev => [...prev, reply])
        if (voiceOn) speakText(data.text)
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Try again.' }])
    } finally {
      setThinking(false)
    }
  }

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 1.05
    const voices = window.speechSynthesis.getVoices()
    const v = voices.find(v => v.name.includes('Google') && v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en'))
    if (v) u.voice = v
    window.speechSynthesis.speak(u)
  }

  const toggleVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { alert('Voice input needs Chrome or Edge.'); return }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return }
    const r = new SR()
    recognitionRef.current = r
    r.continuous = false; r.interimResults = false; r.lang = 'en-US'
    r.onresult = (e: any) => { setListening(false); send(e.results[0][0].transcript) }
    r.onerror = () => setListening(false)
    r.onend   = () => setListening(false)
    r.start(); setListening(true)
  }

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  const hasCalendly = (t: string) =>
    t.includes('calendly.com') || (t.toLowerCase().includes('book') && t.toLowerCase().includes('call'))

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]" style={{ pointerEvents: 'auto' }}>
        {!open && (
          <div className="relative">
            {pulse && <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(59,130,246,0.45)', animationDuration: '1.5s' }} />}
            <button
              onClick={() => setOpen(true)}
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)', boxShadow: '0 0 28px rgba(59,130,246,0.55), 0 4px 20px rgba(0,0,0,0.45)' }}
              aria-label="Open GTM assistant"
            >
              <Bot size={24} color="white" />
            </button>
            <div className="absolute -top-10 right-0 whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none" style={{ background: 'rgba(10,14,26,0.92)', color: '#F8FAFC', border: '1px solid rgba(59,130,246,0.35)', backdropFilter: 'blur(10px)' }}>
              Ask Sig — GTM AI
            </div>
          </div>
        )}

        {open && (
          <div className="flex flex-col rounded-2xl overflow-hidden" style={{ width: 'min(380px, calc(100vw - 24px))', height: 'min(560px, calc(100dvh - 100px))', background: 'rgba(8,10,18,0.97)', border: '1px solid rgba(59,130,246,0.22)', backdropFilter: 'blur(24px)', boxShadow: '0 0 70px rgba(59,130,246,0.12), 0 24px 60px rgba(0,0,0,0.7)' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(59,130,246,0.07)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)', color: 'white' }}>S</div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Sig</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: thinking ? '#F59E0B' : '#22C55E', animation: thinking ? 'pulse 1s infinite' : 'none' }} />
                    <p className="text-[10px]" style={{ color: '#94A3B8' }}>GTM Strategist · Powered by Llama 3.3</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setVoiceOn(v => !v)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: voiceOn ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)', color: voiceOn ? '#3B82F6' : '#475569' }} title="Toggle voice output">
                  {voiceOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
                </button>
                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10" style={{ color: '#475569' }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(59,130,246,0.15) transparent' }}>
              {messages.map((msg, i) => (
                <div key={i} className={'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className="max-w-[85%] text-sm leading-relaxed rounded-2xl px-4 py-2.5"
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg,#3B82F6,#2563EB)', color: 'white', borderBottomRightRadius: '4px' }
                      : { background: 'rgba(255,255,255,0.055)', color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.07)', borderBottomLeftRadius: '4px' }}
                  >
                    {msg.content}
                    {msg.role === 'assistant' && hasCalendly(msg.content) && (
                      <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-2.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)', color: 'white', textDecoration: 'none' }}>
                        <Calendar size={12} /> Book a Strategy Call
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.07)', borderBottomLeftRadius: '4px' }}>
                    <div className="flex gap-1.5 items-center">
                      {[0, 1, 2].map(j => <span key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: '#3B82F6', animation: 'sigBounce 1.2s ease-in-out infinite', animationDelay: j * 0.2 + 's' }} />)}
                    </div>
                  </div>
                </div>
              )}

              {/* API key setup banner */}
              {noKey && (
                <div className="rounded-xl p-3 text-xs" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5' }}>
                  <p className="font-semibold mb-1">Quick setup needed</p>
                  <p style={{ color: '#94A3B8' }}>Get a free API key at <span style={{ color: '#60A5FA' }}>console.groq.com</span> (no card required), then add it to <code style={{ color: '#A5F3FC' }}>.env.local</code>:</p>
                  <code className="block mt-1.5 px-2 py-1 rounded text-[11px]" style={{ background: 'rgba(0,0,0,0.4)', color: '#A5F3FC' }}>GROQ_API_KEY=gsk_...</code>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 px-3 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {listening && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#EF4444', animation: 'pulse 1s infinite' }} />
                  <span className="text-xs" style={{ color: '#EF4444' }}>Listening…</span>
                </div>
              )}
              <div className="flex items-end gap-2 rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder={thinking ? 'Please wait…' : 'Ask anything about GTM…'}
                  rows={1}
                  disabled={thinking}
                  className="flex-1 bg-transparent resize-none text-sm outline-none disabled:opacity-40"
                  style={{ color: '#F8FAFC', maxHeight: '80px', lineHeight: '1.5', paddingTop: '2px' }}
                />
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={toggleVoice} disabled={thinking} className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-30" style={{ background: listening ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)', color: listening ? '#EF4444' : '#475569' }}>
                    {listening ? <MicOff size={14} /> : <Mic size={14} />}
                  </button>
                  <button onClick={() => send(input)} disabled={!input.trim() || thinking} className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-30" style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)', color: 'white' }}>
                    <Send size={13} />
                  </button>
                </div>
              </div>
              <p className="text-center text-[10px] mt-2" style={{ color: '#1E293B' }}>
                Sig by Sigflow GTM · <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ color: '#334155' }}>Book a call</a>
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes sigBounce {
          0%,80%,100% { transform:translateY(0); opacity:.35; }
          40% { transform:translateY(-5px); opacity:1; }
        }
      `}</style>
    </>
  )
}
