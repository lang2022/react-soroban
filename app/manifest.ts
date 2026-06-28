import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AbacusSnap',
    short_name: 'AbacusSnap',
    description: 'Free interactive abacus tool for instant soroban visualization and mental math practice.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff7ed',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
