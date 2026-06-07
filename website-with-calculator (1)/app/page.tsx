import { TransitiveTheory } from "@/components/transitive-theory"
import { TransitiveExamples } from "@/components/transitive-examples"
import { TransitiveCalculator } from "@/components/transitive-calculator"
import { BookOpen, Calculator, ListOrdered, GraduationCap } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <GraduationCap className="h-4 w-4" />
              Matematika Diskrit-Ridho Muhamad Nugroho-2507255
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground text-balance">
              Relasi <span className="text-primary">Menghantar</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Pelajari sifat <strong className="text-foreground">Transitive</strong> pada relasi matematika diskrit 
              dengan materi lengkap, 5 contoh soal, dan kalkulator interaktif
            </p>

            <nav className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="#materi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                <BookOpen className="h-5 w-5" />
                Materi
              </a>
              <a
                href="#contoh"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors font-medium"
              >
                <ListOrdered className="h-5 w-5" />
                5 Contoh
              </a>
              <a
                href="#kalkulator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors font-medium"
              >
                <Calculator className="h-5 w-5" />
                Kalkulator
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        {/* Theory Section */}
        <section id="materi" className="scroll-mt-8">
          <TransitiveTheory />
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-muted-foreground text-sm">Contoh Soal</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Examples Section */}
        <section id="contoh" className="scroll-mt-8">
          <TransitiveExamples />
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-muted-foreground text-sm">Praktik Langsung</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Calculator Section */}
        <section id="kalkulator" className="scroll-mt-8">
          <TransitiveCalculator />
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Materi <strong>Relasi dan Fungsi</strong> - Matematika Diskrit
            </p>
            <p className="text-xs text-muted-foreground">
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
