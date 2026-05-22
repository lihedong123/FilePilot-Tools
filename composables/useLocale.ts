import en from '~/locales/en.json'
import zhCN from '~/locales/zh-CN.json'
import type { LocaleCode } from '~/types/tool'

const dictionaries = {
  en,
  'zh-CN': zhCN
}

export function useLocale() {
  const { trackToolEvent } = useToolAnalytics()
  const localeCookie = useCookie<LocaleCode>('filepilot-locale', {
    default: () => 'en',
    sameSite: 'lax'
  })
  const locale = useState<LocaleCode>('filepilot-locale', () => localeCookie.value)

  const setLocale = (value: LocaleCode) => {
    locale.value = value
    localeCookie.value = value

    if (import.meta.client) {
      document.documentElement.lang = value
      window.localStorage.setItem('filepilot-locale', value)
      trackToolEvent('language_changed', { language: value })
    }
  }

  const t = (path: string): string => {
    const dictionary = dictionaries[locale.value]
    const value = path.split('.').reduce<unknown>((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key]
      }

      return undefined
    }, dictionary)

    return typeof value === 'string' ? value : path
  }

  if (import.meta.client) {
    const saved = window.localStorage.getItem('filepilot-locale')

    if (saved === 'en' || saved === 'zh-CN') {
      locale.value = saved
      localeCookie.value = saved
      document.documentElement.lang = saved
    } else {
      document.documentElement.lang = locale.value
    }
  }

  return {
    locale,
    setLocale,
    t
  }
}
