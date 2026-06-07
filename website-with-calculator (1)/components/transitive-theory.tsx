"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react"

export function TransitiveTheory() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8" />
          Materi Relasi Menghantar
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Relasi Menghantar (Transitive) adalah salah satu sifat penting dalam teori himpunan dan relasi matematika diskrit
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              Definisi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Relasi <strong className="text-primary">R</strong> pada himpunan <strong className="text-primary">A</strong> disebut <strong className="text-chart-2">menghantar</strong> jika:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <p className="text-center font-mono text-lg">
                Jika <span className="text-primary">(a, b) ∈ R</span> dan <span className="text-primary">(b, c) ∈ R</span>
              </p>
              <p className="text-center font-mono text-lg mt-2">
                maka <span className="text-chart-2">(a, c) ∈ R</span>
              </p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                untuk semua a, b, c ∈ A
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Lightbulb className="h-5 w-5" />
              Cara Mudah Memahami
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Bayangkan seperti &quot;rantai&quot; hubungan:
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded">a</span>
              <ArrowRight className="h-5 w-5 text-primary" />
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded">b</span>
              <ArrowRight className="h-5 w-5 text-primary" />
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded">c</span>
            </div>
            <p className="text-center text-muted-foreground">
              Jika ada jalan dari a ke b, dan dari b ke c,<br />
              maka <strong className="text-chart-2">harus ada</strong> jalan langsung dari a ke c
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <span className="bg-chart-2 text-primary-foreground px-3 py-1 rounded">a</span>
              <span className="text-chart-2">―――――→</span>
              <span className="bg-chart-2 text-primary-foreground px-3 py-1 rounded">c</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
            Representasi pada Graf Berarah
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed">
            Sifat menghantar pada <strong className="text-primary">graf berarah</strong> ditunjukkan oleh:
          </p>
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-center">
              Jika ada <span className="text-primary">busur dari a ke b</span> dan <span className="text-primary">dari b ke c</span>,
            </p>
            <p className="text-center mt-1">
              maka juga harus terdapat <span className="text-chart-2">busur berarah dari a ke c</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Catatan: Relasi yang bersifat menghantar tidak mempunyai ciri khusus pada matriks representasinya
          </p>
        </CardContent>
      </Card>

      <Card className="border-chart-2/30 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-chart-2">
            <span className="bg-chart-2 text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">✓</span>
            Kapan Relasi Menghantar?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-chart-2/20 text-chart-2 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">1</span>
              <span>Relasi R menghantar jika setiap kali ada pasangan (a,b) dan (b,c) di R, maka (a,c) juga di R</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-chart-2/20 text-chart-2 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">2</span>
              <span>Relasi yang hanya berisi satu elemen seperti R = {'{'}(4, 5){'}'} <strong>selalu menghantar</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-chart-2/20 text-chart-2 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">3</span>
              <span>Relasi R menghantar jika tidak ada (a,b) ∈ R dan (b,c) ∈ R sedemikian sehingga (a,c) ∉ R</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
