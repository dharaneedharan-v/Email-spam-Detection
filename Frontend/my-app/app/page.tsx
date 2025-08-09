import { Shield, Inbox, MessageSquareText, Clock, History } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SpamForm from "@/components/spam-form"
import { HistoryPanel } from "@/components/history"
import { ThemeToggle } from "@/components/theme-toggle"
import Ambient from "@/components/ambient"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-stone-50 to-stone-100">
      <Ambient />

      <header className="sticky top-0 z-20 border-b border-stone-200/60 bg-white/70 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white shadow-sm">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-4 text-stone-900">Spam Shield</p>
              <p className="text-xs text-stone-500">Email/SMS Classifier</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <div className="hidden items-center gap-1 md:flex">
              <Clock className="h-4 w-4" />
              {"Realtime verdicts"}
            </div>
            <div className="hidden h-4 w-px bg-stone-300 md:block" />
            <div className="hidden items-center gap-1 md:flex">
              <History className="h-4 w-4" />
              {"On-device history"}
            </div>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <section className="relative container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 grid gap-4 md:mb-12 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs text-stone-700 shadow-sm backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              {"Secure server proxy"}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
              {"Classify messages with clarity"}
            </h1>
            <p className="max-w-prose text-stone-600">
              {"Paste any email or SMS and get an instant, readable verdict."}
              {" Built with a neat, accessible UI and a privacy-aware API proxy."}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-stone-600">
              <span className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm shadow-sm">
                <Inbox className="h-4 w-4 text-stone-500" />
                {"Email"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm shadow-sm">
                <MessageSquareText className="h-4 w-4 text-stone-500" />
                {"SMS"}
              </span>
            </div>
          </div>

          <Card className="border-stone-200/70 shadow-lg shadow-stone-900/5 md:order-last">
            <CardHeader className="pb-2">
              <CardTitle className="text-stone-800">{"Analyze a message"}</CardTitle>
              <CardDescription className="text-stone-500">
                {"Get a verdict in seconds. Examples included."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SpamForm apiPath="/api/predict" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <HistoryPanel />
          </div>

          <Card className="border-stone-200/70 bg-white/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-stone-800">{"Safety checklist"}</CardTitle>
              <CardDescription className="text-stone-500">
                {"Use this quick guide to spot suspicious content."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-stone-700">
                <li>{"• Check sender address and domain spelling."}</li>
                <li>{"• Avoid clicking shortened or unfamiliar links."}</li>
                <li>{"• Never share passwords or OTP codes."}</li>
                <li>{"• Beware of urgent threats or unrealistic prizes."}</li>
                <li>{"• Confirm with the source when in doubt."}</li>
              </ul>
              <div className="mt-4 rounded-md border bg-stone-50 p-3 text-xs text-stone-600">
                {"Tip: Combine the verdict with your judgment—no classifier is perfect."}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="mt-10 border-t border-stone-200/60 bg-white/60 py-6 text-center text-xs text-stone-500 backdrop-blur">
        {"Made with Next.js, Tailwind, and shadcn/ui"}
      </footer>
    </main>
  )
}
