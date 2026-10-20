import { useState, useRef, useEffect, useCallback } from 'react'
import {
  MessageSquare,
  X,
  ArrowUp,
  Cpu,
  RotateCcw,
  Maximize2,
  Minimize2,
  Star,
} from 'lucide-react'
import { getData } from '../context/DataContext'

/* ────────────────────────────────────────────────────────────────────────────
   Config
──────────────────────────────────────────────────────────────────────────── */
const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY
const GROK_ENDPOINT = 'https://api.x.ai/v1/chat/completions'

const BRAND = 'TechZone'
const ASSISTANT = 'TechBot'

const SUGGESTIONS = [
  'Best rated products',
  'Laptops under 1000',
  'Show smartphones',
  'Headphones',
]

const WELCOME = {
  id: 'welcome',
  role: 'assistant',
  content: `Hi, I'm ${ASSISTANT}. I can help you find products, compare prices and check ratings from the ${BRAND} catalog.`,
}

const fmtPrice = (n) => `PKR ${Number(n || 0).toLocaleString('en-US')}`
const nowTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
let uid = 0
const nextId = () => `m${Date.now()}-${uid++}`

/* ────────────────────────────────────────────────────────────────────────────
   AI prompt (English only)
──────────────────────────────────────────────────────────────────────────── */
const buildSystemPrompt = (products) => {
  const catalog = products.slice(0, 80)
  const summary = catalog
    .map((p) =>
      [
        `ID:${p.id}`,
        `Name:${p.title}`,
        `Brand:${p.brand || 'N/A'}`,
        `Category:${p.category}`,
        `Price:PKR ${p.price}`,
        `Rating:${p.rating}/5`,
        `Stock:${p.stock ?? 'Available'}`,
        p.description ? `Desc:${p.description.slice(0, 100)}` : '',
      ]
        .filter(Boolean)
        .join(' | ')
    )
    .join('\n')

  return `You are ${ASSISTANT}, the AI shopping assistant for ${BRAND}, an electronics store.

RULES:
- ALWAYS reply in English only, even if the user writes in Urdu or Roman Urdu.
- Use only the product catalog below. Never invent products, prices or specs.
- If the answer is not in the catalog, say: "I don't have that information in our current catalog."
- Keep replies short, friendly and clear. No long paragraphs.
- Show prices in PKR.
- When recommending, use the exact product name from the catalog so it can be shown as a card.
- You can help with: finding products, comparing, price ranges, best-rated items, categories.

PRODUCT CATALOG (${catalog.length} products):
${summary}`
}

/* ────────────────────────────────────────────────────────────────────────────
   Local fallback engine – returns { text, products }
──────────────────────────────────────────────────────────────────────────── */
const STOP_WORDS = new Set([
  'show', 'me', 'what', 'are', 'your', 'have', 'you', 'is', 'the', 'tell',
  'about', 'any', 'some', 'find', 'under', 'below', 'for', 'and', 'with',
  'kya', 'hai', 'ka', 'ki', 'batao', 'dikhayein',
])

