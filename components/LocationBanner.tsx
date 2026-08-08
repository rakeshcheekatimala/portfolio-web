'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const LocationMap = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-raised" />,
})

interface LocationData {
  distance: number
  city: string
  country: string
  timezone: string
  latitude: number
  longitude: number
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export default function LocationBanner() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/geolocation')
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setLocation(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="h-80 animate-pulse overflow-hidden rounded-lg border border-line bg-raised" />
    )
  }

  if (!location) return null

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      {MAPBOX_TOKEN ? (
        <LocationMap
          latitude={location.latitude}
          longitude={location.longitude}
          token={MAPBOX_TOKEN}
        />
      ) : (
        <div className="flex h-80 w-full items-center justify-center bg-raised">
          <p className="text-sm text-faint">Map unavailable - add NEXT_PUBLIC_MAPBOX_TOKEN to .env</p>
        </div>
      )}

      <div className="border-t border-line px-6 py-6 md:px-8">
        <p className="text-[17px] leading-relaxed text-body text-pretty">
          I&apos;m from <span className="font-semibold text-ink">Singapore</span>, roughly{' '}
          <span className="font-mono font-medium text-accent tnum">
            {location.distance.toLocaleString()}km
          </span>{' '}
          away from your current location, according to your IP address.
        </p>
      </div>
    </div>
  )
}
