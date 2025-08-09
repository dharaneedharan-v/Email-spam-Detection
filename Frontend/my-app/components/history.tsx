"use client"

import { useEffect, useMemo, useState } from "react"

import { ShieldAlert, ShieldCheck, Trash2, RefreshCw, RotateCcw } from "lucide-react"
import { Badge } from "./ui/badge"
import { loadHistory, saveHistory, type HistoryEntry } from "@/lib/history"
import { cn } from "@/lib/utils"
import SpamForm from "./spam-form"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"


export function HistoryPanel() {
  const [items, setItems] = useState<HistoryEntry[]>([])
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setItems(loadHistory())
  }, [refreshKey])

  const stats = useMemo(() => {
    const total = items.length
    const spam = items.filter((i) => i.is_spam).length
    const ham = total - spam
    return { total, spam, ham }
  }, [items])

  function handleResult(r: { prediction: string; is_spam: boolean; message: string; durationMs?: number }) {
    const next: HistoryEntry = {
      id: crypto.randomUUID(),
      at: Date.now(),
      text: r.message,
      prediction: r.prediction,
      is_spam: r.is_spam,
      durationMs: r.durationMs,
    }
    const updated = [next, ...items].slice(0, 20)
    setItems(updated)
    saveHistory(updated)
  }

  function clearHistory() {
    saveHistory([])
    setItems([])
  }

  return (
    <Card className="border-stone-200/70 bg-white/70 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-stone-800">{"Recent analyses"}</CardTitle>
            <CardDescription className="text-stone-500">
              {"Stored locally in your browser (up to 20 items)."}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setRefreshKey((k) => k + 1)}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              {"Refresh"}
            </Button>
            <Button variant="ghost" size="sm" onClick={clearHistory}>
              <Trash2 className="mr-1.5 h-3.5 w-3.5 text-red-600" />
              {"Clear"}
            </Button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-600">
          <Badge variant="secondary" className="bg-stone-100 text-stone-700 hover:bg-stone-200">
            {"Total: "}
            <span className="ml-1 font-medium">{stats.total}</span>
          </Badge>
          <Badge className="bg-red-600 text-white hover:bg-red-600">
            {"Spam: "}
            <span className="ml-1 font-medium">{stats.spam}</span>
          </Badge>
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
            {"Not spam: "}
            <span className="ml-1 font-medium">{stats.ham}</span>
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
        <ScrollArea className="h-[360px] rounded-md border bg-white">
          <ul className="divide-y">
            {items.length === 0 && (
              <li className="p-6 text-sm text-stone-500">{"No history yet—analyze a message to get started."}</li>
            )}
            {items.map((item) => (
              <li key={item.id} className="group p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.is_spam ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                        <ShieldCheck className="h-4 w-4 text-emerald-700" />
                      </div>
                    )}
                    <Badge
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px]",
                        item.is_spam ? "bg-red-600 text-white" : "bg-emerald-600 text-white",
                      )}
                    >
                      {item.is_spam ? "Spam" : "Not Spam"}
                    </Badge>
                  </div>
                  <div className="text-xs text-stone-500">
                    {new Date(item.at).toLocaleString()}
                    {typeof item.durationMs === "number" ? ` • ${item.durationMs} ms` : null}
                  </div>
                </div>
                <p className="line-clamp-3 whitespace-pre-wrap text-sm text-stone-700">{item.text}</p>
                <p className="mt-1 text-xs text-stone-500">{`Prediction: ${item.prediction}`}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-stone-800">
            <RotateCcw className="h-4 w-4" />
            {"Quick re-check"}
          </div>
          <p className="mb-3 text-sm text-stone-600">
            {"Paste or tweak content and re-run analysis here; results will be added to your history."}
          </p>
          <SpamForm apiPath="/api/predict" onResult={handleResult} />
        </div>
      </CardContent>
    </Card>
  )
}
