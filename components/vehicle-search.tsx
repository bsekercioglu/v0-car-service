"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, Car, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function VehicleSearch() {
  const [searchType, setSearchType] = useState<"plate" | "vin">("plate")
  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    // Simüle edilmiş arama sonucu
    setTimeout(() => {
      setSearchResult({
        found: true,
        vehicle: {
          brand: "BMW",
          model: "320i",
          plate: "34 ABC 123",
          year: "2020",
          vinNumber: "WBADT43452G123456",
          engineNumber: "N47D20A12345678",
          currentOwner: "Ahmet Yılmaz",
          previousOwners: ["Mehmet Demir", "Ayşe Kaya"],
          totalServices: 12,
          lastService: "15 Ara 2024",
        },
      })
      setIsSearching(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Araç Geçmişi Sorgula
        </CardTitle>
        <p className="text-sm text-muted-foreground">Plaka veya şasi numarası ile araç geçmişini görüntüleyin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={searchType === "plate" ? "default" : "outline"}
            onClick={() => setSearchType("plate")}
            className="flex-1"
          >
            Plaka ile Ara
          </Button>
          <Button
            variant={searchType === "vin" ? "default" : "outline"}
            onClick={() => setSearchType("vin")}
            className="flex-1"
          >
            Şasi ile Ara
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">{searchType === "plate" ? "Plaka Numarası" : "Şasi Numarası (VIN)"}</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
              placeholder={searchType === "plate" ? "34 ABC 123" : "WBADT43452G123456"}
              className={searchType === "vin" ? "font-mono" : ""}
            />
            <Button onClick={handleSearch} disabled={!searchValue || isSearching}>
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? "Aranıyor..." : "Ara"}
            </Button>
          </div>
        </div>

        {searchResult && searchResult.found && (
          <div className="mt-4 p-4 border rounded-lg space-y-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {searchResult.vehicle.brand} {searchResult.vehicle.model}
                </h3>
                <p className="text-muted-foreground text-sm">{searchResult.vehicle.plate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Model Yılı</p>
                <p className="font-medium">{searchResult.vehicle.year}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Toplam Servis</p>
                <p className="font-medium">{searchResult.vehicle.totalServices}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Şasi No</p>
                <p className="font-mono font-medium text-xs">{searchResult.vehicle.vinNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Son Servis</p>
                <p className="font-medium">{searchResult.vehicle.lastService}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Müşteri Geçmişi</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{searchResult.vehicle.currentOwner} (Mevcut)</Badge>
                {searchResult.vehicle.previousOwners.map((owner: string, idx: number) => (
                  <Badge key={idx} variant="outline">
                    {owner}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full bg-transparent" variant="outline">
              Detaylı Geçmişi Görüntüle
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
