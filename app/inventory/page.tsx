"use client"

import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Car, Plus, Search, Package, AlertCircle, TrendingDown } from "lucide-react"
import { useState } from "react"

const mockInventory = [
  {
    id: 1,
    name: "Motor Yağı 5W-30",
    sku: "OIL-5W30",
    category: "Yağlar",
    stock: 45,
    minStock: 20,
    price: 280,
    unit: "Litre",
  },
  {
    id: 2,
    name: "Hava Filtresi",
    sku: "FLT-AIR",
    category: "Filtreler",
    stock: 12,
    minStock: 15,
    price: 150,
    unit: "Adet",
  },
  {
    id: 3,
    name: "Yağ Filtresi",
    sku: "FLT-OIL",
    category: "Filtreler",
    stock: 28,
    minStock: 20,
    price: 85,
    unit: "Adet",
  },
  {
    id: 4,
    name: "Fren Balatası Ön",
    sku: "BRK-FRT",
    category: "Frenler",
    stock: 8,
    minStock: 10,
    price: 450,
    unit: "Takım",
  },
  {
    id: 5,
    name: "Fren Balatası Arka",
    sku: "BRK-RR",
    category: "Frenler",
    stock: 15,
    minStock: 10,
    price: 380,
    unit: "Takım",
  },
  {
    id: 6,
    name: "Ateşleme Bujisi",
    sku: "IGN-PLG",
    category: "Elektrik",
    stock: 32,
    minStock: 25,
    price: 95,
    unit: "Adet",
  },
  {
    id: 7,
    name: "Akü 12V 60Ah",
    sku: "BAT-60",
    category: "Elektrik",
    stock: 6,
    minStock: 8,
    price: 1200,
    unit: "Adet",
  },
  {
    id: 8,
    name: "Silecek Lastiği",
    sku: "WIP-BLD",
    category: "Aksesuar",
    stock: 24,
    minStock: 20,
    price: 120,
    unit: "Çift",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInventory = mockInventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r border-border p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">CarService</span>
        </div>
        <NavigationMenu />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Stok Yönetimi</h1>
                <p className="text-muted-foreground mt-1">Malzeme ve parça stoklarını yönetin</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Yeni Ürün Ekle
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Toplam Ürün</p>
                      <p className="text-2xl font-bold mt-1">{mockInventory.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Düşük Stok</p>
                      <p className="text-2xl font-bold mt-1 text-orange-600">
                        {mockInventory.filter((item) => item.stock < item.minStock).length}
                      </p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Stok Değeri</p>
                      <p className="text-2xl font-bold mt-1">
                        ₺{mockInventory.reduce((sum, item) => sum + item.stock * item.price, 0).toLocaleString()}
                      </p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Kategoriler</p>
                      <p className="text-2xl font-bold mt-1">
                        {new Set(mockInventory.map((item) => item.category)).size}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ürün adı veya SKU ile ara..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid gap-4">
              {filteredInventory.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-6 w-6 text-primary" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{item.name}</h3>
                            <Badge variant="outline">{item.category}</Badge>
                            {item.stock < item.minStock && (
                              <Badge variant="destructive" className="gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Düşük Stok
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">SKU: {item.sku}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-8 mr-8">
                          <div>
                            <p className="text-sm text-muted-foreground">Stok</p>
                            <p className="font-semibold">
                              {item.stock} {item.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Min. Stok</p>
                            <p className="font-semibold">
                              {item.minStock} {item.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Birim Fiyat</p>
                            <p className="font-semibold">₺{item.price}</p>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        Düzenle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
