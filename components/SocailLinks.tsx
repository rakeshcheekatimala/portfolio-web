'use client'

import React from 'react'
import Link from 'next/link'
import { GithubLogo, LinkedinLogo, Newspaper, XLogo } from '@phosphor-icons/react'

const socials = [
  { label: 'Twitter', href: 'https://x.com/RCheekatim12238', Icon: XLogo },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rakesh-cheekatimala/', Icon: LinkedinLogo },
  { label: 'GitHub', href: 'https://github.com/rakeshcheekatimala', Icon: GithubLogo },
  { label: 'Substack', href: 'https://rakeshcheekatimala.substack.com', Icon: Newspaper },
]

function SocailLinks() {
  return (
    <div className="flex items-center gap-1">
      {socials.map(({ label, href, Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-cursor-label={label}
          className="grid h-9 w-9 place-items-center rounded-md text-faint transition-colors hover:bg-accent-wash hover:text-accent"
        >
          <Icon size={18} weight="regular" aria-hidden="true" />
        </Link>
      ))}
    </div>
  )
}

export default SocailLinks
