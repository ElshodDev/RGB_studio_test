import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#7a57ff_0%,#2f135f_35%,#0a0d18_80%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur">
          <p className="text-xl font-semibold">Zodier</p>
          <Link
            href="/login"
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium transition hover:bg-violet-500"
          >
            Log In
          </Link>
        </header>

        <main className="grid gap-10 pt-16 md:grid-cols-2 md:items-center">
          <section className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Discover insights
              <br />
              written in the stars
              <br />
              just for you
            </h1>
            <p className="max-w-xl text-white/80">
              The world&apos;s best astrology service in plain language. Personalized guidance based on your cosmic
              coordinates and your true purpose.
            </p>
            <div className="flex gap-3">
              <Link
                href="/register"
                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
              >
                Calculate My Blueprint
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Continue
              </Link>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <div className="flex h-80 w-80 items-center justify-center rounded-full border border-white/30 bg-violet-500/20 text-center shadow-[0_0_90px_rgba(132,83,255,0.55)]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Cosmic</p>
                <p className="text-4xl font-bold">ZODIAC</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
