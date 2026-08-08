'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ChatCircleDots } from '@phosphor-icons/react'

const ChatModal = dynamic(() => import('./ChatModal'), { ssr: false })

export default function AskAgentButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor-label="Ask"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-line-strong px-6 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent sm:w-auto"
      >
        <ChatCircleDots size={16} weight="bold" aria-hidden="true" />
        Ask My Agent
      </button>

      {open && <ChatModal onClose={() => setOpen(false)} />}
    </>
  )
}
