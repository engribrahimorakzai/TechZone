// import { useState, useRef, useEffect, useCallback } from 'react'
// import {
//   MessageCircle,
//   X,
//   Send,
//   Bot,
//   User,
//   Loader2,
//   Minimize2,
//   Maximize2,
//   Sparkles,
//   ShoppingBag,
//   Trash2,
// } from 'lucide-react'
// import { getData } from '../context/DataContext'

// // ── Grok API caller (frontend-only, key from .env) ──────────────────────────
// const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY
// const GROK_ENDPOINT = 'https://api.x.ai/v1/chat/completions'

// const buildSystemPrompt = (products) => {
//   const catalog = products.slice(0, 80)
//   const productSummary = catalog
//     .map((p) =>
//       [
//         `ID:${p.id}`,
//         `Name:${p.title}`,
//         `Brand:${p.brand || 'N/A'}`,
//         `Category:${p.category}`,
//         `Price:PKR ${p.price}`,
//         `Rating:${p.rating}/5`,
//         `Stock:${p.stock ?? 'Available'}`,
//         p.description ? `Desc:${p.description.slice(0, 100)}` : '',
//       ]
//         .filter(Boolean)
//         .join(' | ')
//     )
//     .join('\n')

//   return `You are TechBot 🤖, the official AI Shopping Assistant for TechZone — a premium electronics store.

// RULES:
// - Only answer using the product catalog below. Never make up info.
// - If info is not in the catalog say: "I don't have that information in our current catalog."
// - Keep responses short, friendly, and helpful.
// - Always show price in PKR format.
// - When recommending, mention: Product Name, Brand, Price, Rating.
// - You can help with: finding products, comparing, price ranges, best-rated items, categories.
// - Respond in the same language the user writes in (English or Urdu).

// PRODUCT CATALOG (${catalog.length} products):
// ${productSummary}`
// }

// // ── Intelligent Local Product Catalog Assistant (Fallback when API quota exhausted) ──
// function queryLocalCatalog(userQuery, products = []) {
//   const query = userQuery.toLowerCase().trim()

//   // 1. Greetings
//   if (/^(hi|hello|hey|salam|assalam|aoa|hy)\b/i.test(query)) {
//     return `Assalam-o-Alaikum! 👋 Welcome to TechZone.\n\nMain aapki TechZone catalog se products dhoondne, price check karne, specs aur ratings batane mein madad kar sakta hoon.\n\nKuch misalein:\n• "Laptops under 1000"\n• "Best rated products"\n• "Show smartphones"\n• Kisi bhi product ka naam likhein jaise "iPhone" ya "MacBook"`
//   }

//   // 2. Best rated products
//   if (query.includes('best rated') || query.includes('top rated') || query.includes('highest rating')) {
//     const top = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4)
//     if (!top.length) return "Catalog mein filhal products load nahi huay."
//     let res = "⭐ TechZone par Top-Rated Products yeh hain:\n\n"
//     top.forEach((p, idx) => {
//       res += `${idx + 1}. ${p.title} (${p.brand || 'TechZone'})\n   • Price: PKR ${p.price}\n   • Rating: ⭐ ${p.rating}/5\n   • Category: ${p.category}\n\n`
//     })
//     return res.trim()
//   }

//   // 3. Price under / budget queries (e.g. "under 1000", "below 500")
//   const underMatch = query.match(/(?:under|below|less than|sasta|cheap)\s*(?:pkr|rs|r)?\s*(\d+)/i)
//   if (underMatch) {
//     const maxPrice = parseFloat(underMatch[1])
//     let matches = products.filter((p) => p.price <= maxPrice)

//     // filter by category or word if present (e.g. "laptops under 1000")
//     if (query.includes('laptop')) matches = matches.filter((p) => p.category?.includes('laptop') || p.title?.toLowerCase().includes('laptop'))
//     if (query.includes('phone') || query.includes('mobile')) matches = matches.filter((p) => p.category?.includes('smartphones') || p.title?.toLowerCase().includes('phone'))

