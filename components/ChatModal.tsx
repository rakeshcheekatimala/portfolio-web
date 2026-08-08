'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PaperPlaneRight, Stop, X } from '@phosphor-icons/react'

const STARTER_QUESTIONS = [
  "Summarize Rakesh's frontend platform impact",
  'Which teams would Rakesh fit best?',
  'Show his payments and eKYC proof',
  'What delivery risks can he reduce?',
]

interface ChatModalProps {
  onClose: () => void
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])

  const { messages, sendMessage, status, stop } = useChat({ transport })

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    sendMessage({ text })
  }

  function handleStarterClick(question: string) {
    sendMessage({ text: question })
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 backdrop-blur-md sm:items-center sm:p-4 md:p-6"
      style={{ backgroundColor: 'var(--modal-scrim)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-agent-title"
        className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden border border-line bg-surface shadow-high sm:h-[min(760px,calc(100dvh-48px))] sm:max-w-2xl sm:rounded-lg lg:max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-md border border-accent/30 bg-accent-wash text-sm font-semibold text-accent">
              R
            </div>
            <div className="min-w-0">
              <div id="ask-agent-title" className="text-[15px] font-semibold leading-tight text-ink">Ask My Agent</div>
              <div className="mt-0.5 text-xs leading-snug text-faint">Hiring-focused answers about Rakesh&apos;s work</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-md border border-transparent text-faint transition-colors hover:border-line hover:bg-raised hover:text-ink"
            aria-label="Close chat"
          >
            <X size={17} weight="bold" aria-hidden="true" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5 sm:py-6">
          {messages.length === 0 && (
            <div className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-start gap-6 pt-2 text-left sm:justify-center sm:pt-0">
              <div className="space-y-2 sm:text-center">
                <p className="text-base font-semibold text-ink sm:text-lg">Ask a focused hiring question.</p>
                <p className="text-sm leading-relaxed text-body">I can summarize Rakesh&apos;s experience, impact, case studies, and team fit.</p>
              </div>
              <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleStarterClick(q)}
                    className="min-h-14 rounded-md border border-line px-4 py-3 text-left text-sm font-medium leading-snug text-body transition-colors hover:border-accent hover:bg-accent-wash hover:text-accent sm:min-h-16"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const textPart = message.parts?.find((p) => p.type === 'text')
            const text = textPart ? (textPart as { type: 'text'; text: string }).text : ''
            if (!text) return null

            return (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="mr-2.5 mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-md border border-accent/30 bg-accent-wash">
                    <span className="text-[11px] font-semibold text-accent">R</span>
                  </div>
                )}
                <div
                  className={`max-w-[min(86%,42rem)] whitespace-pre-wrap rounded-md px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-accent font-medium text-accent-contrast'
                      : 'border border-line bg-raised text-body'
                  }`}
                >
                  {text}
                </div>
              </div>
            )
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="mr-2.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-md border border-accent/30 bg-accent-wash">
                <span className="text-[11px] font-semibold text-accent">R</span>
              </div>
              <div className="rounded-md border border-line bg-raised px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-line px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex items-end gap-2 sm:gap-3">
            <label htmlFor="ask-agent-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="ask-agent-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about Rakesh's fit, impact, or case studies..."
              rows={1}
              className="min-h-16 flex-1 resize-none rounded-md border border-line bg-raised px-4 py-3 text-base leading-6 text-ink transition-colors placeholder:text-faint focus:border-accent focus:outline-none sm:min-h-12 sm:text-sm"
              style={{ maxHeight: '120px' }}
            />
            {isLoading ? (
              <button
                onClick={stop}
                className="flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-md border border-line bg-raised text-ink transition-colors hover:border-accent hover:text-accent sm:h-11 sm:w-11"
                aria-label="Stop generation"
              >
                <Stop size={15} weight="fill" aria-hidden="true" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-md bg-accent text-accent-contrast transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
                aria-label="Send message"
              >
                <PaperPlaneRight size={16} weight="fill" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="mt-2 hidden text-center text-xs text-faint sm:block">Press Enter to send - Shift+Enter for new line - Esc to close</p>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
