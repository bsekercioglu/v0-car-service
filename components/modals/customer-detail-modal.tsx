"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Car, Calendar, DollarSign, FileText, Edit } from "lucide-react"
import { useState } from "react"
import { EditCustomerModal } from "./edit-customer-modal"
import { VehicleDetailModal } from "./vehicle-detail-modal"
import { AddVehicleModal } from "./add-vehicle-modal"
import { ServiceDetailModal } from "./service-detail-modal"

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  vehicles: string[]
  totalServices: number
  lastService: string
  totalSpent: string
  status: string
}

interface CustomerDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: Customer | null
}

const mockServiceHistory = [
  {
    id: 1,
    date: "15 Aralık 2024",
    vehicle: "BMW 320i - 34 ABC 123",
    service: "Periyodik Bakım",
    amount: "₺2,500",
    status: "Tamamlandı",
  },
  {
    id: 2,
    date: "10 Kasım 2024",
    vehicle: "BMW 320i - 34 ABC 123",
    service: "Fren Değişimi",
    amount: "₺1,800",
    status: "Tamamlandı",
  },
  {
    id: 3,
    date: "5 Ekim 2024",
    vehicle: "BMW 320i - 34 ABC 123",
    service: "Motor Yağı Değişimi",
    amount: "₺750",
    status: "Tamamlandı",
  },
]

const mockVehicleDetails = [
  {
    brand: "BMW",
    model: "320i",
    plate: "34 ABC 123",
    year: "2020",
    km: "45,000 km",
    lastService: "15 Aralık 2024",
  },
]

export function CustomerDetailModal({ open, onOpenChange, customer }: CustomerDetailModalProps) {
  const [editCustomerOpen, setEditCustomerOpen] = useState(false)
  const [vehicleDetailOpen, setVehicleDetailOpen] = useState(false)
  const [addVehicleOpen, setAddVehicleOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof mockVehicleDetails)[0] | null>(null)
  const [serviceDetailOpen, setServiceDetailOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  if (!customer) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-2xl">{customer.name}</DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        customer.status === "vip" ? "default" : customer.status === "active" ? "secondary" : "outline"
                      }
                    >
                      {customer.status === "vip" ? "VIP Müşteri" : customer.status === "active" ? "Aktif" : "Pasif"}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => setEditCustomerOpen(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Düzenle
              </Button>
            </div>
          </DialogHeader>

          <Tabs defaultValue="info" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Genel Bilgiler</TabsTrigger>
              <TabsTrigger value="vehicles">Araçlar</TabsTrigger>
              <TabsTrigger value="history">Servis Geçmişi</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">E-posta</p>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Adres</p>
                      <p className="font-medium">Kadıköy, İstanbul</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Özet İstatistikler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Toplam Servis</span>
                      </div>
                      <p className="text-2xl font-bold">{customer.totalServices}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">Toplam Harcama</span>
                      </div>
                      <p className="text-2xl font-bold">{customer.totalSpent}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Son Servis</span>
                      </div>
                      <p className="text-2xl font-bold">{customer.lastService}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-4">
              {mockVehicleDetails.map((vehicle, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Car className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {vehicle.brand} {vehicle.model}
                          </h3>
                          <p className="text-muted-foreground">{vehicle.plate}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Model Yılı</p>
                            <p className="font-medium">{vehicle.year}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Kilometre</p>
                            <p className="font-medium">{vehicle.km}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Son Servis</p>
                            <p className="font-medium">{vehicle.lastService}</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedVehicle(vehicle)
                          setVehicleDetailOpen(true)
                        }}
                      >
                        Araç Detayı
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setAddVehicleOpen(true)}>
                <Car className="h-4 w-4 mr-2" />
                Yeni Araç Ekle
              </Button>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {mockServiceHistory.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{service.service}</p>
                          <Badge variant="outline">{service.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{service.vehicle}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {service.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{service.amount}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setSelectedService({
                              id: service.id,
                              customer: customer.name,
                              vehicle: service.vehicle,
                              date: service.date,
                              service: service.service,
                              cost: service.amount,
                              status: "completed",
                              mechanic: "Ali Ustaoğlu",
                              description: "Araç periyodik bakım işlemleri başarıyla tamamlanmıştır.",
                              completedAt: service.date,
                            })
                            setServiceDetailOpen(true)
                          }}
                        >
                          Detaylar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <EditCustomerModal open={editCustomerOpen} onOpenChange={setEditCustomerOpen} customer={customer} />
      <VehicleDetailModal open={vehicleDetailOpen} onOpenChange={setVehicleDetailOpen} vehicle={selectedVehicle} />
      <AddVehicleModal open={addVehicleOpen} onOpenChange={setAddVehicleOpen} customerId={customer.id} />
      <ServiceDetailModal open={serviceDetailOpen} onOpenChange={setServiceDetailOpen} service={selectedService} />
    </>
  )
}