//     if (matches.length > 0) {
//       let res = `🔎 PKR ${maxPrice} ke budget mein yeh products available hain:\n\n`
//       matches.slice(0, 5).forEach((p) => {
//         res += `• ${p.title} — PKR ${p.price} (⭐ ${p.rating}/5)\n  Brand: ${p.brand || 'N/A'} | Stock: ${p.stock ?? 'Available'}\n\n`
//       })
//       return res.trim()
//     } else {
//       return `PKR ${maxPrice} ke budget mein filhal koi product nahi mila. Aap thoda budget increase kar ke search kar sakte hain!`
//     }
//   }

//   // 4. Category or Keyword matching
//   // Tokenize keywords
//   const cleanTokens = query
//     .replace(/[?.,!]/g, '')
//     .split(/\s+/)
//     .filter((w) => !['show', 'me', 'what', 'are', 'your', 'have', 'you', 'is', 'the', 'kya', 'hai', 'ka', 'ki', 'batao', 'dikhayein', 'tell', 'about'].includes(w))

//   const matched = products.filter((p) => {
//     const title = (p.title || '').toLowerCase()
//     const desc = (p.description || '').toLowerCase()
//     const cat = (p.category || '').toLowerCase()
//     const brand = (p.brand || '').toLowerCase()

//     return cleanTokens.some(
//       (token) =>
//         token.length > 2 &&
//         (title.includes(token) || desc.includes(token) || cat.includes(token) || brand.includes(token))
//     )
//   })

//   if (matched.length > 0) {
//     let res = `Hamare catalog se aapke sawal ke mutabiq yeh products mile hain:\n\n`
//     matched.slice(0, 4).forEach((p) => {
//       res += `📦 ${p.title}\n• Brand: ${p.brand || 'TechZone'}\n• Price: PKR ${p.price}\n• Rating: ⭐ ${p.rating}/5\n• Stock: ${p.stock ?? 'In Stock'}\n• Category: ${p.category}\n\n`
//     })
//     return res.trim()
//   }

//   // 5. Default when not found
//   return `Yeh maloomat hamare mojooda TechZone catalog mein dastyab nahi hai. 

// Aap hamare catalog se kisi product ka naam (jaise iPhone, MacBook, Watch), category (Smartphones, Laptops) ya price range (e.g. "under 500") pooch sakte hain!`
// }

// async function callGrok(messages, products) {
//   if (!GROK_API_KEY) {
//     throw new Error('VITE_GROK_API_KEY not set in .env file')
//   }

//   try {
//     const response = await fetch(GROK_ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${GROK_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: 'grok-3-mini',
//         messages: [
//           { role: 'system', content: buildSystemPrompt(products) },
//           ...messages,
//         ],
//         temperature: 0.4,
//         max_tokens: 600,
//       }),
//     })

//     if (!response.ok) {
//       const err = await response.text()
//       // If quota or payment required (403, 402, 429)
//       if (response.status === 403 || response.status === 402 || response.status === 429) {
//         console.warn('Grok API quota exhausted, switching to Catalog Engine:', err)
//         const lastUserMsg = messages[messages.length - 1]?.content || ''
//         const localReply = queryLocalCatalog(lastUserMsg, products)
//         return `${localReply}\n\n*(Note: Grok API credits limit reached, TechZone Smart Catalog Engine se jawab diya gaya hai.)*`
//       }
//       throw new Error(`Grok API error ${response.status}: ${err}`)
//     }

//     const data = await response.json()
//     return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.'
//   } catch (error) {
//     // If network or API quota error, gracefully provide catalog answer
//     if (error.message?.includes('403') || error.message?.includes('credits') || error.message?.includes('spending limit')) {
//       const lastUserMsg = messages[messages.length - 1]?.content || ''
//       return `${queryLocalCatalog(lastUserMsg, products)}\n\n*(Note: Grok API credits limit reached, TechZone Catalog Engine se jawab diya gaya hai.)*`
//     }
//     throw error
//   }
// }

