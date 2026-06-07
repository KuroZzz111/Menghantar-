"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calculator, Plus, Trash2, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Pair {
  a: string
  b: string
}

interface VerificationResult {
  ab: Pair
  bc: Pair
  ac: Pair
  exists: boolean
}

export function TransitiveCalculator() {
  const [setElements, setSetElements] = useState<string>("")
  const [pairs, setPairs] = useState<Pair[]>([{ a: "", b: "" }])
  const [result, setResult] = useState<{
    isTransitive: boolean | null
    verification: VerificationResult[]
    missingPairs: Pair[]
  }>({
    isTransitive: null,
    verification: [],
    missingPairs: []
  })

  const addPair = () => {
    setPairs([...pairs, { a: "", b: "" }])
  }

  const removePair = (index: number) => {
    if (pairs.length > 1) {
      setPairs(pairs.filter((_, i) => i !== index))
    }
  }

  const updatePair = (index: number, field: "a" | "b", value: string) => {
    const newPairs = [...pairs]
    newPairs[index][field] = value.trim()
    setPairs(newPairs)
  }

  const reset = () => {
    setSetElements("")
    setPairs([{ a: "", b: "" }])
    setResult({ isTransitive: null, verification: [], missingPairs: [] })
  }

  const checkTransitive = useCallback(() => {
    // Filter out empty pairs
    const validPairs = pairs.filter(p => p.a !== "" && p.b !== "")
    
    if (validPairs.length === 0) {
      setResult({ isTransitive: null, verification: [], missingPairs: [] })
      return
    }

    const verification: VerificationResult[] = []
    const missingPairs: Pair[] = []
    let isTransitive = true

    // Check all combinations
    for (const ab of validPairs) {
      for (const bc of validPairs) {
        // If the second element of ab equals the first element of bc
        if (ab.b === bc.a) {
          const acPair: Pair = { a: ab.a, b: bc.b }
          
          // Check if (a, c) exists in the relation
          const exists = validPairs.some(p => p.a === acPair.a && p.b === acPair.b)
          
          verification.push({
            ab,
            bc,
            ac: acPair,
            exists
          })

          if (!exists) {
            isTransitive = false
            // Add to missing pairs if not already there
            if (!missingPairs.some(p => p.a === acPair.a && p.b === acPair.b)) {
              missingPairs.push(acPair)
            }
          }
        }
      }
    }

    setResult({
      isTransitive: verification.length === 0 ? true : isTransitive,
      verification,
      missingPairs
    })
  }, [pairs])

  const loadExample = (exampleNum: number) => {
    switch (exampleNum) {
      case 1:
        setSetElements("1, 2, 3, 4")
        setPairs([
          { a: "2", b: "1" },
          { a: "3", b: "1" },
          { a: "3", b: "2" },
          { a: "4", b: "1" },
          { a: "4", b: "2" },
          { a: "4", b: "3" },
        ])
        break
      case 2:
        setSetElements("1, 2, 3, 4")
        setPairs([
          { a: "1", b: "1" },
          { a: "2", b: "3" },
          { a: "2", b: "4" },
          { a: "4", b: "2" },
        ])
        break
      case 3:
        setSetElements("1, 2")
        setPairs([
          { a: "1", b: "2" },
        ])
        break
    }
    setResult({ isTransitive: null, verification: [], missingPairs: [] })
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8" />
          Kalkulator Relasi Menghantar
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Masukkan pasangan terurut untuk mengecek apakah relasi bersifat menghantar (transitive)
        </p>
      </div>

      <Card className="border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Input Relasi</CardTitle>
          <CardDescription>
            Masukkan elemen himpunan dan pasangan terurut relasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Set Elements */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Elemen Himpunan A (opsional, pisahkan dengan koma):</label>
            <Input
              placeholder="Contoh: 1, 2, 3, 4"
              value={setElements}
              onChange={(e) => setSetElements(e.target.value)}
              className="font-mono"
            />
          </div>

          {/* Quick Load Examples */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Muat contoh:</span>
            <Button variant="outline" size="sm" onClick={() => loadExample(1)}>
              Contoh Menghantar
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadExample(2)}>
              Contoh Tidak Menghantar
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadExample(3)}>
              Satu Elemen
            </Button>
          </div>

          {/* Pairs Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Pasangan Terurut (a, b) ∈ R:</label>
            {pairs.map((pair, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-muted-foreground">(</span>
                <Input
                  placeholder="a"
                  value={pair.a}
                  onChange={(e) => updatePair(index, "a", e.target.value)}
                  className="w-24 font-mono text-center"
                />
                <span className="text-muted-foreground">,</span>
                <Input
                  placeholder="b"
                  value={pair.b}
                  onChange={(e) => updatePair(index, "b", e.target.value)}
                  className="w-24 font-mono text-center"
                />
                <span className="text-muted-foreground">)</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePair(index)}
                  disabled={pairs.length === 1}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addPair} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Tambah Pasangan
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={checkTransitive} className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Cek Menghantar
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result.isTransitive !== null && (
        <Card className={`border-2 ${result.isTransitive ? "border-chart-2" : "border-destructive"} bg-card/50 backdrop-blur`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.isTransitive ? (
                <>
                  <CheckCircle className="h-6 w-6 text-chart-2" />
                  <span className="text-chart-2">Relasi MENGHANTAR ✓</span>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-destructive" />
                  <span className="text-destructive">Relasi TIDAK MENGHANTAR ✗</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Display the relation */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Relasi R yang diinput:</p>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono">R = {"{"}</span>
                {pairs.filter(p => p.a && p.b).map((pair, idx, arr) => (
                  <Badge key={idx} variant="outline" className="font-mono">
                    ({pair.a}, {pair.b}){idx < arr.length - 1 ? "," : ""}
                  </Badge>
                ))}
                <span className="font-mono">{"}"}</span>
              </div>
            </div>

            {/* Verification Table */}
            {result.verification.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Detail Verifikasi:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3">(a, b) ∈ R</th>
                        <th className="text-left py-2 px-3">(b, c) ∈ R</th>
                        <th className="text-left py-2 px-3">(a, c)?</th>
                        <th className="text-left py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.verification.map((v, idx) => (
                        <tr key={idx} className={`border-b border-border/50 ${!v.exists ? "bg-destructive/10" : ""}`}>
                          <td className="py-2 px-3 font-mono">({v.ab.a}, {v.ab.b})</td>
                          <td className="py-2 px-3 font-mono">({v.bc.a}, {v.bc.b})</td>
                          <td className="py-2 px-3 font-mono">({v.ac.a}, {v.ac.b})</td>
                          <td className="py-2 px-3">
                            {v.exists ? (
                              <Badge variant="outline" className="text-chart-2 border-chart-2">
                                <CheckCircle className="h-3 w-3 mr-1" /> Ada ✓
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

            {/* Missing Pairs Alert */}
            {result.missingPairs.length > 0 && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Pasangan yang Hilang</AlertTitle>
                <AlertDescription>
                  Agar relasi menjadi menghantar, pasangan berikut harus ditambahkan:
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.missingPairs.map((pair, idx) => (
                      <Badge key={idx} variant="destructive" className="font-mono">
                        ({pair.a}, {pair.b})
                      </Badge>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Success Message for Empty Verification */}
            {result.verification.length === 0 && result.isTransitive && (
              <Alert className="border-chart-2 bg-chart-2/10">
                <CheckCircle className="h-4 w-4 text-chart-2" />
                <AlertTitle className="text-chart-2">Relasi Otomatis Menghantar</AlertTitle>
                <AlertDescription>
                  Tidak ada pasangan (a,b) dan (b,c) yang perlu diverifikasi. Relasi dengan kondisi ini selalu menghantar secara vakum (vacuously true).
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </section>
  )
}
