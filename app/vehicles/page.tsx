"use client"

import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Car, Calendar, Gauge, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { VehicleSearch } from "@/components/vehicle-search"
import { VehicleDetailModal } from "@/components/modals/vehicle-detail-modal"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockVehicles = [
  {
    id: 1,
    brand: "BMW",
    model: "320i",
    plate: "34 ABC 123",
    year: "2020",
    km: "45,000 km",
    owner: "Ahmet Yılmaz",
    lastService: "15 Ara 2024",
    vinNumber: "WBADT43452G123456",
    engineNumber: "N47D20A12345678",
    color: "Siyah",
    status: "active",
    nextMaintenance: "50,000 km",
  },
  {
    id: 2,
    brand: "Mercedes",
    model: "C180",
    plate: "06 XYZ 456",
    year: "2019",
    km: "62,000 km",
    owner: "Ayşe Demir",
    lastService: "10 Kas 2024",
    vinNumber: "WDD2050821F123456",
    engineNumber: "M274920123456",
    color: "Beyaz",
    status: "maintenance",
    nextMaintenance: "65,000 km",
  },
  {
    id: 3,
    brand: "Audi",
    model: "A4",
    plate: "35 DEF 789",
    year: "2021",
    km: "28,000 km",
    owner: "Mehmet Kaya",
    lastService: "5 Eki 2024",
    vinNumber: "WAUZZZ8K0DA123456",
    engineNumber: "CJXC123456",
    color: "Gri",
    status: "active",
    nextMaintenance: "30,000 km",
  },
]

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof mockVehicles)[0] | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && vehicle.status === "active") ||
      (activeTab === "maintenance" && vehicle.status === "maintenance")

    return matchesSearch && matchesTab
  })

  const handleOpenDetail = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicle(vehicle)
    setDetailModalOpen(true)
  }

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
            <div>
              <h1 className="text-3xl font-bold text-balance">Araçlar</h1>
              <p className="text-muted-foreground mt-1">Tüm araçları görüntüleyin ve geçmişlerini sorgulayın</p>
            </div>

            <VehicleSearch />

            <Card>
              <CardHeader>
                <CardTitle>Kayıtlı Araçlar</CardTitle>
                <div className="flex items-center gap-4 mt-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList>
                      <TabsTrigger value="all">Tümü</TabsTrigger>
                      <TabsTrigger value="active">Aktif</TabsTrigger>
                      <TabsTrigger value="maintenance">Bakımda</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Araç ara (marka, model, plaka, müşteri)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {filteredVehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="bg-primary/10 p-4 rounded-lg">
                              <Car className="h-8 w-8 text-primary" />
                            </div>

                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">
                                  {vehicle.brand} {vehicle.model}
                                </h3>
                                <Badge variant="outline">{vehicle.plate}</Badge>
                                {vehicle.status === "maintenance" && (
                                  <Badge variant="secondary">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Bakımda
                                  </Badge>
                                )}
                              </div>

                              <div className="grid grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-muted-foreground text-xs">Model Yılı</p>
                                    <p className="font-medium">{vehicle.year}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Gauge className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-muted-foreground text-xs">Kilometre</p>
                                    <p className="font-medium">{vehicle.km}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs">Müşteri</p>
                                  <p className="font-medium">{vehicle.owner}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs">Son Servis</p>
                                  <p className="font-medium">{vehicle.lastService}</p>
                                </div>
                              </div>

                              <div className="pt-2 border-t">
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-muted-foreground">Şasi No:</span>
                                  <span className="font-mono text-xs">{vehicle.vinNumber}</span>
                                </div>
                                {vehicle.engineNumber && (
                                  <div className="flex items-center gap-2 text-sm mt-1">
                                    <span className="text-muted-foreground">Motor No:</span>
                                    <span className="font-mono text-xs">{vehicle.engineNumber}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <Button variant="outline" size="sm" onClick={() => handleOpenDetail(vehicle)}>
                            Detaylar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <VehicleDetailModal open={detailModalOpen} onOpenChange={setDetailModalOpen} vehicle={selectedVehicle} />
    </div>
  )
}