// // ── Sub-components ────────────────────────────────────────────────────────────

// const TypingDots = () => (
//   <div className="flex items-center gap-1 px-4 py-3">
//     {[0, 1, 2].map((i) => (
//       <span
//         key={i}
//         className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce"
//         style={{ animationDelay: `${i * 0.15}s` }}
//       />
//     ))}
//   </div>
// )

// const Message = ({ msg }) => {
//   const isBot = msg.role === 'assistant'
//   return (
//     <div className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}>
//       {isBot && (
//         <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mt-1 shadow-sm">
//           <Bot className="w-4 h-4 text-white" />
//         </div>
//       )}
//       <div
//         className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-xs ${
//           isBot
//             ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-sm'
//             : 'bg-blue-600 text-white rounded-tr-sm'
//         }`}
//       >
//         {msg.content}
//         <span className={`block text-[10px] mt-1 ${isBot ? 'text-slate-400 dark:text-slate-500' : 'text-blue-200'}`}>
//           {msg.time}
//         </span>
//       </div>
//       {!isBot && (
//         <div className="w-7 h-7 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mt-1">
//           <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
//         </div>
//       )}
//     </div>
//   )
// }

// const QUICK_PROMPTS = [
//   { label: '💻 Laptops under PKR 1000', text: 'Show me laptops under PKR 1000' },
//   { label: '⭐ Best rated products', text: 'What are your best rated products?' },
//   { label: '📱 Show Smartphones', text: 'What smartphones do you have?' },
//   { label: '🎧 Headphones', text: 'Show me headphones and earphones' },
// ]

// // ── Main ChatBot Component ────────────────────────────────────────────────────

// const ChatBot = () => {
//   const { data: products, loading: productsLoading } = getData()
//   const [open, setOpen] = useState(false)
//   const [expanded, setExpanded] = useState(false)
//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       content: "Hi! I'm TechBot 🤖 — your AI Shopping Assistant at TechZone.\n\nAsk me anything about our products — prices, specs, brands, or recommendations!",
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     },
//   ])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const bottomRef = useRef(null)
//   const inputRef = useRef(null)

//   // Auto-scroll on new messages
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, loading])

//   // Focus input when opened
//   useEffect(() => {
//     if (open) setTimeout(() => inputRef.current?.focus(), 200)
//   }, [open])

//   const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//   const sendMessage = useCallback(
//     async (text) => {
//       const userText = (text ?? input).trim()
//       if (!userText || loading) return

//       setInput('')
//       setError(null)

//       const userMsg = { role: 'user', content: userText, time: now() }
//       setMessages((prev) => [...prev, userMsg])
//       setLoading(true)

//       try {
//         // Build conversation history (last 10 messages, no time field)
//         const history = [...messages, userMsg]
//           .slice(-10)
//           .map(({ role, content }) => ({ role, content }))

//         const reply = await callGrok(history, products)
//         setMessages((prev) => [
//           ...prev,
//           { role: 'assistant', content: reply, time: now() },
//         ])
//       } catch (err) {
//         console.warn('Chat error, answering from catalog:', err)
//         const localReply = queryLocalCatalog(userText, products)
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: 'assistant',
//             content: localReply,
//             time: now(),
//           },
//         ])
//       } finally {
//         setLoading(false)
//       }
//     },
//     [input, loading, messages, products]
//   )

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       sendMessage()
//     }
//   }

//   const clearChat = () => {
//     setMessages([
//       {
//         role: 'assistant',
//         content: "Chat cleared! How can I help you find the perfect product? 🛍️",
//         time: now(),
//       },
//     ])
//     setError(null)
//   }

//   // ── Panel size ────────────────────────────────────────────────────────────
//   const panelCls = expanded
//     ? 'fixed inset-4 sm:inset-8 z-[9999] flex flex-col'
//     : 'fixed bottom-20 right-4 sm:right-6 z-[9999] w-[340px] sm:w-[380px] h-[520px] flex flex-col'

