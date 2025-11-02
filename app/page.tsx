import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

      {/* Subtle scan line effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="scan-line absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Title with glitch effect */}
        <div className="mb-8">
          <h1
            className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
              LIFE
            </span>
            <br />
            <span className="text-white">RELOADED</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
          One choice. One past. One chance to change everything.
        </p>

        {/* Main CTA */}
        <div className="mb-8">
          <Link href="/setup">
            <Button
              size="lg"
              className="text-lg px-12 py-7 bg-accent hover:bg-accent/90 text-black font-bold tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(134,239,172,0.5)] border-2 border-accent/50"
            >
              START SIMULATION
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-muted-foreground mb-4">Progress is saved in this browser. No account required.</p>

        {/* Configuration link */}
        <Link
          href="/setup"
          className="text-sm text-primary hover:text-accent transition-colors underline underline-offset-4"
        >
          Configure your life before starting
        </Link>

        {/* Footer with year */}
        <div className="mt-24 pt-8 border-t border-border/30">
          <p className="text-muted-foreground font-mono text-sm tracking-wider">
            SIMULATION STARTS IN <span className="text-accent font-bold">JAN/2008</span>
          </p>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30" />
    </main>
  )
}
