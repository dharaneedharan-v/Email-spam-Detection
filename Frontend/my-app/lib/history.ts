export type HistoryEntry = {
  id: string
  at: number
  text: string
  prediction: string
  is_spam: boolean
  durationMs?: number
}

const KEY = "spam_history_v1"

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : []
  } catch {
    return []
  }
}

export function saveHistory(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries))
  } catch {
    // ignore
  }
}
