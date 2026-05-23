const analyticsScripts = []

const cloudflareAnalyticsToken = process.env.NUXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
const la51Id = process.env.NUXT_PUBLIC_51LA_ID || '3Q1UejfAH5jOa1gt'
const la51Ck = process.env.NUXT_PUBLIC_51LA_CK || '3Q1UejfAH5jOa1gt'

if (cloudflareAnalyticsToken) {
  analyticsScripts.push({
    src: 'https://static.cloudflareinsights.com/beacon.min.js',
    defer: true,
    'data-cf-beacon': JSON.stringify({
      token: cloudflareAnalyticsToken
    })
  })
}

if (la51Id && la51Ck) {
  const la51Params = new URLSearchParams({
    id: la51Id,
    ck: la51Ck,
    // Nuxt can change pages without a full browser reload, so hashMode lets 51la record those page changes.
    hashMode: 'true'
  })

  analyticsScripts.push({
    id: 'LA_COLLECT',
    charset: 'UTF-8',
    src: `https://sdk.51.la/js-sdk-pro.min.js?${la51Params.toString()}`,
    defer: true
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
