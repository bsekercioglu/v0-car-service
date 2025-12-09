"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Calendar, Gauge, Wrench, FileText, AlertTriangle, Hash, Cog } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { EditVehicleModal } from "./edit-vehicle-modal"

interface VehicleDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: {
    brand: string
    model: string
    plate: string
    year: string
    km: string
    lastService: string
    vinNumber?: string
    engineNumber?: string
    color?: string
  } | null
}

const mockMaintenanceHistory = [
  { date: "15 Ara 2024", service: "Periyodik Bakım", km: "45,000 km", cost: "₺2,500", customer: "Ahmet Yılmaz" },
  { date: "10 Kas 2024", service: "Fren Değişimi", km: "43,500 km", cost: "₺1,800", customer: "Ahmet Yılmaz" },
  { date: "5 Eki 2024", service: "Motor Yağı", km: "42,000 km", cost: "₺750", customer: "Mehmet Demir" },
  { date: "1 Eyl 2024", service: "Klima Bakımı", km: "40,500 km", cost: "₺1,200", customer: "Mehmet Demir" },
]

const upcomingMaintenance = [
  { service: "Triger Değişimi", expectedKm: "60,000 km", remaining: "15,000 km", priority: "Orta" },
  { service: "Fren Hidroliği", expectedKm: "50,000 km", remaining: "5,000 km", priority: "Yüksek" },
]

export function VehicleDetailModal({ open, onOpenChange, vehicle }: VehicleDetailModalProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (!vehicle) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-2xl">
                    {vehicle.brand} {vehicle.model}
                  </DialogTitle>
                  <p className="text-muted-foreground mt-1">{vehicle.plate}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                Düzenle
              </Button>
            </div>
          </DialogHeader>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Araç Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Model Yılı</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Kilometre</p>
                    <p className="font-semibold">{vehicle.km}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Son Servis</p>
                    <p className="font-semibold">{vehicle.lastService}</p>
                  </div>
                </div>

                {vehicle.color && (
                  <div className="flex items-center gap-3">
                    <div
                      className="h-5 w-5 rounded-full border-2"
                      style={{ backgroundColor: vehicle.color.toLowerCase() }}
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Renk</p>
                      <p className="font-semibold">{vehicle.color}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Hash className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Şasi Numarası (VIN)</p>
                    <p className="font-mono font-semibold text-sm break-all">
                      {vehicle.vinNumber || "WBADT43452G123456"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Bu numara ile aracın geçmişi sorgulanabilir</p>
                  </div>
                </div>

                {vehicle.engineNumber && (
                  <div className="flex items-start gap-3">
                    <Cog className="h-5 w-5 text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Motor Numarası</p>
                      <p className="font-mono font-semibold text-sm break-all">{vehicle.engineNumber}</p>
                      <p className="text-xs text-muted-foreground mt-1">Motor değişikliği takibi için kullanılır</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Yaklaşan Bakımlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMaintenance.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.service}</p>
                    <p className="text-sm text-muted-foreground">
                      Tahmini: {item.expectedKm} • Kalan: {item.remaining}
                    </p>
                  </div>
                  <Badge variant={item.priority === "Yüksek" ? "destructive" : "secondary"}>{item.priority}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Araç Geçmişi
              </CardTitle>
              <p className="text-sm text-muted-foreground">Bu araç farklı müşteriler tarafından kullanılmış olabilir</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMaintenanceHistory.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center min-w-[80px]">
                        <p className="text-xs text-muted-foreground">Tarih</p>
                        <p className="font-medium text-sm">{item.date}</p>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <div className="flex-1">
                        <p className="font-medium">{item.service}</p>
                        <p className="text-sm text-muted-foreground">{item.km}</p>
                      </div>
                      <div className="text-right min-w-[120px]">
                        <Badge variant="outline" className="mb-1">
                          {item.customer}
                        </Badge>
                      </div>
                    </div>
                    <p className="font-semibold min-w-[80px] text-right">{item.cost}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      {vehicle && <EditVehicleModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} vehicle={vehicle} />}
    </>
  )
}
