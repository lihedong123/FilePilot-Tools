import type { ToolKey } from '~/types/tool'

type ToolEventName =
  | 'tool_file_selected'
  | 'tool_process_started'
  | 'tool_process_succeeded'
  | 'tool_process_failed'
  | 'tool_result_downloaded'
  | 'language_changed'

type ToolEventParams = {
  tool_key?: ToolKey
  file_count?: number
  file_type_group?: 'image' | 'pdf' | 'text' | 'unknown'
  result_count?: number
  error_type?: string
  language?: string
}

export function useToolAnalytics() {
  const trackToolEvent = (eventName: ToolEventName, params: ToolEventParams = {}) => {
    if (!import.meta.client) {
      return
    }

    const payload = sanitizeParams(params)
    window.dispatchEvent(new CustomEvent('filepilot-analytics', {
      detail: {
        eventName,
        params: payload
      }
    }))

    const win = window as Window & {
      dataLayer?: unknown[]
      gtag?: (...args: unknown[]) => void
      plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void
    }

    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, payload)
    }

    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: eventName,
        ...payload
      })
    }

    if (typeof win.plausible === 'function') {
      win.plausible(eventName, { props: payload })
    }
  }

  const getFileTypeGroup = (files: File[]): ToolEventParams['file_type_group'] => {
    if (files.length === 0) {
      return 'unknown'
    }

    if (files.every((file) => file.type.startsWith('image/'))) {
      return 'image'
    }

    if (files.every((file) => file.type === 'application/pdf')) {
      return 'pdf'
    }

    if (files.every((file) => file.type.startsWith('text/'))) {
      return 'text'
    }

    return 'unknown'
  }

  return {
    getFileTypeGroup,
    trackToolEvent
  }
}

function sanitizeParams(params: ToolEventParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== '')
  )
}
