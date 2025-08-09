"use client"

import type * as React from "react"
import { useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ShieldAlert, ShieldCheck, Loader2, Sparkles, Copy } from "lucide-react"

type PredictionResponse = {
  prediction: string
  is_spam: boolean
}

export type SpamFormProps = {
  apiPath?: string
  className?: string
  onResult?: (r: PredictionResponse & { message: string; durationMs?: number }) => void
}

const DEFAULTS: Required<Pick<SpamFormProps, "apiPath" | "className">> = {
  apiPath: "/api/predict",
  className: "",
}

const EXAMPLES: string[] = [
  "Congratulations! You have won a $1000 gift card. Click here to claim now.",
  "Reminder: Your dentist appointment is tomorrow at 10:00 AM. Reply YES to confirm.",
  "Urgent: Your account has been compromised. Verify your details at http://secure-login.example.com",
  "Team meeting moved to 3 PM today. Agenda: Q3 planning. See you there!",
]

export default function SpamForm(props: SpamFormProps) {
  const { apiPath, className, onResult } = { ...DEFAULTS, ...props }

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<(PredictionResponse & { durationMs?: number }) | null>(null)

  const charCount = message.trim().length
  const disabled = useMemo(() => loading || charCount === 0, [loading, charCount])

  const useExample = (text: string) => {
    setMessage(text)
    setError(null)
    setResult(null)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    const content = message.trim()
    if (!content) {
      setError("Please enter a message to analyze.")
      return
    }

    setLoading(true)
    const t0 = performance.now()
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      })
      const data = (await res.json()) as PredictionResponse | { error?: string }
      if (!res.ok) {
        const msg = (data as any)?.error ?? "An error occurred while analyzing the message."
        setError(msg)
        return
      }
      const t1 = performance.now()
      const durationMs = Math.round(t1 - t0)
      const payload = { ...(data as PredictionResponse), durationMs }
      setResult(payload)
      onResult?.({ ...(data as PredictionResponse), message: content, durationMs })
    } catch {
      const msg = "Unable to connect to the server. Please make sure the API is running."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">{"Compose"}</TabsTrigger>
            <TabsTrigger value="examples">{"Examples"}</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="message" className="text-stone-700">
                {"Message"}
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={"Paste email or SMS text here..."}
                className="min-h-[150px] resize-y bg-white/90"
                aria-describedby="message-help"
              />
              <div className="flex items-center justify-between text-xs text-stone-500">
                <p id="message-help">{"Text is sent to the classifier endpoint for analysis."}</p>
                <p>{charCount > 0 ? `${charCount} chars` : " "}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-2">
              {EXAMPLES.map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => useExample(ex)}
                  className="group rounded-lg border bg-white p-3 text-left text-sm leading-relaxed text-stone-700 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-2 inline-flex items-center gap-1 text-[11px] text-stone-500">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    {"Example "}
                    {idx + 1}
                  </div>
                  <span className="line-clamp-3">{ex}</span>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={disabled} className="bg-stone-900 text-white hover:bg-stone-800">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {"Analyzing..."}
              </>
            ) : (
              "Analyze Message"
            )}
          </Button>
        </div>
      </form>

      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertTitle>{"Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card aria-live="polite" className={cn("border-2", result.is_spam ? "border-red-300" : "border-emerald-300")}>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {result.is_spam ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <ShieldAlert className="h-5 w-5 text-red-600" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <ShieldCheck className="h-5 w-5 text-emerald-700" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-stone-900">{"Verdict"}</h3>
                    <Badge
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px]",
                        result.is_spam
                          ? "bg-red-600 text-white hover:bg-red-600"
                          : "bg-emerald-600 text-white hover:bg-emerald-600",
                      )}
                    >
                      {result.is_spam ? "Spam" : "Not Spam"}
                    </Badge>
                  </div>
                  <p className="text-sm text-stone-600">{`Prediction: ${result.prediction}`}</p>
                </div>
              </div>

              {typeof result.durationMs === "number" && (
                <div className="text-xs text-stone-500">{`${result.durationMs} ms`}</div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(message)
                  } catch (error) {
                    console.error('Failed to copy:', error)
                  }
                }}
                className="bg-stone-100 text-stone-700 hover:bg-stone-200"
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                {"Copy message"}
              </Button>
              <span className="text-xs text-stone-500">
                {"Review the content carefully—classifiers can be imperfect."}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}