function queryLocalCatalog(userQuery, products = []) {
  const q = userQuery.toLowerCase().trim()

  if (!products.length) {
    return { text: 'The catalog is still loading. Please try again in a moment.', products: [] }
  }

  if (/^(hi|hello|hey|salam|assalam|aoa|hy)\b/.test(q)) {
    return {
      text: `Hello! Ask me about a product, a category or a budget, for example "laptops under 1000".`,
      products: [],
    }
  }

  if (/(best|top|highest)[\s-]*rated|best products/.test(q)) {
    const top = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)
    return { text: 'These are our highest rated products:', products: top }
  }

  const budget = q.match(/(?:under|below|less than|upto|up to|sasta|cheap)\s*(?:pkr|rs\.?|\$)?\s*(\d+)/)
  if (budget) {
    const max = parseFloat(budget[1])
    let list = products.filter((p) => p.price <= max)
    if (q.includes('laptop')) list = list.filter((p) => `${p.category} ${p.title}`.toLowerCase().includes('laptop'))
    if (/phone|mobile/.test(q)) list = list.filter((p) => `${p.category} ${p.title}`.toLowerCase().includes('phone'))
    list = list.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)
    return list.length
      ? { text: `Here are the best options within ${fmtPrice(max)}:`, products: list }
      : { text: `I couldn't find anything within ${fmtPrice(max)}. Try a slightly higher budget.`, products: [] }
  }

  const tokens = q
    .replace(/[?.,!]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .map((w) => (w.endsWith('s') ? w.slice(0, -1) : w))

  const matched = products
    .filter((p) => {
      const hay = `${p.title} ${p.description} ${p.category} ${p.brand}`.toLowerCase()
      return tokens.some((t) => hay.includes(t))
    })
    .slice(0, 3)

  if (matched.length) return { text: 'Here is what I found in the catalog:', products: matched }

  return {
    text: `I don't have that information in our current catalog. Try a product name, a category like "Laptops", or a budget like "under 500".`,
    products: [],
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   Grok caller
──────────────────────────────────────────────────────────────────────────── */
const pickMentioned = (text, products) =>
  products.filter((p) => p.title && text.toLowerCase().includes(p.title.toLowerCase())).slice(0, 3)

async function askAssistant(history, products) {
  const lastUser = history[history.length - 1]?.content || ''
  const fallback = () => ({ ...queryLocalCatalog(lastUser, products), fallback: true })

  if (!GROK_API_KEY) return fallback()

  try {
    const res = await fetch(GROK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages: [{ role: 'system', content: buildSystemPrompt(products) }, ...history],
        temperature: 0.4,
        max_tokens: 600,
      }),
    })

    if (!res.ok) {
      console.warn('Grok API unavailable, using local catalog engine:', res.status)
      return fallback()
    }

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content
    if (!text) return fallback()
    return { text, products: pickMentioned(text, products) }
  } catch (err) {
    console.warn('Network error, using local catalog engine:', err)
    return fallback()
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   UI pieces
──────────────────────────────────────────────────────────────────────────── */
const RichText = ({ text }) =>
  text.split('\n').map((line, i) => (
    <p key={i} className={line.trim() ? '' : 'h-2'}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>
        ) : (
          <span key={j}>{part.replace(/\*(?!\*)/g, '')}</span>
        )
      )}
    </p>
  ))