//   return (
//     <>
//       {/* ── Floating trigger button ─────────────────────────────────────────── */}
//       <button
//         onClick={() => setOpen((v) => !v)}
//         className={`fixed bottom-5 right-5 sm:right-6 z-[9999] w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
//           open
//             ? 'bg-slate-700 dark:bg-slate-600 rotate-0 scale-95'
//             : 'bg-gradient-to-br from-blue-600 to-indigo-600 hover:scale-110 hover:shadow-blue-500/40'
//         }`}
//         aria-label="Open AI Chatbot"
//         title="TechBot — AI Shopping Assistant"
//       >
//         {open ? (
//           <X className="w-6 h-6 text-white" />
//         ) : (
//           <div className="relative">
//             <MessageCircle className="w-7 h-7 text-white" />
//             <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
//           </div>
//         )}
//       </button>

//       {/* ── Chat panel ─────────────────────────────────────────────────────── */}
//       {open && (
//         <div
//           className={`${panelCls} bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
//         >
//           {/* Header */}
//           <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 shrink-0">
//             <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
//               <Sparkles className="w-5 h-5 text-white" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-bold text-white leading-none">TechBot AI</p>
//               <p className="text-[11px] text-blue-200 mt-0.5">
//                 {productsLoading ? 'Loading products...' : `${products.length} products loaded`}
//               </p>
//             </div>
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={clearChat}
//                 className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition cursor-pointer"
//                 title="Clear chat"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setExpanded((v) => !v)}
//                 className="hidden sm:flex p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition cursor-pointer"
//                 title={expanded ? 'Minimize' : 'Expand'}
//               >
//                 {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
//               </button>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition cursor-pointer"
//                 title="Close"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Messages area */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60 dark:bg-slate-950/40 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
//             {messages.map((msg, i) => (
//               <Message key={i} msg={msg} />
//             ))}

//             {loading && (
//               <div className="flex gap-2.5 justify-start">
//                 <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mt-1 shadow-sm">
//                   <Bot className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl rounded-tl-sm shadow-xs">
//                   <TypingDots />
//                 </div>
//               </div>
//             )}

//             {error && (
//               <p className="text-xs text-rose-500 text-center px-2 py-1 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-100 dark:border-rose-900">
//                 ⚠️ {error}
//               </p>
//             )}

//             <div ref={bottomRef} />
//           </div>

//           {/* Quick prompts (show only when 1 message = just the greeting) */}
//           {messages.length === 1 && (
//             <div className="px-3 py-2 flex gap-1.5 flex-wrap border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
//               {QUICK_PROMPTS.map((qp) => (
//                 <button
//                   key={qp.text}
//                   onClick={() => sendMessage(qp.text)}
//                   className="text-[11px] px-2.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition cursor-pointer font-medium whitespace-nowrap"
//                 >
//                   {qp.label}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Input */}
//           <div className="px-3 py-3 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
//             <div className="flex gap-2 items-end bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700 px-3 py-2 focus-within:border-blue-400 dark:focus-within:border-blue-600 transition">
//               <ShoppingBag className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
//               <textarea
//                 ref={inputRef}
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Ask about any product, price or brand…"
//                 rows={1}
//                 className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none resize-none leading-relaxed max-h-24 overflow-y-auto"
//                 disabled={loading || productsLoading}
//               />
//               <button
//                 onClick={() => sendMessage()}
//                 disabled={!input.trim() || loading || productsLoading}
//                 className="w-8 h-8 shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer active:scale-95 disabled:cursor-not-allowed"
//                 title="Send message"
//               >
//                 {loading ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <Send className="w-3.5 h-3.5" />
//                 )}
//               </button>
//             </div>
//             <p className="text-[10px] text-center text-slate-400 dark:text-slate-600 mt-1.5">
//               Powered by Grok AI · Responses based on TechZone catalog
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default ChatBot
