'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const SINGAPORE: [number, number] = [103.8198, 1.3521]

type LocationMapProps = {
  latitude: number
  longitude: number
  token: string
}

function createGreatCircleArc(
  start: [number, number],
  end: [number, number],
  numPoints = 100
): [number, number][] {
  const toRad = (d: number) => (d * Math.PI) / 180
  const toDeg = (r: number) => (r * 180) / Math.PI

  const [lon1, lat1] = [toRad(start[0]), toRad(start[1])]
  const [lon2, lat2] = [toRad(end[0]), toRad(end[1])]

  // Angular distance between the two points
  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2)
      )
    )

  const points: [number, number][] = []
  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints
    const A = Math.sin((1 - f) * d) / Math.sin(d)
    const B = Math.sin(f * d) / Math.sin(d)
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2)
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2)
    const z = A * Math.sin(lat1) + B * Math.sin(lat2)
    const lat = toDeg(Math.atan2(z, Math.sqrt(x * x + y * y)))
    const lon = toDeg(Math.atan2(y, x))
    points.push([lon, lat])
  }
  return points
}

function createAvatarMarker() {
  const el = document.createElement('div')
  el.style.cssText = 'width: 40px; height: 52px; cursor: default;'
  el.innerHTML = `
    <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="24" width="16" height="14" rx="3" fill="#F5C842"/>
      <rect x="11" y="10" width="18" height="16" rx="5" fill="#F5C842"/>
      <rect x="14" y="15" width="4" height="4" rx="1" fill="#1a1a2e"/>
      <rect x="22" y="15" width="4" height="4" rx="1" fill="#1a1a2e"/>
      <path d="M15 22 Q20 26 25 22" stroke="#1a1a2e" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <rect x="13" y="37" width="6" height="10" rx="2" fill="#3b4a6b"/>
      <rect x="21" y="37" width="6" height="10" rx="2" fill="#3b4a6b"/>
      <rect x="4" y="24" width="8" height="5" rx="2" fill="#F5C842"/>
      <rect x="28" y="24" width="8" height="5" rx="2" fill="#F5C842"/>
    </svg>
  `
  return el
}

/*
  Kept in its own module so `next/dynamic` can hold mapbox-gl (~400 kB) out of
  the page's first load. Only rendered once a location and token are known.
*/
export default function LocationMap({ latitude, longitude, token }: LocationMapProps) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!container.current || map.current) return

    const userCoords: [number, number] = [longitude, latitude]
    mapboxgl.accessToken = token

    map.current = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [(SINGAPORE[0] + userCoords[0]) / 2, (SINGAPORE[1] + userCoords[1]) / 2],
      zoom: 1,
      interactive: false,
      attributionControl: true,
    })

    map.current.on('load', () => {
      if (!map.current) return

      map.current.fitBounds(
        [
          [Math.min(SINGAPORE[0], userCoords[0]), Math.min(SINGAPORE[1], userCoords[1])],
          [Math.max(SINGAPORE[0], userCoords[0]), Math.max(SINGAPORE[1], userCoords[1])],
        ],
        { padding: { top: 60, bottom: 60, left: 80, right: 80 }, maxZoom: 4, duration: 0 }
      )

      map.current.addSource('arc', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: createGreatCircleArc(SINGAPORE, userCoords, 120) },
        },
      })

      map.current.addLayer({
        id: 'arc-glow',
        type: 'line',
        source: 'arc',
        paint: {
          'line-color': '#ff8435',
          'line-width': 6,
          'line-blur': 8,
          'line-opacity': 0.35,
        },
      })

      map.current.addLayer({
        id: 'arc-dash',
        type: 'line',
        source: 'arc',
        paint: {
          'line-color': '#ff9e73',
          'line-width': 2,
          'line-dasharray': [5, 4],
        },
      })

      new mapboxgl.Marker({ element: createAvatarMarker(), anchor: 'bottom' })
        .setLngLat(SINGAPORE)
        .addTo(map.current)

      const userEl = document.createElement('div')
      userEl.innerHTML = `
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.268 21.732 0 14 0Z" fill="white"/>
          <circle cx="14" cy="14" r="5" fill="#94a3b8"/>
        </svg>
      `
      new mapboxgl.Marker({ element: userEl, anchor: 'bottom' })
        .setLngLat(userCoords)
        .addTo(map.current)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [latitude, longitude, token])

  return <div ref={container} className="h-80 w-full" />
}