const ProductCard = ({ p }) => {
  const img = p.thumbnail || p.images?.[0]
  const low = typeof p.stock === 'number' && p.stock > 0 && p.stock <= 10
  const out = typeof p.stock === 'number' && p.stock === 0

  return (
    <div className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 p-2.5">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
        {img && <img src={img} alt={p.title} loading="lazy" className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-slate-100">{p.title}</p>
        <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
          {[p.brand, p.category].filter(Boolean).join(' / ')}
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="text-[13px] font-bold text-teal-700 dark:text-teal-300">{fmtPrice(p.price)}</span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {Number(p.rating || 0).toFixed(1)}
          </span>
        </div>
        {(low || out) && (
          <span
            className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${
              out
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}
          >
            {out ? 'Out of stock' : `Only ${p.stock} left`}
          </span>
        )}
      </div>
    </div>
  )
}

const Bubble = ({ msg }) => {
  const bot = msg.role === 'assistant'
  return (
    <div className={`flex ${bot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[88%] flex-col gap-2 ${bot ? 'items-start' : 'items-end'}`}>
        <div
          className={`px-3.5 py-2.5 text-[13.5px] leading-relaxed break-words ${
            bot
              ? 'rounded-2xl rounded-bl-md bg-white text-slate-800 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700'
              : 'rounded-2xl rounded-br-md bg-teal-700 text-white'
          }`}
        >
          <RichText text={msg.content} />
        </div>

        {msg.products?.length > 0 && (
          <div className="flex w-full flex-col gap-2">
            {msg.products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}

        <span className="px-1 text-[10px] text-slate-400 dark:text-slate-500">
          {msg.time}
          {msg.fallback && ' · Catalog search'}
        </span>
      </div>
    </div>
  )
}

const Typing = () => (
  <div className="flex justify-start">
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate-400 motion-safe:animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
)

/* ────────────────────────────────────────────────────────────────────────────
   Main component
──────────────────────────────────────────────────────────────────────────── */
const ChatBot = () => {
  const { data: products = [], loading: productsLoading } = getData()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState([{ ...WELCOME, time: nowTime() }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading, open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const send = useCallback(
    async (text) => {
      const content = (text ?? input).trim()
      if (!content || loading) return

      const userMsg = { id: nextId(), role: 'user', content, time: nowTime() }
      setMessages((prev) => [...prev, userMsg])
      setInput('')
      if (inputRef.current) inputRef.current.style.height = 'auto'
      setLoading(true)

      const history = [...messages, userMsg]
        .filter((m) => m.id !== 'welcome')
        .slice(-10)
        .map(({ role, content }) => ({ role, content }))

      const reply = await askAssistant(history, products)
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          content: reply.text,
          products: reply.products,
          fallback: reply.fallback,
          time: nowTime(),
        },
      ])
      setLoading(false)
    },
    [input, loading, messages, products]
  )

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const onChange = (e) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`
  }

  const reset = () => setMessages([{ ...WELCOME, time: nowTime() }])

  const panel = expanded
    ? 'fixed inset-3 sm:inset-8 z-[9999]'
    : 'fixed bottom-24 right-3 sm:right-6 z-[9999] w-[calc(100vw-1.5rem)] sm:w-[400px] h-[min(600px,calc(100vh-8rem))]'

  const canSend = input.trim() && !loading && !productsLoading

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="fixed bottom-5 right-3 sm:right-6 z-[9999] flex h-14 items-center gap-2.5 rounded-full bg-slate-900 pl-4 pr-5 text-white shadow-lg shadow-slate-900/25 transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:bg-teal-600 dark:hover:bg-teal-500 cursor-pointer"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        <span className="text-sm font-medium">{open ? 'Close' : 'Ask TechBot'}</span>
      </button>

      {/* Panel */}
      {open && (
        <section
          role="dialog"
          aria-label={`${ASSISTANT} chat`}
          className={`${panel} flex flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700`}
        >
          {/* Header */}
          <header className="flex shrink-0 items-center gap-3 bg-slate-900 px-4 py-3 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300">
              <Cpu className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold leading-tight">{ASSISTANT}</h2>
              <p className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${productsLoading ? 'bg-amber-400' : 'bg-emerald-400'}`}
                />
                {productsLoading ? 'Loading catalog' : `${products.length} products in catalog`}
              </p>
            </div>
            <button
              onClick={reset}
              title="New chat"
              aria-label="Start a new chat"
              className="rounded-md p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setExpanded((v) => !v)}
              title={expanded ? 'Shrink' : 'Expand'}
              aria-label={expanded ? 'Shrink chat' : 'Expand chat'}
              className="hidden rounded-md p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white sm:block cursor-pointer"
            >
              {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(false)}
              title="Close"
              aria-label="Close chat"
              className="rounded-md p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* Messages */}
          <div
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
            role="log"
            aria-live="polite"
          >
            {messages.map((m) => (
              <Bubble key={m.id} msg={m} />
            ))}
            {loading && <Typing />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 [scrollbar-width:none]">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={loading || productsLoading}
                className="shrink-0 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-teal-600 hover:text-teal-700 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-300 cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Composer */}
          <div className="shrink-0 bg-white px-3 pb-3 pt-1 dark:bg-slate-900">
            <div className="flex items-end gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 transition focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-800">
              <textarea
                ref={inputRef}
                value={input}
                onChange={onChange}
                onKeyDown={onKeyDown}
                rows={1}
                disabled={productsLoading}
                placeholder="Ask about a product, price or brand"
                aria-label="Message"
                className="max-h-24 flex-1 resize-none bg-transparent py-1 text-sm leading-relaxed text-slate-900 placeholder-slate-400 outline-none dark:text-slate-100"
              />
              <button
                onClick={() => send()}
                disabled={!canSend}
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-700 text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700 cursor-pointer"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-slate-400 dark:text-slate-500">
              Answers are based on the {BRAND} catalog. Prices and stock may change.
            </p>
          </div>
        </section>
      )}
    </>
  )
}

export default ChatBot