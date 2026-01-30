import React, { useEffect } from 'react'

interface AdSenseProps {
  client: string
  slot: string
  style?: React.CSSProperties
}

const AdSense: React.FC<AdSenseProps> = ({ client, slot, style }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const addScriptIfNeeded = () => {
      if (!document.querySelector('script[src*="adsbygoogle"]')) {
        const s = document.createElement('script')
        s.async = true
        s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
        s.crossOrigin = 'anonymous'
        document.head.appendChild(s)
        s.onload = () => {
          try {
            ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
            ;(window as any).adsbygoogle.push({})
          } catch (err) {
            console.error(err)
          }
        }
      } else {
        try {
          ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
          ;(window as any).adsbygoogle.push({})
        } catch (err) {
          console.error(err)
        }
      }
    }

    addScriptIfNeeded()
  }, [client])

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

export default AdSense
