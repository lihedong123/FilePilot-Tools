export function parsePageRange(input: string, pageCount: number): number[] {
  const trimmed = input.trim().toLowerCase()

  if (!trimmed || trimmed === 'all') {
    return Array.from({ length: pageCount }, (_, index) => index)
  }

  const pages = new Set<number>()

  for (const part of trimmed.split(',')) {
    const token = part.trim()

    if (!token) {
      throw new Error('Invalid page range')
    }

    if (token.includes('-')) {
      const [startText, endText] = token.split('-')
      const start = Number(startText)
      const end = Number(endText)

      if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > pageCount) {
        throw new Error('Invalid page range')
      }

      for (let page = start; page <= end; page += 1) {
        pages.add(page - 1)
      }
    } else {
      const page = Number(token)

      if (!Number.isInteger(page) || page < 1 || page > pageCount) {
        throw new Error('Invalid page range')
      }

      pages.add(page - 1)
    }
  }

  return Array.from(pages).sort((a, b) => a - b)
}
