"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Example {
  id: number
  title: string
  set: string
  relation: string
  pairs: string[]
  isTransitive: boolean
  explanation: string
  verification: { ab: string; bc: string; ac: string; exists: boolean }[]
}

const examples: Example[] = [
  {
    id: 1,
    title: "Relasi 'Lebih Besar Dari'",
    set: "A = {1, 2, 3, 4}",
    relation: "R = {(a, b) | a > b}",
    pairs: ["(2,1)", "(3,1)", "(3,2)", "(4,1)", "(4,2)", "(4,3)"],
    isTransitive: true,
    explanation: "Relasi 'lebih besar dari' bersifat menghantar karena jika x > y dan y > z, maka x > z selalu berlaku.",
    verification: [
      { ab: "(3,2)", bc: "(2,1)", ac: "(3,1)", exists: true },
      { ab: "(4,2)", bc: "(2,1)", ac: "(4,1)", exists: true },
      { ab: "(4,3)", bc: "(3,1)", ac: "(4,1)", exists: true },
      { ab: "(4,3)", bc: "(3,2)", ac: "(4,2)", exists: true },
    ]
  },
  {
    id: 2,
    title: "Relasi 'Habis Membagi'",
    set: "A = {2, 3, 4, 8, 9}",
    relation: "R = {(a, b) | a habis membagi b}",
    pairs: ["(2,2)", "(2,4)", "(2,8)", "(3,3)", "(3,9)", "(4,4)", "(4,8)", "(8,8)", "(9,9)"],
    isTransitive: true,
    explanation: "Jika a habis membagi b dan b habis membagi c, maka a habis membagi c. Contoh: 2|4 dan 4|8, maka 2|8.",
    verification: [
      { ab: "(2,4)", bc: "(4,8)", ac: "(2,8)", exists: true },
    ]
  },
  {
    id: 3,
    title: "Relasi dengan Satu Elemen",
    set: "A = {1, 2, 3, 4, 5}",
    relation: "R = {(1, 2)}",
    pairs: ["(1,2)"],
    isTransitive: true,
    explanation: "Relasi dengan satu elemen SELALU menghantar karena tidak ada pasangan (a,b) dan (b,c) yang bisa membentuk kondisi untuk diuji.",
    verification: []
  },
  {
    id: 4,
    title: "Relasi Tidak Menghantar",
    set: "A = {1, 2, 3, 4}",
    relation: "R = {(1, 1), (2, 3), (2, 4), (4, 2)}",
    pairs: ["(1,1)", "(2,3)", "(2,4)", "(4,2)"],
    isTransitive: false,
    explanation: "Relasi ini TIDAK menghantar karena (2,4) ∈ R dan (4,2) ∈ R, tetapi (2,2) ∉ R. Juga (4,2) dan (2,3) ∈ R, tetapi (4,3) ∉ R.",
    verification: [
      { ab: "(2,4)", bc: "(4,2)", ac: "(2,2)", exists: false },
      { ab: "(4,2)", bc: "(2,3)", ac: "(4,3)", exists: false },
    ]
  },
  {
    id: 5,
    title: "Relasi x + y = 5",
    set: "N (Bilangan Bulat Positif)",
    relation: "S = {(a, b) | a + b = 5}",
    pairs: ["(1,4)", "(2,3)", "(3,2)", "(4,1)"],
    isTransitive: false,
    explanation: "Relasi S tidak menghantar karena (4,2) ∈ S... Oops! (4,2) bukan anggota karena 4+2=6≠5. Tapi (2,3) dan (3,2) ∈ S, namun (2,2) ∉ S karena 2+2=4≠5.",
    verification: [
      { ab: "(2,3)", bc: "(3,2)", ac: "(2,2)", exists: false },
      { ab: "(1,4)", bc: "(4,1)", ac: "(1,1)", exists: false },
    ]
  }
]

export function TransitiveExamples() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">
          5 Contoh Relasi Menghantar
        </h2>
        <p className="text-muted-foreground">
          Klik pada setiap contoh untuk melihat penjelasan detail
        </p>
      </div>

      <div className="space-y-4">
        {examples.map((example) => (
          <Card
            key={example.id}
            className={`border-2 transition-all duration-300 ${
              example.isTransitive
                ? "border-chart-2/30 hover:border-chart-2/50"
                : "border-destructive/30 hover:border-destructive/50"
            } bg-card/50 backdrop-blur`}
          >
            <CardHeader
              className="cursor-pointer"
              onClick={() => setExpandedId(expandedId === example.id ? null : example.id)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {example.id}
                  </span>
                  <span className="text-lg">{example.title}</span>
                  <Badge variant={example.isTransitive ? "default" : "destructive"} className="ml-2">
                    {example.isTransitive ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Menghantar</>
                    ) : (
                      <><XCircle className="h-3 w-3 mr-1" /> Tidak Menghantar</>
                    )}
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="icon">
                  {expandedId === example.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedId === example.id && (
              <CardContent className="space-y-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Himpunan:</p>
                    <p className="font-mono bg-muted/50 px-3 py-2 rounded">{example.set}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Definisi Relasi:</p>
                    <p className="font-mono bg-muted/50 px-3 py-2 rounded">{example.relation}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Anggota Relasi R:</p>
                  <div className="flex flex-wrap gap-2">
                    {example.pairs.map((pair, idx) => (
                      <Badge key={idx} variant="outline" className="font-mono">
                        {pair}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${example.isTransitive ? "bg-chart-2/10" : "bg-destructive/10"}`}>
                  <p className="font-medium mb-2">Penjelasan:</p>
                  <p className="text-sm leading-relaxed">{example.explanation}</p>
                </div>

                {example.verification.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Verifikasi Pasangan:</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3">(a,b) ∈ R</th>
                            <th className="text-left py-2 px-3">(b,c) ∈ R</th>
                            <th className="text-left py-2 px-3">(a,c)</th>
                            <th className="text-left py-2 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {example.verification.map((v, idx) => (
                            <tr key={idx} className="border-b border-border/50">
                              <td className="py-2 px-3 font-mono">{v.ab}</td>
                              <td className="py-2 px-3 font-mono">{v.bc}</td>
                              <td className="py-2 px-3 font-mono">{v.ac}</td>
                              <td className="py-2 px-3">
                                {v.exists ? (
                                  <Badge variant="outline" className="text-chart-2 border-chart-2">
                                    <CheckCircle className="h-3 w-3 mr-1" /> Ada di R
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-destructive border-destructive">
                                    <XCircle className="h-3 w-3 mr-1" /> Tidak ada!
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
