export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'theme-color',
          content: '#f7f9fc'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        }
      ],
      script: process.env.NUXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
        ? [
            {
              src: 'https://static.cloudflareinsights.com/beacon.min.js',
              defer: true,
              'data-cf-beacon': JSON.stringify({
                token: process.env.NUXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
              })
            }
          ]
        : []
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
