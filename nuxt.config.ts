const analyticsScripts = []

const cloudflareAnalyticsToken = process.env.NUXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN

if (cloudflareAnalyticsToken) {
  analyticsScripts.push({
    src: 'https://static.cloudflareinsights.com/beacon.min.js',
    defer: true,
    'data-cf-beacon': JSON.stringify({
      token: cloudflareAnalyticsToken
    })
  })
}

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
      script: analyticsScripts
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
